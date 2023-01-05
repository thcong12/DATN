import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';


const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    section:[{
      type: String,
      require: true,
    }],
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = function(enterPassword){
  return bcryptjs.compareSync(enterPassword,this.password)
}
userSchema.pre("save",async function (next){
  if(!this.isModified("password")){
    next()
  }else{
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next()
  }
})

const User = mongoose.model("User", userSchema);
export default  User;
