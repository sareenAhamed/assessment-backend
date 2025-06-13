import User from "../models/User.js";

// Register User
export const addUser = async(req, res) => {
    try {
        const userData = new User(req.body);
        const {username, email, password} = userData;

        // Input Validation
        if (!username.trim() || username.length < 3) {
            return res.status(400).json({ error: 'Name must be at least 3 characters' });
        }

        if (!email.trim() || !email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        if (!password.trim() || password.length < 6) {
            return res.status(400).json({ error: 'Password too short' });
        }

        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message: "User already exist."})
        }

        // Add User
        await userData.save();
        return res.status(200).json({message: "User registration successful!"}) 

    } catch (error) {
        return res.status(500).json({error: "Internal Server Error."})
    }
}


// Login User
export const loginUser = async (req, res) =>{
    try {
        const userData = new User(req.body);
        const { email, password } = userData;

        // Input Validation
        if (!email.trim() || !email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        if (!password.trim() || password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Check and Login User
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
            
        }
        return res.json({message: 'User login successfu!'});

    } catch (error) {
        return res.status(500).json({error: "Internal Server Error."})
    }
}
