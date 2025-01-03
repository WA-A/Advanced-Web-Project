import { Router } from "express";
import * as AuthController from './auth.controller.js'
import { CheckEmail } from "../../MiddleWare/CheckEmail.js";
import { AsyncHandler } from "../../../utls/CatchError.js";
import { Validation } from "../../MiddleWare/Validation.js";
import * as schema from './Auth.Validation.js'

const router = Router({caseSensitive:true});

router.post('/signup',Validation(schema.RegisterSchema),CheckEmail,AsyncHandler(AuthController.SignUp));
router.post('/signin',Validation(schema.LoginSchema),AuthController.SignIn);








export default router