// TodoItem.tsx

import React from 'react';
import { Todo, TodoStatus } from './type'; // Adjust the import path based on your project structure

interface TodoItemProps {
  todo: Todo;
  onStatusChange: (newStatus: TodoStatus) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onStatusChange }) => {
  // Your TodoItem component logic here
  return (
    <div>
      {/* Render todo information */}
      <p>{todo.title}</p>
      <p>{todo.description}</p>

      {/* Example: Button to change status */}
      <button onClick={() => onStatusChange(TodoStatus.InProgress)}>
        Move to In Progress
      </button>
    </div>
  );
};

export default TodoItem;