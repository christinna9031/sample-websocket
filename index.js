'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');

const WebSocket = require('ws');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function (ws) {
  ws.send("Hello");

  ws.on('close', function (ws) {
    ws.send("Connection closed")
    console.log('stopping client connection');
  });

  ws.on('message', function (e) {
    console.log(e)
    ws.send(e)

  })

});



server.listen(8080, function () {
  console.log('Listening on http://0.0.0.0:8080');
});
