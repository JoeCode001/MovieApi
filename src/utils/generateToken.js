import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    const payloaad = { id: userId };
    const token = jwt.sign(
        payloaad, 
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });  
    return token;
}