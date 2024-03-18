import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const StatusEnum = {
  PENDING: 'pending',
  IN_PROGRESS: 'in progress',
  DONE: 'done'
};

let todos = [
  { id: 1, title: 'Sample Todo 1', description: 'Description 1', status: StatusEnum.PENDING },
  { id: 2, title: 'Sample Todo 2', description: 'Description 2', status: StatusEnum.DONE },
];

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST a new todo
app.post('/todos', (req, res) => {
  const { title, description, status } = req.body;

  if (Object.values(StatusEnum).includes(status)) {
    const newTodo = { id: todos.length + 1, title, description, status };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else {
    res.status(400).json({ message: 'Invalid status value' });
  }
});

// UPDATE a todo by ID
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const index = todos.findIndex(todo => todo.id === parseInt(id));

  if (index !== -1) {
    if (Object.values(StatusEnum).includes(status)) {
      todos[index] = { id: parseInt(id), title, description, status };
      res.json(todos[index]);
    } else {
      res.status(400).json({ message: 'Invalid status value' });
    }
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// DELETE a todo by ID
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.json({ message: 'Todo deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});