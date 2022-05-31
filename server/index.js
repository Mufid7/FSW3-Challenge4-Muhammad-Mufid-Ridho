
const http = require('http') 
const path = require('path') 
const fs = require('fs') 
const mime = require('mime')

const cars = require('../data/cars.json')

const { PORT = 8000 } = process.env
const PUBLIC_DIRECTORY = path.join(__dirname, '..', 'public')

// fungsi untuk menampilkan halaman html dari parameter
function getHTML(htmlFileName) {
  const htmlFilePath = path.join(PUBLIC_DIRECTORY, htmlFileName)
  return fs.readFileSync(htmlFilePath, 'utf-8')
}

// fungsi client request
function onRequest(req, res) {
  if (req.url === '/') {
    const html = getHTML('home.html')
    res.writeHead(200)
    res.end(html)
  } else if (
    req.url === '/cars' ||
    req.url.includes('date') ||
    req.url.includes('capacity')
  ) {
    const html = getHTML('carpage.html')
    res.writeHead(200)
    res.end(html)
  } else if (req.url.match('.css$') || req.url.match('.js$')) {
    const filePath = path.join(__dirname, '..', 'public', req.url)
    const fileStream = fs.createReadStream(filePath, 'utf-8')
    const mimeType = mime.getType(filePath)
    res.writeHead(200, { 'Content-Type': mimeType })
    fileStream.pipe(res)
  } else if (req.url.match('.png$')) {
    const filePath = path.join(__dirname, '..', 'public', req.url)
    const fileStream = fs.createReadStream(filePath)
    const mimeType = mime.getType(filePath)
    res.writeHead(200, { 'Content-Type': mimeType })
    fileStream.pipe(res)
  } else if (req.url.match('.jpg$')) {
    const filePath = path.join(__dirname, '..', 'public/img/', req.url)
    const fileStream = fs.createReadStream(filePath)
    const mimeType = mime.getType(filePath)
    res.writeHead(200, { 'Content-Type': mimeType })
    fileStream.pipe(res)
  } else if (req.url === '/api/cars') {
    res.setHeader('Content-type', 'application/json')
    res.writeHead(200)
    res.end(JSON.stringify(cars))
  }
}

// server
const server = http.createServer(onRequest)

server.listen(PORT, '0.0.0.0', () => {
  console.log(`server is listening on port ${PORT}`)
})
