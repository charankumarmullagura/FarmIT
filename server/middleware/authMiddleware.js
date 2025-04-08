// import jwt from 'jsonwebtoken';

// const authenticateUser = (req, res, next) => {
//     let token = req.headers.authorization;
//     if (!token) return res.status(401).json({ message: "Not authorized" });

//     try {
//         const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

// export const isAdmin = (req, res, next) => {
//     if (!req.user || req.user.role !== 'admin') {
//         return res.status(403).json({ message: "Admin access required" });
//     }
//     next();
// };

// export { authenticateUser };


import jwt from 'jsonwebtoken';
   const authorizationUser = (req, res, next) =>{
    const token = req.headers.authorization;
   
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
         next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
const checkRole = (roles) => (req, res, next) => {
    
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Access not allowed' });
        }
        next();
};
      
export  {authorizationUser,checkRole} 
