//import express, nd router pages, server etc

const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Api Node Challenge</h2>`);
});

//middleware

server.use(logger);

function logger(req, res, next) {
  console.log(`${req.method} Request ${req.url} [${new Date().toISOString()}]`);
  next();
}

module.exports = server;
