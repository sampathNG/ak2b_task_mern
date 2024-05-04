const Todo = require("../models/Todo");
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({ title, description });
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
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
