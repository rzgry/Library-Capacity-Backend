const request = require('supertest');
const app = require('../app');

describe('app', () => {
  it('should export the express app correctly', () => {
    expect(app).toBeTruthy();
  });

  describe('GET /', () => {
    it('should respond to the GET method', async () => {
      const response = await request(app).get('/');
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
  describe('GET /libraries/capcity/taylor', () => {
    it('should respond with the capacity for taylor library', async () => {
      const response = await request(app).get('/libraries/capcity/taylor');
      expect(response.statusCode).toBe(200);
    });
  });
  describe('GET  /libraries/capcity/weldon', () => {
    it('should respond with the capacity for weldon library', async () => {
      const response = await request(app).get('/CurrentCapcity?lib=Weldon');
      expect(response.statusCode).toBe(200);
    });
  });
  describe('GET /libraries/capcity/fakelib', () => {
    it('should respond with 400 for a library that does not exist', async () => {
      const response = await request(app).get('/libraries/capcity/fakelib');
      expect(response.statusCode).toBe(400);
    });
  });
});
