const request = require('supertest');
const app = require('../server/app');

describe('Test the root path', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe('Test the root path WITH PROMISES', () => {
    test('It should response the GET method', () => {
        return request(app).get("/").then(response => {
            expect(response.statusCode).toBe(200)
        })
    });
})

describe('Test the root path WITH ASYNC AWAIT', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
})

describe('Test the root path WITH PROMISES', () => {
    test('It should response the GET method', () => {
        return request(app).get("/people").then(response => {
            expect(response.statusCode).toBe(404)
        })
    });
})

describe('Test an unknown path WITH ASYNC AWAIT', () => {
    test('It should response the get method', async () => {
        const response = await request(app).get('/people');
        expect(response.statusCode).toBe(404);
    });
})