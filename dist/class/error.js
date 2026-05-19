"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class error {
    static error(message) {
        return { status: 400, json: { message: message } };
    }
}
exports.default = error;
