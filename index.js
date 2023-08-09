const express = require('express');
const mongoose =require('mongoose');
const dotenv = require("dotenv");
const authRoute = require("./Routes/Auth");
const postRoutes = require('./Routes/Posts');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) 
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
 
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoutes);
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})