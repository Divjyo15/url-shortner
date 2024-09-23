// here we maintaing the state so we used this(statefull)
//const sessionIdToUserMap = new Map();
// stateless
const jwt = require("jsonwebtoken");
const secret = "random#secret"
// for statefull
/*function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}*/
 function setUser(user){
  
    return jwt.sign(
      {
     _id: user._id,
     email: user.email,
      },
      secret
    );
 }
//statefull
/*function getUser(id) {
  return sessionIdToUserMap.get(id);
}*/
 //stateless

 function getUser(token){
  if(!token) return null;
  try{
 return jwt.verify(token, secret);
  } catch(error)
  {
    return null;
  }
 }
module.exports = {
  setUser,
  getUser,
};
