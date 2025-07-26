import JsonWebToken from "jsonwebtoken";
import User from "../../models/User.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Fill all the fields." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        try {
            const token = JsonWebToken.sign(
                { id: newUser._id, email: newUser.email },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );
            return res
                .status(201)
                .json({ message: "User created successfully.", token });
        } catch (tokenErr) {
            await User.findByIdAndDelete(newUser._id);
            return res
                .status(500)
                .json({ message: "Token creation failed. Please try again." });
        }
    } catch (error) {
        res.status(500).json({ message: "Registration failed." });
        console.error(error);
    } finally {
        console.log("registerUser controller finished.");
    }
};



export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(401).json({ message: "please enter all fields...." });

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: "user not found..." })
        }

        const comparedPassword = await bcrypt.compare(password, user.password)

        if (!comparedPassword) return res.status(401).json({ message: "password is wrong...." });

        const token = JsonWebToken.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })

        return res.status(201).json({ message: "user loged sussessfully...", token })

    } catch (error) {
        res.status(401).json({ message: "loginPage cpunter have errors" })
        console.error(error);

    } finally {
        console.log("loginUser controller finished.");
    }
}