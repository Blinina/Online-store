const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { validationResult } = require('express-validator')
const {secret} = require("../config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const {fullName, email, password} = req.body;
            console.log(email)
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким email уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 6);
            const userRole = await Role.findOne({value: "Customer"})
            const user = new User({fullName, email, password: hashPassword, roles: [userRole.value]})
            await user.save()
            res.status(200).json({message: "Пользователь успешно зарегистрирован"});

            // return res.json({message: "Пользователь успешно зарегистрирован"})

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            console.log(user)
            if (!user) {
                return res.status(400).json({message: `Пользователь ${email} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.roles)
            console.log({token})
            res.status(200).json({token});
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
            // const userRole = new Role()
            // const sallerRole = new Role({value: 'Seller'})

            // await userRole.save()
            // await sallerRole.save()
            // res.json('server user')
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()