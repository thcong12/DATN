const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req?.typeAdmin) return res.status(401);
    const result =  roles.includes(req.typeAdmin)
    if (!result) return res.sendStatus(401);
    next();
  };
};

export default checkRole;