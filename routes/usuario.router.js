"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../servicios/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const userRoutes = (0, express_1.Router)();
const express = require('express');
const router = express.Router();

//login



router.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'usuario/contraseña no son correctos'
            });
        }
        if (userDB.compararPassword(body.password)) {
            const tokenUser = token_1.default.getJwToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar,
                apellido: userDB.apellido,
                tipodedocumento: userDB.tipodedocumento,
                celular: userDB.celular,
                tipodevinculacion: userDB.tipodevinculacion,
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'usuario/contraseña no son correctos****'
            });
        }
    });
});
//crear un usuario
router.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        //encriptar las contraseñas en node
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar,
        tipodedocumento: req.body.tipodedocumento,
        numerodedocumento: req.body.numerodedocumento,
        celular: req.body.celular,
        tipodevinculacion: req.body.tipodevinculacion,
        aceptaterminos: req.body.aceptaterminos
    };
    usuario_model_1.Usuario.create(user).then(userDB => {
        const tokenUser = token_1.default.getJwToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar,
            apellido: userDB.apellido,
            tipodedocumento: userDB.tipodedocumento,
            numerodedocumento: userDB.numerodedocumento,
            celular: userDB.celular,
            tipodevinculacion: userDB.tipodevinculacion
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//actualizar usuario
router.post('/update', autenticacion_1.verificaToken, (req, res) => {
    //sino vienen datos utilizar los que ya estaban
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        apellido: req.body.apellido || req.usuario.apellido,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar,
        tipodedocumento: req.body.tipodedocumento || req.usuario.tipodedocumento,
        numerodedocumento: req.body.numerodedocumento || req.usuario.numerodedocumento,
        celular: req.body.celular || req.usuario.numerodedocumento
    };
    //id y datos que quiero actualizar
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un nuevo usuario'
            });
        }
        const tokenUser = token_1.default.getJwToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar,
            apellido: userDB.apellido,
            tipodedocumento: userDB.tipodedocumento,
            numerodedocumento: userDB.numerodedocumento,
            celular: userDB.celular,
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    });
});

router.get('/', [autenticacion_1.verificaToken], (req, res) => {
  const usuario = req.usuario;
  res.json({
      ok: true,
      usuario
  });
});

module.exports = router;
exports.default = userRoutes;

