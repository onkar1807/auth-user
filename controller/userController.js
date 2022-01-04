const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('express');

//-------------------USER REGISTRATION-----------------------//

exports.userRegister = async (req, res) => {
    try {
        const { firstname, lastname, email, password, mobile, address  } = req.body;

        const new_email = await User.findOne({ email });
        if (new_email) return res.status(400).json({ msg: 'This email is already exist.' });

        if (password.length < 6)
            return res.status(400).json({ msg: 'Password must be atleast 6 characters.' });

        const hashPassword = await bcrypt.hash(password, 14)

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashPassword,
            mobile,
            address
        })

        const access_token = createAccessToken({ id: newUser._id });
    
        await newUser.save();

        res.status(200).json({
            msg: 'Register Success!',
            access_token,
            user: {
                ...newUser._doc,
                password: ''
            }
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

//-------------------USER LOGIN-----------------------//

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) return res.status(400).json({ msg: "This email does not exist!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Password is incorrect!" });

        const access_token = createAccessToken({ id: user._id });
        
        res.status(200).json({
            msg: 'Login Success!',
            access_token,
            user: {
                ...user._doc,
                password: ''
            }
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}


//-------------------GET USER DETAILS-----------------------//

exports.getUserDetails = async(req, res) => {
    try {

        const { id } = req.params;

        const user = await User.findOne({ _id: id })

        res.status(200).json({
            msg: 'Success!',
            user: {
                ...user._doc,
                password: ''
            }
        })
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: '30d' });
}

