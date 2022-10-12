const http = require('http');
const url = require('url');
require('dotenv').config();
const qs = require('querystring');

let responder = (req, res, param) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(param);
};

let routes = {
  GET: {
    '/': (req, res) => {
      // console.log('Method GET And Path /');
      // console.log(process.env);
      responder(req, res, `<h1>Get Method => / route </h1>`);
    },
    '/home': (req, res) => {
      // console.log('Method GET And Path Home')
      responder(
        req,
        res,
        `<h1>Get Method => /Home route & Name ${params.query.name} & age ${params.query.age} </h1> `
      );
    },
  },
  POST: {
    '/': (req, res) => {
      responder(req, res, `<h1>Post Method => / route </h1>`);
    },
    '/api/login': (req, res) => {
      let body = '';
      req.on('data', (data) => (body += data));
      req.on('end', () => {
        let query = qs.parse(body);
        console.log('Email: ', query.email, 'Password: ', query.password);

        res.end();
      });
    },
  },
  NA: (req, res) => {
    responder(req, res, `<h1>Error 404 (Not Found)</h1>`);
  },
};

let serverStarter = (req, res) => {
  let reqMethod = req.method;
  let params = url.parse(req.url, true);
  // let name = params.query.name;
  // let age = params.query.age;
  // console.log(params);

  let resolveRoute = routes[reqMethod][params.pathname];
  if (resolveRoute != null && resolveRoute != undefined) {
    resolveRoute(req, res);
  } else {
    routes['NA'](req, res);
  }
};

const server = http.createServer(serverStarter);

server.listen(process.env.PORT, () =>
  console.log(`Server is running at ${process.env.PORT}`)
);
