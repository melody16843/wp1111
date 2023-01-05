import express from 'express'
// import WebSocket from 'ws';
import http from 'http'
import dotenv from "dotenv-defaults"
import mongoose from 'mongoose'
import { WebSocketServer } from "ws";

import wsConnect from './wsConnect.js'
import {v4 as uuidv4} from 'uuid'
// import {useState} from 'react'

import mongo from './mongo.js'

import path from "path";


// import cors from "cors";

const app = express();

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}
// if (process.env.NODE_ENV === "development") {
	// app.use(cors());
// }

mongo.connect();

const server = http.createServer(app)
const wss = new WebSocketServer({ server});
const db = mongoose.connection


db.once('open', () => {
    console.log('mongodb connected')
    wss.on('connection', (ws) => {
        ws.id = uuidv4();
        ws.box = '';
        // wsConnect.initData(ws)
        // console.log(ws)
        ws.onmessage = wsConnect.onMessage(wss, ws);
        ws.once('close', () => {
            wsConnect.close(ws);
        })
    })
    // wss.on('close', (ws) => {
    //     wsConnect.close(ws);
    // })
})

const PORT = process.env.PORT ||4000
// const PORT = 4000;
server.listen(PORT, () =>{
    console.log(`app listening on port ${PORT}!`)
})