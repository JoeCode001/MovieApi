import jwt from "jsonwebtoken"
import { prisma } from "../config/db.js";

//RRead the token from the cookie, verify it, and attach the user info to the request object for use in protected routes
export const authMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]; // Extract token from "Bearer <token>"
    } else if (req.cookies?.token) {
        token = req.cookies.token; // Extract token from cookie
    } 

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized  access, token missing' });
    }                    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;                                              
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized access, user not found' });
        }       
        req.user = user; // Attach user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Error verifying token:', err);
        return res.status(401).json({ error: 'Unauthorized access, invalid token' });
    }   
}