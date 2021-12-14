import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
name:String,
description:String,
dbStatus:Boolean,
registerDate : {type:Date, default: Date.now}, 
}); 

const role = mongoose.model("roles",roleSchema);

export default role;