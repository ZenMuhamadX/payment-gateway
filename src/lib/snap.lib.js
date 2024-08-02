"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.snap = void 0;
// Instansi Midtrans Payment Gateway
var midtrans_client_1 = __importDefault(require("midtrans-client"));
exports.snap = new midtrans_client_1["default"].Snap({
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    isProduction: false
});
