import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Req } from '../types/request';

export async function isAuthenticated(req: Req, res: Response, next: any) {
    let token
    try {
        token = req.headers.authorization?.split(' ')[1]
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!token) {
        return res.status(401).json({
            message: 'Error: No token provided.'
        });
    }

    try {
        const user = jwt.verify(token, process.env.SECRET as string);
        req.user = user as string;
        next();
    } catch (err) {
        return res.status(500).json({
            message: 'Error: Failed to authenticate token.'
        });
    }
}