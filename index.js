"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const server_1 = __importDefault(require("./servicios/server"));
const cors = require('cors');
const mongoose_1 = __importDefault(require("mongoose"));
const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = process.env.PORT || 3000;
const {logErrors , errorHandler}= require('./middlewares/error.handler');
const body_parser_1 = __importDefault(require("body-parser"));
const server = new server_1.default();


app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));


app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

//body parser se va  ejecutar siempre
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// fileupload


app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});


mongoose_1.default.connect('mongodb+srv://jcastaneda:2022TiMocargo@cluster0.gzkuf.mongodb.net/mocargo?retryWrites=true&w=majority', (err) => {
    if (err)
        throw err;
    console.log('Conectado a mongoose');
});



routerApi(app);
app.use(logErrors , errorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});
