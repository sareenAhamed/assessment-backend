import User from "../models/User.js";

// Register User
export const addUser = async(req, res) => {
    try {
        const userData = new User(req.body);
        const {email} = userData;

        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message: "User already exist."})
        }

        await userData.save();
        return res.status(200).json({message: "User registration successful!"}) 

    } catch (error) {
        return res.status(500).json({error: "Internal Server Error."})
    }
}

// Login User
export const loginUser = async (req, res) =>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
            
        }
        return res.json({message: 'User login successfu!'});

    } catch (error) {
        return res.status(500).json({error: "Internal Server Error."})
    }
}
