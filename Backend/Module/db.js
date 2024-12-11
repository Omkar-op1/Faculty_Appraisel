const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://SIH2K24:SIH2K24@cluster0.sp2zg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db=mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to mongodb server');
})

db.on('error', ()=>{
    console.log('MongoDB connection error');
})

db.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
})
const getdb = (instituteName) => {
    const db = mongoose.connection.useDb(instituteName);
    return db;
  };
module.exports= {db,getdb};