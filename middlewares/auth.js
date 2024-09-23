// this is little hard
/*
const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  // cookies
  //const userUid = req.cookies?.uid;
  //if (!userUid) return res.redirect("/login");
  // const user = getUser(userUid);

// authorization
const userUid = req.headers ["Authorization"];
  if (!userUid) return res.redirect("/login");
  const token = userUid.split ('Bearer')[1];//"bearer"
  const user = getUser(token);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}
// cookies
/*async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}*/
// authorization
/*async function checkAuth(req, res, next) {
  const userUid = req.headers["authorization"];
   const token = userUid.split("Bearer")[1];
   const user = getUser(token);
  

  req.user = user;
  next();
}
module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};*/
//easy way
const { getUser } = require("../service/auth");

const checkForAuthentication = (req, res, next) => {
  const tokenCoookie = req.cookies?.token;
  req.user = null;

  //if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')) {
  if (!tokenCoookie) {
    return next();
  }

  //const token = authorizationHeaderValue.split('Bearer ')[1];
  const token = tokenCoookie;
  const user = getUser(token);
  req.user = user;
  return next();
};

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }

    if (!roles.includes(req.user.role)) {
      return res.end("Unauthorized");
    }

    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo
};
