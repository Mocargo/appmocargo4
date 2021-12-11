"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const server_1 = __importDefault(require("./servicios/server"));
const cors = require('cors');
require('dotenv').config();
const routerApi = require('./routes');
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express = require('express');
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
//crear el servidor de aplicaciones.
const app = express();
//crear el directorio publico.
app.use(express.static('public'));
const server = new server_1.default();
const port = process.env.PORT || 3000;
const {logErrors , errorHandler}= require('./middlewares/error.handler');

//app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co','http://localhost:3000'];
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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT");
  next();
});

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});


app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

//body parser se va  ejecutar siempre
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// fileupload
//app.use((0, express_fileupload_1.default)());
app.use(express.json());
//configurar CORS

app.use((0, cors_1.default)({ origin: true, credentials: true }));


mongoose_1.default.connect('mongodb+srv://jcastaneda:2022TiMocargo@cluster0.gzkuf.mongodb.net/mocargo?retryWrites=true&w=majority', (err) => {
    if (err) {
      throw err;
  //console.log('Conectado a mongoose');
    } else {
      console.log('conexión a base de datos');
    }
});

routerApi(app);
app.use(logErrors , errorHandler);

app.listen(port, () => {
console.log('Mi podrt' +  port);
});
