import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from './utils/MongoConnect.js';
import userRoutes from './Routes/user.js';
import messageRoutes from './Routes/message.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from './utils/soket.js';
import path from 'path';



dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const mongoURI = process.env.MONGODB_URI;
connectMongoDB(mongoURI, {
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
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
    });
}

server.listen(PORT, () => { console.log("server is started at" + PORT) });