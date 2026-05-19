"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class successfully {
    static homePage() {
        return { status: 200, json: { message: 'Welcome to backend' } };
    }
    static done(message) {
        return { status: 200, json: { message: message } };
    }
    static created(message) {
        return { status: 201, json: { message: message } };
    }
}
exports.default = successfully;
