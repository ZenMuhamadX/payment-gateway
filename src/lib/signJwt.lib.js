"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.signJwt = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var validateInf_1 = require("../interface/validateInf");
// Mendapatkan kunci rahasia dari environment dan memastikan keberadaannya
var key = process.env.JWT_SECRET_KEY || 'Your_secret_key';
// Fungsi untuk menandatangani JWT
var signJwt = function (username, server) {
    // Membuat payload untuk token
    var payload = { username: username, server: server };
    // Validasi payload
    var _a = validateInf_1.validPayloadJwt.validate(payload), error = _a.error, value = _a.value;
    if (error) {
        console.error('Payload validation failed:', error.message);
        throw new Error('Invalid payload for JWT');
    }
    // Menandatangani token dengan algoritma HS256
    try {
        var token = jsonwebtoken_1["default"].sign(value, key, {
            algorithm: 'HS256'
        });
        return token;
        // Penanganan Error
    }
    catch (err) {
        console.error('Error signing JWT:', err);
        throw new Error('Failed to sign JWT');
    }
};
exports.signJwt = signJwt;
