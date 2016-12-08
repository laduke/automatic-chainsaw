const S = require('sanctuary');
const R = require('ramda');

const maybeToFuture = require('./helpers.js').maybeToFuture;
const xmlToJson = require('./helpers.js').xmlToJson;
const fetchXml = require('./helpers.js').fetchXml;
const stripMarkup = require('./helpers.js').stripMarkup;

const BUOY_URL = 'http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php';

const getBuoyItems = S.gets(Object, ['rss', 'channel', '0']);

const unwrap = R.head;

//'Location: 40.251N...' -> [Location: '40.251N...']
//'Wind Direction: NW (310°)' -> ['Wind Direction': 'NW (310°)']
const splitOnFirstColon = R.pipe(
  R.match(/^(.*): (.*$)/),
  R.slice(1, 3)
);

//assume if there's no colon, it's the timestamp field
//'December 3, 2016 1:50 pm EST' -> {timestamp: 'December 3...'}
//'Location: 40.251N...' -> {Location: '40.251N...'}
const hasHeader = R.test(/^\D*: /);

const descriptionTextToObject = S.ifElse(
  hasHeader,
  splitOnFirstColon,
  R.pair('timestamp')
);

const cleanupDescriptionText = R.pipe(
  unwrap,
  R.split('\n'),
  R.map(stripMarkup),
  R.map(R.trim),
  R.reject(R.isEmpty)
);

const cleanupDescriptions = R.pipe(
  cleanupDescriptionText,
  R.map(descriptionTextToObject),
  R.fromPairs
);

const parseStationId = item => {
  const id = R.pipe(
    R.prop('title'),
    R.match(/(\w+)/g),
    R.prop(1)
  );
  return R.assoc('id', id(item), item);
};

const cleanItem = item => {
  const transformations = {
    title: unwrap,
    pubDate: unwrap,
    description: cleanupDescriptions
  };
  const only = R.pick([
    'title',
    'pubDate',
    'description'
  ]);

  return R.pipe(
    only,
    R.evolve(transformations),
    parseStationId
  )(item);
};

const cleanItemList = R.pipe(
  R.map(cleanItem),
  R.indexBy(R.prop('id'))
);

const cleanFeed = data => {
  const only = R.pick([
    'title',
    'description',
    'pubDate',
    'item'
  ]);

  const transformations = {
    title: unwrap,
    description: unwrap,
    pubDate: unwrap,
    item: cleanItemList
  };

  return R.evolve(transformations, only(data));
};

const fetchBuoyData = R.curry((query, url = BUOY_URL, fetchFunction = fetchXml) => {
  return S.pipe([
    S.concat(url),
    fetchFunction,
    R.chain(xmlToJson),
    R.map(getBuoyItems),
    R.chain(maybeToFuture('No RSS Channel')),
    R.map(cleanFeed)
  ])(query);
});

module.exports = {
  fetchBuoyData
};
