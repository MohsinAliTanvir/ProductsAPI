import { IncomingMessage, Server, ServerResponse } from "http"
import { Url } from "url"
const http = require('http')
const pagination = require('./pagination')

// Creating the server
const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const myURL: string = req.url!
    const fullURL: URL = new URL('localhost:5000' + myURL!.toString())
    const params: URLSearchParams = fullURL.searchParams

    if (req.url === '/api/products' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
        res.end(JSON.stringify(pagination.getProducts(1)))
    }
    else if (myURL!.match(/\?page=/) && (myURL!.match(/&/) === null) && req.method === 'GET') {
        const pg = params.get('page')
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
        res.end(JSON.stringify(pagination.getProducts(pg)))
    }
    else {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Resource Not Found' }))

    }
})

// Checking env port number or else assigning 5000 instead
const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))