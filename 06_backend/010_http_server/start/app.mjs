import * as http from 'http';

const server = http.createServer((req, res) => {
  console.log('サーバ起動');
  // console.log(req);
  // console.log(res);
  res.end('hello Node server');
});

server.listen(8080);
