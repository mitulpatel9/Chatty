const express = require('express');
require('dotenv').config();
const { connectMongoDB } = require('./utils/MongoConnect');
const userRoutes = require('./Routes/user');
const messageRoutes = require('./Routes/message')
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


connectMongoDB('mongodb://127.0.0.1:27017/ChatApp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected successfully to ChatApp'))
    .catch((err) => console.log('MongoDB connection error: ', err));

app.get('/', (req, res) => {
    res.send("hello mitul");
});

app.use('/api/auth', userRoutes);
app.use('/api/mess', messageRoutes);


app.listen(PORT, () => { console.log("server is started at" + PORT) });