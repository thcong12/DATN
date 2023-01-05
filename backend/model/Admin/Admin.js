import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const adminSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    fullName:{
        type: String,
        require: true,
        default: "",
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
    typeAdmin:   {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "AdminType",
    },
    refreshToken:{
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
adminSchema.methods.matchPassword = function(enterPassword){
  return bcryptjs.compareSync(enterPassword,this.password)
}
adminSchema.pre("save",async function (next){
  if(!this.isModified("password")){
    next()
  }else{
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next()
  }
})
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
