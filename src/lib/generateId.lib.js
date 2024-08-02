"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.generateUniqueId = void 0;
// Membuat Id transaksi unik
var crypto_1 = __importDefault(require("crypto"));
// Fungsi membuat Id
var generateUniqueId = function () {
    var hash = crypto_1["default"]
        .createHash('sha256')
        .update(crypto_1["default"].randomBytes(64))
        .digest('hex');
    // Mengambil 32 karakter dari hash untuk entropi yang lebih besar
    var id = hash.slice(-32);
    return "0x".concat(id);
};
exports.generateUniqueId = generateUniqueId;
