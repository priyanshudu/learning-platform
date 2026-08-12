import { findStudentById } from "../models/studentModel";

// ==========================================
// Get Student Profile
// ==========================================

export const getStudentProfile = async (

    studentId: number

) => {

    // ==========================================
    // Find Student
    // ==========================================

    const student = await findStudentById(studentId);

    if (!student) {

        return {

            success: false,

            message: "Student not found"

        };

    }

    // ==========================================
    // Return Student
    // ==========================================

    return {

        success: true,

        student: {

            student_id: student.student_id,

            student_code: student.student_code,

            full_name: student.full_name,

            email: student.email,

            college_name: student.college_name,

            education: student.education

        }

    };

};