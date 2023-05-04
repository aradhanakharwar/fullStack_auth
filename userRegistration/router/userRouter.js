const express = require('express');
const controller = require('../controller/userController');
const auth = require('../middleware/Auth');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const router = express.Router()


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// Define static folder 
// router.use(express.static('public'))


// Use multer diskStorage for file upload
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../uploads'), function (error, success) {
//             if (error) throw error
//         })
//     },

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
//     //   });

//     // filename: function (req, file, cb) {
//     //     const name = Date.now() + '_' + path.extname(file.originalname)
//     //     cb(null, name, function (error1, success1) {
//     //         if (error1) throw error1
//     //     })
//     // }
// })


// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });







const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../uploads'))
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + 'user' + path.extname(file.originalname))
        }
    })
    
    const maxSize = 2 * 1024 * 1024 // for 1MB
    
    const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "testImage/png" || file.mimetype == "testImage/jpg" || file.mimetype == "testImage/jpeg") {
                cb(null, true)
            } else {
                cb(null, false)
                return cb(new Error("Only .png, .jpg and .jpeg format allowed!"))
            }
        },
        limits: { fileSize: maxSize }
    })





// define uploaded storage path
// const upload = multer({ storage: storage })

router.post('/register', upload.single('testImage'), controller.registerUser);
router.post('/login', controller.loginUser);
router.get('/singleuser/:id', controller.findSingleUser);
router.get('/allusers', controller.fetchAllUser);
router.put('/updateuser/:id', upload.single('testImage'), controller.updateUser);
router.get('/verify', auth, controller.verifyUser);
router.get('/deleteuser/:id', controller.deleteUser);

module.exports = router;