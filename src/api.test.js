const assert = require('assert')
const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')

describe('API Suite test', () => {
  describe('/contact', async () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(app).get('/contact').expect(200)

      assert.deepStrictEqual(response.text, 'Contact Us Page')
    })
  })

  describe('/hello', async () => {
    it('should request an inexistent route /hi and redirecto to /hello', async () => {
      const response = await request(app).get('/hi').expect(200)

      assert.deepStrictEqual(response.text, 'Hello World')
    })
  })

  describe('/login', async () => {
    it('should login successfully on the login route and return HTTP Status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'samueldev', password: '1234567890' })
        .expect(200)

      assert.deepStrictEqual(response.text, 'Logging has succeeded')
    })

    it('should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'test2', password: '12345670' })
        .expect(401)


      assert.ok(response.unauthorized)
      assert.deepStrictEqual(response.text, 'Logging failed!')
    })
  })
})