const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const verifyToken = require("../controllers/verifyToken");
router.get("/todos", verifyToken, todoController.getAllTodos);
router.post("/todo", verifyToken, todoController.createTodo);
router.put("/todo/:id", verifyToken, todoController.updateTodo);
router.delete("/todo/:id", verifyToken, todoController.deleteTodo);
module.exports = router;
