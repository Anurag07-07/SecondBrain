import dotenv from 'dotenv'
dotenv.config()
import e from "express";
import dbConnect from './db/db.js';
import path from "path";
import cors from 'cors'
const app = e()


import User from './routes/user.Route.js'
import Content from './routes/Content.route.js'

//Body parser
app.use(e.json())

app.use(cors())


//Port
app.use('/api/v1',User)
app.use('/api/v1',Content)


//PORT 
const PORT = process.env.PORT || 3000

//Database Connection
dbConnect()


const __dirname = path.resolve();


// Serve frontend
app.use(e.static(path.join(__dirname, "public")));

// For all non-API routes, send index.html
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.listen(PORT,()=>{
  console.log(`Server Listen at PORT ${PORT}`);
})