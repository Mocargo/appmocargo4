"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const server_1 = __importDefault(require("./servicios/server"));
const cors = require('cors');
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_1 = __importDefault(require("./routes/post"));
const express = require('express');
const routerApi = require('./routes');
const app = express();
const server = new server_1.default();
const port = process.env.PORT || 3000;
const {logErrors , errorHandler}= require('./middlewares/error.handler');



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

//rutas de mi aplicacion


server.app.use( usuario_1.default);
server.app.use( post_1.default);

// fileupload
server.app.use((0, express_fileupload_1.default)());


mongoose_1.default.connect('mongodb+srv://jcastaneda:2022TiMocargo@cluster0.gzkuf.mongodb.net/mocargo?retryWrites=true&w=majority', (err) => {
    if (err) {
      throw err;
  console.log('Conectado a mongoose');
    } else {
      console.log('conexión a base de datos');
    }
});


routerApi(app);
app.use(logErrors , errorHandler);



app.listen(port, () => {
  console.log('Mi port' +  port);
});
