import { Request, Response } from "express";


import {

    loginStudent,
    registerStudent

} from "../services/authService";

// ==========================================
// Student Login
// ==========================================

export const login = async (

    req: Request,

    res: Response

): Promise<void> => {

    try {

        const {

            email,

            password

        } = req.body;

        // ==========================================
        // Validate Input
        // ==========================================

        if (

            !email ||

            !password

        ) {

            res.status(400).json({

                success: false,

                message: "Email and Password are required"

            });

            return;

        }

        // ==========================================
        // Login Service
        // ==========================================

        const result = await loginStudent(

            email,

            password

        );

        if (!result.success) {

            res.status(401).json(result);

            return;

        }

        res.status(200).json(result);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};


// ==========================================
// Student Register
// ==========================================

export const register = async (

    req: Request,
    res: Response

): Promise<void> => {

    try {

        const result = await registerStudent(req.body);

        if (!result.success) {

            res.status(400).json(result);

            return;

        }

        res.status(201).json(result);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};