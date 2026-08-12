import multer from "multer";

import {

    CloudinaryStorage

} from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary";

// ==========================================
// Cloudinary Storage
// ==========================================

const storage = new CloudinaryStorage({

    cloudinary,

    params: async (

        req,

        file

    ) => {

        let folder = "learning-platform/files";

        let resource_type: "image" | "video" | "raw" = "raw";

        // ==========================================
        // Images
        // ==========================================

        if (

            file.mimetype.startsWith("image/")

        ) {

            folder = "learning-platform/images";

            resource_type = "image";

        }

        // ==========================================
        // Videos
        // ==========================================

        else if (

            file.mimetype.startsWith("video/")

        ) {

            folder = "learning-platform/videos";

            resource_type = "video";

        }

        // ==========================================
        // Audio
        // ==========================================

        else if (

            file.mimetype.startsWith("audio/")

        ) {

            folder = "learning-platform/audio";

            resource_type = "video";

        }

        // ==========================================
        // PDFs & Documents
        // ==========================================

        else {

            folder = "learning-platform/documents";

            resource_type = "raw";

        }

        return {

            folder,

            resource_type,

            public_id:

                Date.now() +

                "-" +

                file.originalname.split(".")[0]

        };

    }

});

// ==========================================
// Upload Middleware
// ==========================================

const upload = multer({

    storage,

    limits: {

        fileSize:

            500 *

            1024 *

            1024

    }

});

// ==========================================
// Export
// ==========================================

export default upload;