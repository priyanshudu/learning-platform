import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "learningplatform";

// ==========================================
// Extend Request
// ==========================================

export interface AuthRequest extends Request {

    student?: {

        student_id: number;

        email: string;

    };

}

// ==========================================
// Verify JWT
// ==========================================

export const verifyToken = (

    req: AuthRequest,

    res: Response,

    next: NextFunction

): void => {

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

    try {

        const decoded = jwt.verify(

            token,

            JWT_SECRET

        ) as {

            student_id: number;

            email: string;

        };

        req.student = decoded;

        next();

    }

    catch {

        res.status(401).json({

            success: false,

            message: "Invalid Token"

        });

    }

};