import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

(async () => {

    try {

        console.log("Host:", process.env.DB_HOST);
        console.log("Port:", process.env.DB_PORT || 3306);
        console.log("User:", process.env.DB_USER);
        console.log("Database:", process.env.DB_NAME);

        const connection = await mysql.createConnection({

            host: process.env.DB_HOST,

            port: Number(process.env.DB_PORT) || 3306,

            user: process.env.DB_USER,

            password: process.env.DB_PASSWORD,

            database: process.env.DB_NAME

        });

        console.log("✅ MySQL Connected");

        const [rows] = await connection.query("SELECT VERSION() AS version");

        console.log(rows);

        await connection.end();

    }

    catch (error) {

        console.error(error);

    }

})();

export default mysql.createPool({

    host: process.env.DB_HOST,

    port: Number(process.env.DB_PORT) || 3306,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME

});