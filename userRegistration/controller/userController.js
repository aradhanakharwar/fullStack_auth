const userModel = require('../model/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const validator = require('validator');
const axios = require('axios');
const fs = require('fs')



const securePassword = async (pass) => {
    try {
        const hashPassword = await bcryptjs.hash(pass, 10);
        return hashPassword;
    }
    catch (error) {
        console.log(error);
    };
};

const createToken = async (id) => {
    try {
        const token = await jwt.sign({ _id: id }, config.secret_jwt, { expiresIn: '1h' })
        return token;
    } catch (error) {
        console.log(error);
    }
}


//ADD USER ---------------

const registerUser = async (req, res) => {
    console.log('------userdata------');
    console.log("body: ", req.body);
    const { name, email, password, phone, img } = req.body
    if (validator.isEmpty(name)) {
        return res.status(404).send({ msg: 'Please fill the input fields.' })
    }
    if (!validator.isEmail(email)) {
        return res.status(404).send({ msg: 'Invalid email address.' })
    }
    if (!validator.isLength(password, { min: 6 })) {
        return res.status(404).send({ msg: 'Password must be atleast 6 characters long.' })
    }
    if (!validator.matches(phone, /^\d{10}$/)) {
        return res.status(404).send({ msg: 'Invalid phone number.' })
    }

    const Password = await securePassword(req.body.password)
    console.log("49", req.file)
    // const  imageUrl = 'http://' + req.hostname + ':3030/' + req.body.img;
    const user = new userModel(
        {
            name: req.body.name,
            email: req.body.email,
            password: Password,
            phone: req.body.phone,
            // img: req.file.filename //only from node
            img: img //only from react
            // img: fs.readFileSync("uploads/" + img)
            // img: req.body.filename //uploading data without image from both side
            // img: {
            //     data: fs.readFileSync("uploads/" + req.file.filename),
            //     contentType: "image/png",
            // },
        }
    )
    console.log('line 63---', user)

    // console.log(req.body.name, req.body.email, req.body.password, req.body.password);
    const duplicateEmail = await userModel.collection.findOne({ email: req.body.email })
    console.log("....")
    if (duplicateEmail) {
        res.status(404).send({ msg: 'Email id already exists.' })
    } else {
        const datas = await user.save()
        const dataWithToken = await createToken(datas._id)
        res.status(200).send({ msg: "User registered successfully.", result: datas, token: dataWithToken })
    }
};

//ADD USER ---------------X---------------



//LOGIN USER -------------

const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!(email && password)) {
        return res.status(404).send({ msg: 'Input is required.' })
    }
    const user = await userModel.findOne({ email })
    if (user && (await bcryptjs.compare(password, user.password))) {
        const verifyToken = await createToken(user._id)
        res.status(200).send({ result: user, token: verifyToken })
    };
};

//LOGIN USER -------------X---------------


//FETCH SINGLE USER --------------

const findSingleUser = (req, res) => {
    const UID = req.params.id

    userModel.findById(UID)
        .then(data => {
            res.status(200).send({ msg: `${data.name}'s data.`, result: data })
        })
        .catch(error => {
            res.status(404).send({ msg: "User data not fetched.", error })
        })
};

//FETCH SINGLE USER --------------X---------------



//FETCH ALL USER -----------

const fetchAllUser = (req, res) => {
    userModel.find()
        .then(data => {
            console.log("console")
            if (data == 0) {
                return res.status(200).send({ msg: "There re no single user registred." })
            } else {
                return res.status(200).send({ msg: " All users data fetched...", result: data })
            }
        })
        .catch(error => {
            res.status(404).send({ msg: 'All users data not fetched.', error })
        })
}

//FETCH ALL USER ------------X---------------


//UPDATE USER --------------

const updateUser = (req, res) => {
    userModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(data => {
            res.status(200).send({ msg: `${data.name}'s data updated succesfully.`, result: data })
        })
        .catch(error => {
            res.status(400).send({ msg: `'s data not updated.`, error })
        })
}

//UPDATE USER --------------X---------------



//VERIFY USER ----------------

const verifyUser = (req, res) => {
    res.status(200).send({ msg: "You are an authorised user." })
}

//VERIFY USER ----------------X----------------



//DELETE USER -------------

const deleteUser = (req, res) => {
    const id = req.params.id;
    console.log("id :", id);
    userModel.findByIdAndDelete(id)
        .then(data => {
            res.status(200).send({ msg: `${data.name}'s data deleted.`, result: data })
        })
        .catch(error => {
            res.status(400).send({ msg: "User data not deleted.", error })
        })
};

//DELETE USER -------------X--------------



module.exports = {
    registerUser,
    loginUser,
    findSingleUser,
    fetchAllUser,
    updateUser,
    verifyUser,
    deleteUser
};