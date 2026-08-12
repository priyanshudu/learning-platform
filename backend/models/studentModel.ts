import db from "../config/db";

// ==========================================
// Find Student By Email
// ==========================================

export const findStudentByEmail = async (email: string) => {

    const [rows]: any = await db.execute(

        `
        SELECT
            student_id,
            student_code,
            full_name,
            email,
            password,
            is_verified
        FROM students
        WHERE email = ?
        LIMIT 1
        `,

        [email]

    );

    return rows[0];

};

// ==========================================
// Find Student By ID
// ==========================================

export const findStudentById = async (studentId: number) => {

    const [rows]: any = await db.execute(

        `
        SELECT
            student_id,
            student_code,
            full_name,
            email,
            college_name,
            education,
            is_verified
        FROM students
        WHERE student_id = ?
        LIMIT 1
        `,

        [studentId]

    );

    return rows[0];

};
// ==========================================
// Create Student
// ==========================================

export const createStudent = async (

    student_code: string,
    full_name: string,
    email: string,
    mobile: string,
    college_name: string,
    education: string,
    password: string

) => {

    const [result]: any = await db.execute(

        `
        INSERT INTO students
        (
            student_code,
            full_name,
            email,
            mobile,
            college_name,
            education,
            password,
            is_verified
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?)
        `,

        [
            student_code,
            full_name,
            email,
            mobile,
            college_name,
            education,
            password,
            1
        ]

    );

    return result;

};

// ==========================================
// Count Students
// ==========================================

export const getStudentCount = async () => {

    const [rows]: any = await db.execute(

        `SELECT COUNT(*) AS total FROM students`

    );

    return rows[0].total;

};