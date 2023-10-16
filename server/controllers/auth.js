import UserModel from "../models/User.js"
import ErrorResponse from "../utils/errorResponse.js";
import Mailgen from 'mailgen'
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto'

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: `${process.env.MAIL_SENDER_NAME}`,
        link: `${process.env.MAIL_WEBSITE_LINK}`
    }
})


export async function register (req, res, next){
    const {username, email, password, phoneNumber} = req.body

    if(!username || !email || !password || !phoneNumber){
        return next(new ErrorResponse('please provide all requiredd fields', 400))
    }
    try {

        const existingEmail = await UserModel.findOne({ email });
        if(existingEmail){
            return next(new ErrorResponse('Email Alreay exists. Please use another email'))
        }

        const existingPhoneNumber = await UserModel.findOne({ phoneNumber })
        if(existingPhoneNumber){
            return next(new ErrorResponse('Phone Number already exist. Please use another'))
        }
        
        const user = await UserModel.create({
            username, email, password, phoneNumber
        })
        console.log('USER CREATED')

        sendToken(user, 201, res)
    } catch (error) {
        next(error)
    }
}

export async function login (req, res, next){
    const { emailOrphoneNumber, password } = req.body;

    if(!emailOrphoneNumber || !password){
        return next(new ErrorResponse('Please provide an email and password', 400))
    }

    try {
        const isEmail = emailOrphoneNumber.includes('@');

        let user;
        if(isEmail){
            user = await UserModel.findOne({ email: emailOrphoneNumber }).select('+password')
        } else {
            user = await UserModel.findOne({ phoneNumber: emailOrphoneNumber }).select('+password')
        }

        
        if (!user) {
            return next(new ErrorResponse('Invalid Credentials', 401));
        }

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return next(new ErrorResponse('Invalid Credentials', 401));
        }

        sendToken(user, 200, res)
    } catch (error) {
        res.status(500).json({ success: false, error: error.message})
    }
}

export async function forgotPassword (req, res, next){
    const { email} = req.body

    try {
        const user = await UserModel.findOne({ email });

        if(!user){
            return next(new ErrorResponse('Email could not be sent', 404))
        }

        const resetToken = user.getResetPasswordToken()

        await user.save()

        const resetUrl = `${process.env.RESET_URL}/passwordReset/${resetToken}`

        try {
            // send mail
            const emailContent = {
                body: {
                    intro: 'You have Requested a password reset.',
                    action: {
                        instructions: 'Please click the following button to reset your password',
                        button: {
                            color: '#33b5e5',
                            text: 'Reset Your Password',
                            link: resetUrl
                        },
                    },
                    outro: `
                        If you cannot click the reset button, copy and paste the usl here in your browser ${resetUrl}

                        If you did not request this reset, please ignore this email.
                    `
                },
            };

            const emailTemplate = mailGenerator.generate(emailContent)
            const emailText = mailGenerator.generatePlaintext(emailContent)
            
            await sendEmail({
                to: user.email,
                subject: 'Password Reset Request',
                text: emailTemplate
            })

            res.status(200).json({success: true, data: `Email sent. Please Check your Email inbox`})
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save()
            return next(new ErrorResponse('Email could not be sent', 500))
        }
    } catch (error) {
        next(error)
    }
}

export async function resetPassword (req, res, next){
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

    try {
        const user = await UserModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!user){
            return next(new ErrorResponse('Invalid Reset Token', 400))
        }

        user.password = req.body.password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined

        await user.save();

        res.status(201).json({
            success: true,
            data: 'Password Reset success'
        })
    } catch (error) {
        next(error)
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token})
}

export async function getUser (req, res){
    const { id } = req.params;

    try {
        const user = await UserModel.findById({ _id: id})
        if(!user){
            return res.status(404).send({ error: 'Cannot find user'});
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Could not get User'})   
    }
}

export async function getAllUser (req, res){
    const { id } = req.params

    try {
        const user = await UserModel.findById({ _id: id })
        
        if(!user){
            return res.status(404).send({ error: 'Cannot find users'});
        }
        
        if(!user.isAdmin){
            return res.status(403).json({ error: 'Permission denied.'})
        }

        const users = await UserModel.find();
        return res.status(200).json({ statusMsg: 'success', data: users})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Could not get Users'})   
    }
}