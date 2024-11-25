"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                status: 'error',
                message: 'Authorization header missing'
            });
        }
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid authorization format. Use Bearer token'
            });
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = (0, jwt_1.verifyToken)(token);
            if (!decoded.userId) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid token payload'
                });
            }
            req.user = decoded.userId;
            next();
        }
        catch (tokenError) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid or expired token'
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error during authentication'
        });
    }
});
exports.authMiddleware = authMiddleware;
