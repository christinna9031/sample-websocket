'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');

const WebSocket = require('ws');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const wss = new WebSocket.Server({ server });
const connections = {}

wss.on('connection', function (ws) {
  console.log(ws)
  ws.send("Hello");

  ws.on('close', function (ws) {
   console.log('stopping client connection');
  });

  ws.on('message', function (e) {
    if (e.name) connections[e.name] = ws
    console.log(e)
    console.log(e.name)
    ws.send(e)

  })

});



server.listen(8080, function () {
  console.log('Listening on http://0.0.0.0:8080');
});
