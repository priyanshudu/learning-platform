import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../config/jwt";

// ==========================================
// JWT Authentication Middleware
// ==========================================

export const authenticate = (

    req: Request,

    res: Response,

    next: NextFunction

): void => {

    try {

        const authHeader = req.headers.authorization;

        if (

            !authHeader ||

            !authHeader.startsWith("Bearer ")

        ) {

            res.status(401).json({

                success: false,

                message: "Access Denied"

            });

            return;

        }

        const token = authHeader.split(" ")[1];

        const decoded: any = verifyToken(token);

        (req as any).student = decoded;

        next();

    }

    catch (error) {

        res.status(401).json({

            success: false,

            message: "Invalid Token"

        });

    }

};
