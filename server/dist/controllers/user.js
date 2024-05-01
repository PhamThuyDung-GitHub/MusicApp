"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_1 = __importDefault(require("../models/user"));
const variables_1 = require("../utils/variables");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    try {
        const user = yield user_1.default.create({ name, email, password });
        const transport = nodemailer_1.default.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: variables_1.MAILTRAP_USER,
                pass: variables_1.MAILTRAP_PASS,
            },
        });
        const mailOptions = {
            to: email,
            from: "auth@myapp.com",
            subject: "Verify Your Email",
            html: "<h1>Welcome to MyApp! Please verify your email.</h1>",
        };
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: "Failed to send verification email." });
            }
            console.log('Verification email sent:', info.response);
            res.status(201).json({ user, message: "Verification email sent successfully!" });
        });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: "Failed to create user." });
    }
});
exports.create = create;
