import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export interface AuthRequest extends Request {
    user?: number;
}

interface JWTPayload {
    userId: number;
    email: string;
}

export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
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
            const decoded = verifyToken(token) as JWTPayload;

            if (!decoded.userId) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid token payload'
                });
            }

            req.user = decoded.userId;
            next();
        } catch (tokenError) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid or expired token'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error during authentication'
        });
    }
};