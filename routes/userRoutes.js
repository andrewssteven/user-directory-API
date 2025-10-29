import { Router } from "express";
import { userValidator } from "../middleware/userValidate.js";
import { getUser, updateUser, getUserId, addUser, deleteUser } from "../controllers/userController.js";

const userRouter = Router();

// get all users enpoint
userRouter.get("/", getUser);
// get user by specified Id
userRouter.get("/:id", getUserId);
// post or add new user
userRouter.post("/", userValidator, addUser);
// update user information
userRouter.put("/:id", updateUser)
// delete a user
userRouter.delete("/:id", deleteUser)

export default userRouter;
