import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
    const body = req.body
    const { name, email, password } = body;

    //ccheck if all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please provide name, email and password' });
    }

    //check if user already exists
    const existingUser = await prisma.user.findUnique({
         where: { email } 
    });
    if (existingUser) {
        return res
        .status(400)
        .json({ error: 'User already exists with this email' });
    }    

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
    res.status(201).json({ 
        status: "success", 
        message: "User registered successfully",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email     
            }        
        } 
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Check if user email exists in the table   
    const user = await prisma.user.findUnique({
        where: { email: email }
    });
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful' });
}
 
export {register, login}