'use strict';
const redis = require('redis');

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Redis

const redisPort = process.env.redisPort;
const redisHost = process.env.redisHost;
const redisPassword = process.env.redisPassword;

const client = redis.createClient(redisPort, redisHost);

client.on('connect', function() {
  client.auth(redisPassword, () => {
    console.log('Redis client authenticated');
  })
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

// App
const app = express();
app.get('/', (req, res) => {
  res.send(`Redis connected on ${redisHost}:${redisPort} with password ${redisPassword}`);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);