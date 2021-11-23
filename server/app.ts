const path = require('path');
const http = require('http');
const express = require('express');
import { Server} from "socket.io";
const router = require('./routes');
import registerConnectionEventHandlers from './sockets/connection.socket';
import { Request, Response, NextFunction } from 'express';

require('dotenv').config();
const port = process.env.PORT || 3000;
const staticPath = path.join(__dirname, './public');

// 1. create Express app instance, configure static assets & routes
const expressApp = express();
expressApp.use((req:Request, res:Response, next:NextFunction) => {
  console.log(`${req.method} received for URL: ${req.url}`);
  next();
});
expressApp.use(express.static(staticPath));
expressApp.use(express.json());
expressApp.use('/', router);

// 2. create Node HTTP server and pass it the Express instance
const httpServer = http.createServer(expressApp);
// 3.create socket.io server, and pass it the HTTP server
const socketServer = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: "*"
  }
});
// 4. declare socket listeners
registerConnectionEventHandlers(socketServer);
// 5. listen to the HTTP server, NOT the Express app
httpServer.listen(port, () => console.log(`HTTP server started on port:${port}`));