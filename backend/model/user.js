const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name:{type:String, require: true},
    email:{type:String, require: true},
    password:{type:String, require: true},
    gender:{type:String, require: true},
    month:{type:String, require: true},
    date:{type:String, require: true},
    year:{type:String, require: true},
    likedSongs:{type:[String], default:[]},
    playlists:{type:[String], default:[]},
    isAdmin:{type:Boolean, default:false}
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {_id:this._id, name:this.name,isAdmin:this.isAdmin},
        process.env.JWTPRIVATEKEY,
        {expiresln:"7d"}
    )
    return token;
}


const User = mongoose.model("user", userSchema);