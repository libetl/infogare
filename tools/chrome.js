const chrome = require('chrome-launch')

chrome('http://localhost:3000', {args:['--disable-web-security', '--remote-debugging-port=9222', '--user-data-dir']})
