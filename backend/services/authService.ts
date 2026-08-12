import bcrypt from "bcrypt";

import { generateToken } from "../config/jwt";
import { initializeStudentProgress } from "./progressService";

import {

    findStudentByEmail,
    createStudent,
    getStudentCount

} from "../models/studentModel";
// ==========================================
// Login Student
// ==========================================

export const loginStudent = async (

    email: string,

    password: string

) => {

    // ==========================================
    // Find Student
    // ==========================================

    const student = await findStudentByEmail(email);

    if (!student) {

        return {

            success: false,

            message: "Invalid Email or Password"

        };

    }

    // ==========================================
    // Check Verification
    // ==========================================

    if (!student.is_verified) {

        return {

            success: false,

            message: "Account not verified"

        };

    }

    // ==========================================
    // Compare Password
    // ==========================================

    const isMatch = await bcrypt.compare(

        password,

        student.password

    );

    if (!isMatch) {

        return {

            success: false,

            message: "Invalid Email or Password"

        };

    }

    // ==========================================
    // Generate JWT
    // ==========================================

    const token = generateToken({

        student_id: student.student_id,

        email: student.email

    });

    // ==========================================
    // Return Response
    // ==========================================

    return {

        success: true,

        message: "Login Successful",

        token,

        student: {

            student_id: student.student_id,

            student_code: student.student_code,

            full_name: student.full_name,

            email: student.email

        }

    };

};
// ==========================================
// Register Student
// ==========================================



export const registerStudent = async (data: any) => {

    const {

        full_name,
        email,
        mobile,
        college_name,
        education,
        password

    } = data;

    const existingStudent = await findStudentByEmail(email);

    if (existingStudent) {

        return {

            success: false,
            message: "Email already registered"

        };

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const totalStudents = await getStudentCount();

    const studentCode = `STU${String(totalStudents + 1).padStart(5, "0")}`;

    try {

        const result: any = await createStudent(
   
            studentCode,
            full_name,
            email,
            mobile,
            college_name,
            education,
            hashedPassword

        );
 console.log("Insert Result:", result)
        // ==========================================
        // Initialize Progress
        // ==========================================

        await initializeStudentProgress(

            result.insertId

        );

        return {

            success: true,
            message: "Registration Successful"

        };

    }

    catch (error) {

        console.error(error);

        return {

            success: false,
            message: "Database Error"

        };

    }

};
