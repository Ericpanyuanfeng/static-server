var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)


    response.statusCode = 200
    const filePath = path === '/' ? '/index.html' : path
        // 默认首页（如果路径是'/',就访问 index.html 否则就访问输入的路径就好了）
    const index = filePath.lastIndexOf('.')
    const suffix = filePath.substring(index) // suffix 是后缀的意思
        // substring(index)是截取 index 以及它后面的字符串
    const fileTypes = { // 哈希表 一一对应
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        'png': 'image/png',
        'jpg': 'image/jpeg'
    }
    response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`)
    let content
    try {
        content = fs.readFileSync(`./public${filePath}`)
    } catch (error) {
        content = '文件不存在'
        response.statusCode = 404
    }

    response.write(content)
    response.end()


    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)