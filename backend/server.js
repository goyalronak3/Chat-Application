const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const app = express()

const authRoutes = require("./routes/auth.routes")
const messageRoutes = require("./routes/message.routes")
const userRoutes = require("./routes/user.routes")

dotenv.config()


app.use(express.json())   //to parse the incoming requests with JSON payloads from (req.body)
app.use(cookieParser())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)


mongoose.connect(process.env.MONGO_DB_URL)
   .then(()=>{
     // listen to port
     console.log("connected to db")
     app.listen(process.env.PORT, () => {
        console.log(`running on port ${process.env.PORT}`)
     })
   })
   .catch((error)=>{
       console.log(error)
   })
