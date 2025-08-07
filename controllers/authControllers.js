import express from "express";
import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from './../helpers/authHelpers.js';
import JWT from 'jsonwebtoken';

export const registercontroller = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body
        // VALIDATION
        if (!name) {
            return res.send({ message: "Name is required" });
        }
        if (!email) {
            return res.send({ message: "email is required" });
        }
        if (!password) {
            return res.send({ message: "password is required" });
        }
        if (!phoneNumber) {
            return res.send({ message: "phoneNumber is required" });
        }
        if (!address) {
            return res.send({ message: "address is required" });
        }
        // Check User
        const existingUser = await userModel.findOne({ email })
        // existingUser
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "already registered please Login!! "
            })
        }
        // RegisterUser
        const hashedPassword = await hashPassword(password)
        // Save
        const user = await new userModel({ name, email, phoneNumber, address, password: hashedPassword, }).save();
        res.status(201).send({
            success: true,
            message: 'User has been registered Successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
}

//  Login User

export const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body
        // Validadtion
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "email or password invalid."
            })
        }
        // check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email not found"
            })
        }
        // Check password 
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "invalid password"
            })
        }

        // Token  
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d", })
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber
            },
            token
        },)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error In login",
            Error
        })
    }
}


// TEST Controller

export const testController = (req, res,) => {
    res.send("Route Protected");
}