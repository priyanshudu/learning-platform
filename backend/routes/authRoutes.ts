import { Router } from "express";
import {

    login,
    register

} from "../controllers/authController";

const router = Router();

// ==========================================
// Authentication Routes
// ==========================================

// Student Login

router.post(

    "/login",

    login

);

router.post("/register", register);
// ==========================================
// Export
// ==========================================

export default router;

