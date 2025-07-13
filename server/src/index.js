import dotenv from "dotenv";
dotenv.config({
  path: "./.env"
});



import connectDB from "./db/index.js";

import { app } from "./app.js";





connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERR: ", error);
        throw error;
    });

    app.listen(process.env.PORT || 9000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    });
})
