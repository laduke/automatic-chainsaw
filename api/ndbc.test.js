const fetchXmlFile = require('./helpers').fetchXmlFile;
const fetchBuoyData = require('./ndbc').fetchBuoyData;
const path = require('path');

describe('National Data Buoy Center API cleaner', () => {

  let result;
  let exampleItem;
  let exampleDescription;


  beforeAll((done) => {
    const xmlPath = path.resolve(__dirname, 'sample.xml');
    //const query = '?lat=40N&lon=73W&radius=35';
    //fetchBuoyData(query).fork(
    fetchBuoyData('', xmlPath, fetchXmlFile).fork(
      error => console.error(error), //eslint-disable-line no-console
      data => {
        result = data;
        exampleItem = result.item[0];
        exampleDescription = exampleItem.description;
        done();
      }
    );
  });

  describe('Header', () => {
    it('Has a title', () => {
      expect(result.title).toMatch(/Observations/);
    });

    it('Has a description', () => {
      expect(result.description).toMatch(/nautical/);
    });

    it('Has a publication date', () => {
      expect(result.pubDate).toBeDefined();
      expect(typeof result.pubDate === 'string').toBeTruthy();
    });

    it('Does not have extra properties', () => {
      expect(Object.keys(result)).toHaveLength(4);
    });
  });

  describe('Items list', () => {
    it('Is a list of objects', () => {
      expect(result.item.length).toBeGreaterThan(1);
      expect(exampleItem).toBeInstanceOf(Object);
    });
  });

  describe('An item', () => {
    it('Has an ID', () => {
      expect(typeof exampleItem.id === 'string').toBeTruthy();
    });

    it('Has a title', () => {
      expect(exampleItem.title).toBeDefined();
      expect(exampleItem.title).toMatch(/Station/);
    });

    it('Has a description', () => {
      expect(exampleItem.description).toBeInstanceOf(Object);
    });

    it('Has a publication date', () => {
      expect(typeof exampleItem.pubDate === 'string').toBeTruthy();
    });
  });

  describe('An item description', () => {
    it('Has a timestamp', () => {
      expect(typeof exampleDescription.timestamp === 'string').toBeTruthy();
    });
    it('Has a Location', () => {
      expect(typeof exampleDescription.Location === 'string').toBeTruthy();
    });
  });
});

