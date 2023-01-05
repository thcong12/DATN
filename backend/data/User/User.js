import bcryptjs from 'bcryptjs'

const users = [
  {
    userName: "thcong12",
    firstName: "Cong",
    lastName: "Nguyen",
    password: bcryptjs.hashSync("123456cong",10) ,
    email: "thcong0210@gmail.com",
    phoneNumber: "0971127769",
    isActive: true,
  },
  {
    userName: "thcong13",
    firstName: "Cong",
    lastName: "Nguyen",
    password: bcryptjs.hashSync("123456cong",10) ,
    email: "thcong004@gmail.com",
    phoneNumber: "0971127768",
    isActive: true,
  },
];
export default users;
