'use strict';

const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const { createServer } = require('http');

const WebSocket = require('ws');

const app = express();
const apps = express();
const PORT = 3000
app.use(express.static(path.join(__dirname, '/public')));
apps.use(bodyParser.json())
apps.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

apps.post("/hook", (req, res) => {
  console.log(req.body) // Call your action on the request here
  res.status(200).end() // Responding is important
})

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function (ws) {
  const id = setInterval(function () {
    ws.send(JSON.stringify("Hello"));
  }, 1000);
  console.log('started client interval');

  ws.on('close', function () {
    console.log('stopping client interval');
    clearInterval(id);
  });
});

server.listen(8080, function () {
  console.log('Listening on http://0.0.0.0:8080');
});
