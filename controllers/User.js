import { generateToken } from "../middleware/generateToken";
import User from "../models/userModel";
import bcrypt from 'bcrypt'

export const googleSignIn = async(req, res) => {

    const { username, email, photo } = req.body


    try {
        
        //check if user exists
        const user = await User.findOne({ email })

        if(user){
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        }else {

            const generatedPassword = Math.random().toString(36).slice(-8)
            const hashedPassword = await bcrypt.hash(generatedPassword, 10)

            const newUser = await User.create({
                username: username.split(" ") + Math.floor(Math.random() * 100),
                email,
                password: hashedPassword,
                profilePicture: photo
            })

            if(newUser){
                res.status(201).json({
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    profilePicture: newUser.profilePicture,
                    isAdmin: newUser.isAdmin,
                    token: generateToken(newUser._id)
                })

            }
        }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    

}