// import express from 'express'
// import http from 'http'
// import dotenv from "dotenv-defaults"
// import mongoose from 'mongoose'
// import WebSocket from 'ws';
// import wsConnect from './wsConnect'
// import {v4 as uuidv4} from 'uuid'
// import {useState} from 'react'

import mongo from './mongo'
import server from './server'

mongo.connect();

// const app = express()
// const server = http.createServer(app)
// const wss = new WebSocket.Server({ server })
// const db = mongoose.connection


// db.once('open', () => {
//     console.log('mongodb connected')
//     wss.on('connection', (ws) => {
//         ws.id = uuidv4();
//         ws.box = '';
//         // wsConnect.initData(ws)
//         // console.log(ws)
//         ws.onmessage = wsConnect.onMessage(wss, ws);
//         ws.once('close', () => {
//             wsConnect.close(ws);
//         })
//     })
//     // wss.on('close', (ws) => {
//     //     wsConnect.close(ws);
//     // })
// })

// const port = process.env.PORT || 4000;
// server.listen({port}, () => {
// console.log(`Listening on http://localhost:${port}`);
// });
// 18
