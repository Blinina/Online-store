const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require("../config")

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const {fullName, email, password, role} = req.body;
            const candidate = await User.findOne({email, role})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким email и role уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 6);
            const user = new User({ password: hashPassword, fullName, email, role })
            console.log(user)
            await user.save()
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {email, password, role} = req.body
            const user = await User.findOne({email, role})
            console.log(user)
            if (!user) {
                return res.status(400).json({message: `Пользователь ${email} и ролью ${role} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.role)
            res.status(200).json({token, ...user._doc});
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new authController()