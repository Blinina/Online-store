const User = require('./User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require("../config")

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class authController {
    async registration(req, res) {
        try {
            const { fullName, email, password, role } = req.body;
            const candidate = await User.findOne({ email, role })
            if (candidate) {
                return res.status(400).json({ message: "Пользователь с таким email и role уже существует" })
            }
            const hashPassword = bcrypt.hashSync(password, 6);
            const user = new User({ password: hashPassword, fullName, email, role })
            await user.save()
            res.status(200).json({ ...user._doc })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
            const { email, password, role } = req.body
            const user = await User.findOne({ email, role })
            if (!user) {
                return res.status(400).json({ message: `User with email address ${email} and role ${role} does not exist` })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: `The entered password is incorrect` })
            }
            const token = generateAccessToken(user._id, user.role)
            res.status(200).json({ token, ...user._doc });
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Login error' })
        }
    }

    async updateUser(req, res) {
        try {
            const { email, fullName, userId } = req.body;
            await User.findByIdAndUpdate(
                { _id: userId },
                { fullName: fullName, email: email }
            )
            const user = await User.findOne({ _id: userId })
            res.status(200).json({ message: 'User changed successfully', ...user._doc })
        } catch (e) {
            res.status(400).json({ error: 'UpdateUser error' })
        }
    }
}

module.exports = new authController()