"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateAuthToken = exports.generateOtpToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const OTP_SECRET = process.env.OTP_SECRET || 'otp-secret-key';
const generateOtpToken = (email, otp) => {
    return jsonwebtoken_1.default.sign({ email, otp }, OTP_SECRET, { expiresIn: '5m' });
};
exports.generateOtpToken = generateOtpToken;
const generateAuthToken = (userId, email) => {
    return jsonwebtoken_1.default.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });
};
exports.generateAuthToken = generateAuthToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        throw new Error('Invalid token');
    }
};
exports.verifyToken = verifyToken;
