const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
exports.getAllTodos = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded["userI"]);
    const todos = await Todo.find({ userId: decoded["userId"] });
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
exports.createTodo = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded["userId"];
    const { title, description } = req.body;
    const todo = new Todo({ title, description, userId });
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
exports.updateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    await Todo.findByIdAndUpdate(req.params.id, { title, description });
    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    // await Todo.deleteMany();
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
