"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es neceario']
    },
    apellido: {
        type: String,
        requerid: [true, 'El apellido es necesario']
    },
    avatar: {
        type: String,
        default: 'av-.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'el correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'la contraseña es necesario']
    },
    tipodedocumento: {
        type: String,
        required: [true, 'el tipo de documento es obligatorio']
    },
    numerodedocumento: {
        type: Number,
        required: [true, 'el número de cédula es obligatorio']
    },
    celular: {
        type: Number,
        required: [true, 'el número de celular es obligatorio']
    },
    tipodevinculacion: {
        type: String,
        required: [true, 'el tipo de vinculación es obligatorio']
    },
    aceptaterminos: {
        type: String,
        required: [true, 'los términos y condiciones son obligatorias']
    }
});
usuarioSchema.method('compararPassword', function (password = '') {
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Usuario = (0, mongoose_1.model)('Usuario', usuarioSchema);
