import { generateToken } from "../middleware/generateToken.js";
import User from "../models/userModel.js";
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

            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }

            const newUser = await User.create({
                // username: username.split(" ").join("") + Math.floor(Math.random() * 100),
                username: adjectives[getRandomInt(adjectives.length)] + nouns[getRandomInt(nouns.length)],
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

const adjectives = [
    "Adorable",
    "Beautiful",
    "Charming",
    "Delightful",
    "Elegant",
    "Fancy",
    "Gorgeous",
    "Handsome",
    "Innocent",
    "Joyful",
    "Kind",
    "Lovely",
    "Magnificent",
    "Neat",
    "Outstanding",
    "Pretty",
    "Quaint",
    "Radiant",
    "Shiny",
    "Tender",
    "Unique",
    "Vibrant",
    "Wonderful",
    "Youthful",
    "Zealous",
    "Amazing",
    "Brilliant",
    "Cheerful",
    "Dazzling",
    "Exquisite",
    "Fascinating",
    "Glorious",
    "Happy",
    "Intelligent",
    "Jovial",
    "Lively",
    "Marvelous",
    "Nice",
    "Optimistic",
    "Playful",
    "Quiet",
    "Resplendent",
    "Splendid",
    "Tremendous",
    "Vivid",
    "Witty",
    "Zeal",
    "Blissful",
    "Captivating",
    "Divine",
    "Excellent",
    "Fantastic",
    "Graceful",
    "Harmonious",
    "Inspiring",
    "Jubilant",
    "Luxurious",
    "Majestic",
    "Noble",
    "Opulent",
    "Precious",
    "Ravishing",
    "Serene",
    "Thrilling",
    "Valiant",
    "Whimsical",
    "Zen",
    "Adventurous",
    "Bold",
    "Charismatic",
    "Dynamic",
    "Energetic",
    "Fearless",
    "Gregarious",
    "Heroic",
    "Inventive",
    "Jazzy",
    "Kinetic",
    "Luminous",
    "Magnetic",
    "Optimistic",
    "Passionate",
    "Resilient",
    "Sensational",
    "Tangible",
    "Vibrant",
    "Wondrous",
    "Zealous",
    "Alluring",
    "Bewitching",
    "Confident",
    "Daring",
    "Eloquent",
    "Fierce",
    "Graceful",
    "Hypnotic",
    "Intriguing",
    "Jubilant",
    "Keen",
    "Luscious",
    "Mysterious",
    "Opulent",
    "Playful",
    "Radiant",
    "Seductive",
    "Tantalizing",
    "Vivacious",
    "Whimsical",
];

const nouns = [
    "Apple",
    "Banana",
    "Car",
    "Dog",
    "Elephant",
    "Flower",
    "Guitar",
    "House",
    "Ice Cream",
    "Jacket",
    "Kite",
    "Lion",
    "Mountain",
    "Notebook",
    "Ocean",
    "Piano",
    "Quilt",
    "River",
    "Sun",
    "Tree",
    "Umbrella",
    "Violin",
    "Waterfall",
    "Xylophone",
    "Yacht",
    "Zebra",
    "Airplane",
    "Beach",
    "Cat",
    "Desk",
    "Earth",
    "Forest",
    "Globe",
    "Hat",
    "Island",
    "Jungle",
    "Key",
    "Laptop",
    "Moon",
    "Nest",
    "Orchard",
    "Penguin",
    "Queen",
    "Rainbow",
    "Star",
    "Teapot",
    "Unicorn",
    "Volcano",
    "Wallet",
    "Xylophonist",
    "Yard",
    "Zeppelin",
    "Arch",
    "Butterfly",
    "Castle",
    "Dolphin",
    "Eagle",
    "Fountain",
    "Garden",
    "Hammer",
    "Igloo",
    "Jar",
    "Kangaroo",
    "Lemon",
    "Map",
    "Ninja",
    "Octopus",
    "Puzzle",
    "Quilt",
    "Rocket",
    "Ship",
    "Turtle",
    "Unicorn",
    "Vase",
    "Whale",
    "Xylophone",
    "Yogurt",
    "Zebra",
    "Anchor",
    "Book",
    "Candle",
    "Dragon",
    "Egg",
    "Fire",
    "Guitar",
    "Hammer",
    "Ice",
    "Jewel",
    "Kite",
    "Lamp",
    "Magnet",
    "Nail",
    "Owl",
    "Pencil",
    "Quilt",
    "Rain",
    "Snow",
    "Tiger",
    "Umbrella",
    "Vase",
    "Wind",
    "Xylophone",
    "Yarn",
    "Zeppelin",
];