import express from 'express';
import dotenv from 'dotenv';
import { connectMongoDB } from './utils/MongoConnect.js';
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





app.use('/api/auth', userRoutes);
app.use('/api/mess', messageRoutes);

if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.join(__dirname, '..', 'FRONTEND', 'dist');
    console.log(frontendPath)
    app.use(express.static(frontendPath));

    app.get('*', (req, res) => {
        const indexPath = path.join(frontendPath, 'index.html');

        console.log(indexPath)
        res.sendFile(indexPath, (err) => {
            if (err) {
                console.error("❌ ERROR sending index.html:", err);
                res.status(500).send("Internal Server Error");
            }
        });
    });

}

server.listen(PORT, () => {
    console.log("server is started at" + PORT);
    connectMongoDB();
});