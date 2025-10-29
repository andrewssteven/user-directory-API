import { users } from "../user.js";
import { validationResult } from "express-validator";


// retrieve user logic
export const getUser = (req, res, next) => {
  res.status(200).json(users);
};

// get user by id
export const getUserId = (req, res, next) => {
  let id = parseInt(req.params.id);
  let user = users.find((user) => user.id === id);
  if (!user) {
    const error = new Error(`user with id ${id} not found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(user);
};

// adding new user
export const addUser = (req, res, next) => {
  let newUser = {
    id: users.length + 1,
    name: req.body.name,
    role: req.body.role,
  };
    let validateError = validationResult(req)
    if(!validateError.isEmpty()) return res.status(400).json({error: validateError.array()})
  users.push(newUser);
  res.status(201).json({ status: "user created", users });
};

// update existing user
export const updateUser = (req, res, next) => {
  let id = parseInt(req.params.id);
  let user = users.find((user) => user.id === id);

  if (!user) {
    const error = new Error(`user with id ${id} not found`);
    error.status = 404;
    return next(error);
  }
  user.name = req.body.name;
  user.role = req.body.role;
  res.status(200).json(users);
};

// delete user
export const deleteUser = (req, res, next) => {
  let id = parseInt(req.params.id);
  let user = users.find((user) => user.id === id);
  if (!user) {
    const error = new Error(`user with id ${id} not found`);
    error.status = 404;
    return next(error);
  }

  let deleteUser = users.filter((user) => user.id != id);

  res.status(200).json(deleteUser);
};
