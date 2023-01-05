import bcryptjs from 'bcryptjs'

const admins = [
  {
    userName: "thcong12",
    fullName: "Nguyen Cong",
    password: bcryptjs.hashSync("123456cong",10) ,
    email: "thcong0210@gmail.com",
    phoneNumber: "0971127769",
    typeAdmin:"631de406f239669134757946",
    isActive: true,
    refreshToken:''
  },
  {
    userName: "thcong13",
    fullName: "Cong Nguyen",
    password: bcryptjs.hashSync("123456cong",10) ,
    email: "thcong004@gmail.com",
    phoneNumber: "0971127769",
    typeAdmin:"631de406f239669134757947",
    isActive: true,
    refreshToken:''
  },
];
export default admins;
