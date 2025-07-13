 import express from "express"
 import cors from "cors"
 import cookieParser from "cookie-parser"


 const app = express();



 app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
 }));


 //settings up for the data acceptation

 app.use(express.json({limit:"16kb"}));

 //url - data from url

 app.use(express.urlencoded({extended: true, limit: "16kb"}));

 //static files on the server

 app.use(express.static("public"))

 //cookie-parser

 app.use(cookieParser());

 //routes import

import userRouter from "./routes/auth.routes.js"
import incomeRouter from "./routes/income.routes.js"
import expenseRouter from "./routes/expense.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"


// routes declaration
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/income", incomeRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/dashboard", dashboardRouter);

 export {app};



