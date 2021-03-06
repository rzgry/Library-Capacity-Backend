const request = require('supertest');
const app = require('../app');

describe('app', () => {
  it('should export the express app correctly', () => {
    expect(app).toBeTruthy();
  });

  describe('GET /healthcheck', () => {
    it('should respond to the GET method', async () => {
      const response = await request(app).get('/healthcheck');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('GET /404', () => {
    it('should respond to the GET method with a 404 for a route that does not exist', async () => {
      const response = await request(app).get('/404');
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('{"message":"Not Found"}');
    });

    it('should respond to the POST method with a 404 for a route that does not exist', async () => {
      const response = await request(app).post('/404');
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('{"message":"Not Found"}');
    });
  });

  describe('GET /libraries', () => {
    it('should respond with a list of library names', async () => {
      const response = await request(app).get('/libraries');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('GET /libraries/capacities', () => {
    it('should respond with a list of library names', async () => {
      const response = await request(app).get('/libraries/capacities');
      expect(response.statusCode).toBe(200);
    });
  });
});
