
## vh

A tiny and fast vhost hash router for http/https/spdy

## Installation

```bash
$ npm install vh
```

## Usage

```js

var http = require('http'),
    vh = require('vh');

http.createServer(
    vh()
        .when('domain.com', app1)
        .when('*.domain.com', app2)
        .otherwise(appNotFound)
);

function app1(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Application 1');
}

function app2(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Application 2');
}

function appNotFound(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('No Application Found');
}

```