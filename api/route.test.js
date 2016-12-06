var request = require('supertest');
var app = require('./server');

//test sometimes times out on travis-ci
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; //eslint-disable-line no-undef

const finish_test = done => {
  return function (err) {
    if (err) {
      done.fail(err);
    } else {
      done();
    }
  };
};

describe('Buoy data API route', () => {
  it('can get the data', (done) => {
    request(app)
      .get('/api/buoys/?lat=40N&lon=73W&radius=100')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(finish_test(done));
  });
});
