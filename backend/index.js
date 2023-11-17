const express = require('express');
const mongoose = require('mongoose')
const dbConnection = require("./DB/dbConnection")
const User = require('./DB/userModel');
const userRouter = require('./Routes/routes');
const cors = require('cors');
const productRoutes = require('./Routes/productRoutes');

const app = express();
dbConnection();
app.use(cors())
app.use(express.json())
app.use('/ecom/users',userRouter)
app.use('/ecom/products',productRoutes);
app.listen(5000);