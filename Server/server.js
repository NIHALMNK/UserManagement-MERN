import express from 'express';
import dotenv from 'dotenv';
import ConnectDB from "./config/dataBase.js";
import morgan from 'morgan';
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
dotenv.config();
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/users",userRouter)
app.use("/api/admin",adminRouter)


//-------------server start---------------->
const PORT=process.env.PORT||4000;
const startServer=async()=>{
    await ConnectDB()
    app.listen(PORT,()=>{
        console.log(`Server running on http://localhost:${PORT}/api/users`);
    });
}
startServer()