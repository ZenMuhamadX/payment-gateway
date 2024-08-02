"use strict";
// Fungsi Verifikasi Jsonwebtoken
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyJwt = void 0;
// Module
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Mendapatkan kunci rahasia dari environment dan memastikan keberadaannya
var key = process.env.JWT_SECRET_KEY || 'default_secret_key';
var verifyJwt = function (token) {
    try {
        // Verifikasi token JWT
        var decoded = jsonwebtoken_1["default"].verify(token, key, { complete: true });
        return {
            error: false,
            errorMessage: null,
            isValidJwt: true,
            data: {
                header: decoded.header,
                payload: decoded.payload
            }
        };
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1["default"].JsonWebTokenError) {
            // Khusus menangani kesalahan JWT
            return {
                error: true,
                errorMessage: 'Invalid JWT token',
                isValidJwt: false
            };
        }
        else if (error instanceof Error) {
            // Menangani kesalahan umum
            return { error: true, errorMessage: error.message, isValidJwt: false };
        }
        else {
            // Menangani kesalahan tak dikenal
            return { error: true, errorMessage: 'Unknown error', isValidJwt: false };
        }
    }
};
exports.verifyJwt = verifyJwt;
