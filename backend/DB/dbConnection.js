const mongoose = require("mongoose")

const dbConnection = async ()=>{
 const connect =  await mongoose.connect("mongodb://127.0.0.1:27017/e-com")
console.log(connect.connection.name)
}

module.exports = dbConnection;