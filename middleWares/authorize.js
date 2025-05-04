// const isAdmin =(req , res , next)=>{
//      if(req.)
// }

const authorize = (roles) => {
  return (req, res, next) => {
    //  = await console.log(req);
    console.log(`before include :${req.user.role}`);

    if (!roles.includes(req.user.role)) {
      console.log(`after include :${req.user.role}`);

      return res.status(403).json({ message: "access denied" });
    }
    next();
  };
};
module.exports = authorize;
