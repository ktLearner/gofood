const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const jwtSecret = "djdjdjdjdjdjdlslslsllslslsslslslslslslslsllsssls"


router.post("/creatuser",
    [body('email').isEmail(),
    body('password').isLength({ min: 5 })],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {                                       //validate response
            return res.status(400).json({ errors: errors.array() })
        }

        const salt = await bcrypt.genSalt(10);                       //securing password
        let secpassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                password: secpassword,    //if data received and validated send sucess to frontend and data to the database
                email: req.body.email,      //taking data from frontend as per the form /schema and sending it the required response
                location: req.body.location
            })
            res.json({ success: true });

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post("/loginuser",
    [body('email').isEmail(), body('password').isLength({ min: 5 })],
    async (req, res) => {
        let email = req.body.email;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            let userData = await User.findOne({ email }); // checking user data in current database
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials" })

            }
            const pdcomp = await bcrypt.compare(req.body.password, userData.password) // check password
            if (!pdcomp) {
                return res.status(400).json({ errors: "Try logging with correct credentials" })

            }
            const data = { // corrent credentials generate authToken
                user: {
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken }); //send sucess and authtoken
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router;