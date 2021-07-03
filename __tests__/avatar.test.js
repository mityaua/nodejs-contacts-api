const request = require('supertest')
const app = require('../app')

// It's not serious...
describe('PATCH avatar uploading', () => {
  it('should return not authorized without token', async () => {
    const response = await request(app).patch('/api/users/avatars').set('Authorization', '')

    expect(response.type).toBe('application/json')
    expect(response.statusCode).toEqual(401)
    expect(response.body).toBeDefined()
    expect(response.body.message).toBeDefined()
    expect(response.body.message).toMatch('Not authorized')
  })
})
