'use strict';

const ValidationError = require('schema-utils/src/ValidationError');
const webpack = require('webpack');
const Server = require('../../lib/Server');
const config = require('../fixtures/simple-config/webpack.config');

describe('Validation', () => {
  let compiler;
  let server;

  beforeAll(() => {
    compiler = webpack(config);
  });

  describe('hot', () => {
    beforeEach(() => {
      server = null;
    });
    afterEach((done) => {
      if (server) {
        server.close(() => {
          done();
        });
      } else {
        done();
      }
    });

    it('should allow hot to be a boolean', () => {
      let error = null;
      try {
        const hot = true;
        server = new Server(compiler, { hot });
      } catch (err) {
        error = err;
      }
      expect(error).toBe(null);
    });

    it('should not allow hot to be the wrong type', () => {
      let error = null;
      try {
        server = new Server(compiler, { hot: '' });
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(ValidationError);
    });
  });
});