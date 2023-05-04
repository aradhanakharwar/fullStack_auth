const express = require('express');
const app = express();
const router = require('./router/userRouter');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');

// const http = require('http')
// const server = http.createServer(app)
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(express.static(path.join(__dirname, 'uploads')));


app.use(bodyParser.json());

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(router);

const port = 3030;

app.listen(port, () => {
    console.log(`App is running on Port http://localhost:${port}`);
})
// mongoose.connect("mongodb+srv://Aradhana:Aradhana2001@cluster0.qpqzg2q.mongodb.net/authUSer", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
mongoose.connect("mongodb://0.0.0.0:27017/authUser", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.on('error', err => { console.log('connection failed', err); });
mongoose.connection.on('connected', connected => { console.log('connection established with data base.'); })



// app.listen(3000, function () {
//     console.log(`App is running on Port http://localhost:${3000}`);
// });