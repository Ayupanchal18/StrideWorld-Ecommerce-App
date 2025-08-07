import express from "express";
import { logincontroller, registercontroller, testController } from "../controllers/authControllers.js";
import { isadmin, requireSignIn } from "../middlewares/authMiddleware.js";

// Router Object

const router = express.Router()

// Register Route

router.post("/register", registercontroller)

//  LOGIN ROUTE
router.post("/login", logincontroller)

// TEST ROUTE
router.get("/test", requireSignIn, isadmin, testController)

// Protected Route
router.get("/user-auth", requireSignIn, (res, req) => {
    res.status(200).send({ ok: true })
})

export default router  