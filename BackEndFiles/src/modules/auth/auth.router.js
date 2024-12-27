import { Router } from "express";
const router = Router({caseSensitive:true});
import * as AuthController from './auth.controller.js'
import { CheckEmail } from "../../MiddleWare/CheckEmail.js";
import { AsyncHandler } from "../../../utls/CatchError.js";
import { Validation } from "../../MiddleWare/Validation.js";
import * as schema from './Auth.Validation.js';





router.post('/signup',Validation(schema.RegisterSchema),CheckEmail,AuthController.SignUp);








export default router