const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        reuired: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        data: Buffer
        // required: true,
    },
    // img: {
    //     data: Buffer,
    //     contentType: String
    // },
    token: {
        type: String,
        default: ''
    }
})
const User = mongoose.model("user", userSchema);
module.exports = User;


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./server/public/imageUploads/userUploads/")
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + 'user' + path.extname(file.originalname))
//     }
// })

// const maxSize = 2 * 1024 * 1024 // for 1MB

// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true)
//         } else {
//             cb(null, false)
//             return cb(new Error("Only .png, .jpg and .jpeg format allowed!"))
//         }
//     },
//     limits: { fileSize: maxSize }
// })