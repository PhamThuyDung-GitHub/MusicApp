"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
const validator_1 = require("../middleware/validator");
const validationSchema_1 = require("../utils/validationSchema");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/create", (0, validator_1.validate)(validationSchema_1.CreateUserSchema), user_1.create);
exports.default = router;
