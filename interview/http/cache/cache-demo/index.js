const http = require('http');
const fs = require('fs');

http.createServer(function(request, response) {
    if (request.url === '/') {
        // index.html
        // async 异步 sync 同步
        // fs.readFile('test.html', 'utf-8', (err, data) => {

        // })
        // 性能差点
        const html = fs.readFileSync('test.html', 'utf-8');
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(html)
    }
    if (request.url === '/script.js') {
        const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        response.writeHead(200, {
            'Content-Type': 'text/javascript',
            'Expires': expiryDate.toUTCString(),
            'Cache-Control': 'max-age=604800, public'
        });
        const script = fs.readFileSync('script.js', 'utf-8');
        response.end(script);
    }
}).listen(8080);