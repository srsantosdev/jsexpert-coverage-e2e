const http = require('http');
const APP_PORT = 3000

const DEFAULT_USER = { 
  username: 'samueldev', 
  password: '1234567890' 
}

const routes = { 
  '/contact:get': (request, response) => {
    response.write('Contact Us Page')

    return response.end()
  },
  '/login:post':  async (request, response) => {
    for await (const data of request) {
      const user = JSON.parse(data)

      if(user.username !== DEFAULT_USER.username || user.password !== DEFAULT_USER.password) {
        response.writeHead(401)
        response.write('Logging failed!')

        return response.end()
      }

      response.write('Logging has succeeded')

      return response.end()
    }
  },
  default: (request, response) => {
    response.write('Hello World')

    return response.end()
  }
}

const handler = function (request, response) {
  const { url, method } = request
  const routeKey = `${url}:${method.toLowerCase()}`

  const chosen = routes[routeKey] || routes.default

  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  
  return chosen(request, response)
}

const app = http
  .createServer(handler)
  .listen(APP_PORT, () => console.log('app running at', APP_PORT))

module.exports = app