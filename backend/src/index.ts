import dotenv from 'dotenv'
dotenv.config()
import e from "express";
import dbConnect from './db/db.js';
const app = e()

import User from './routes/user.Route.js'
import Content from './routes/Content.route.js'

//Body parser
app.use(e.json())

//Port
app.use('/api/v1',User)
app.use('/api/v1',Content)


//PORT 
const PORT = process.env.PORT || 3000

//Database Connection
dbConnect()

app.listen(PORT,()=>{
  console.log(`Server Listen at PORT ${PORT}`);
})