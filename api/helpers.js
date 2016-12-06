const S = require('sanctuary');
const Future = require('fluture');
const request = require('request');
const parseString = require('xml2js').parseString;
const cheerio = require('cheerio');
const fs = require('fs');

const maybeToFuture = x => S.maybe(Future.reject(x), Future.of);

function xmlToJson(xml) {
  return new Future(function(reject, resolve) {
    parseString(xml, function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function fetchXml(URI) {
  return new Future(function(reject, resolve) {
    request(URI, function(error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}

function fetchXmlFile(path) {
  return new Future(function(reject, resolve) {
    fs.readFile(path, function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}


//'<strong>December 3, 2016 1:50 pm EST</strong><br />' ->
//'December 3, 2016 1:50 pm EST'
const stripMarkup = str => {
  const $ = cheerio.load(str);
  return $.text();
};

module.exports = {
  fetchXml,
  fetchXmlFile,
  maybeToFuture,
  xmlToJson,
  stripMarkup
};
