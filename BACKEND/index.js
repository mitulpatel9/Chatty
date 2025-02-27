const express = require('express');
require('dotenv').config();
const { connectMongoDB } = require('./utils/MongoConnect');
const userRoutes = require('./Routes/user');
const messageRoutes = require('./Routes/message')
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { app, server } = require('./utils/soket');
const path = require('path');

const PORT = process.env.PORT;
const __dirname = path.resolve();

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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

server.listen(PORT, () => { console.log("server is started at" + PORT) });