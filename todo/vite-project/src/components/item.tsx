// TodoItem.tsx
import React, { useState } from 'react';
import { TodoStatus } from './Homepage';
import { X } from 'lucide-react';
import { Trash } from 'lucide-react';
import { ArrowDownToLine ,Pencil} from 'lucide-react';
interface TodoItemProps {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  completed: boolean;
  onStatusChange: (id: number, newStatus: TodoStatus, title: string, description: string) => void;
  onDelete: (id: number) => void;
  // Remove the line below if onUpdate is not used
  onUpdate: (id: number, newStatus: TodoStatus, newTitle: string, newDescription: string) => Promise<void>;
}


const TodoItem: React.FC<TodoItemProps> = ({ id, title, description, status, onStatusChange, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedTitle(title);
    setUpdatedDescription(description);
  };

  const handleSaveClick = async () => {
    console.log('Before update:', id, status, updatedTitle, updatedDescription);
    await onUpdate(id, status, updatedTitle, updatedDescription);
    console.log('After update:', id, status, updatedTitle, updatedDescription);
    setIsEditing(false);
  };
    

  return (
    <div className={`todo ${status}`}>
      {isEditing ? (
        <div className='flex flex-col '>Title : 
          <input className='my-3 rounded-md'
            type="text"
            
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />Description : 
          <input className='my-3 rounded-md'
            type="text"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
        </div>
      ) : (
        <div>
          <h3><b>Title : </b>{title}</h3>
          <p><b>Description : </b>{description}</p>
        </div>
      )}
      
      <select
        value={status}
        onChange={(e) => onStatusChange(id, e.target.value as TodoStatus, title, description)}
      >
        <option value={TodoStatus.Pending}>Pending</option>
        <option value={TodoStatus.InProgress}>In Progress</option>
        <option value={TodoStatus.Done}>Done</option>
      </select>

      {isEditing ? (
        <div>
          <button onClick={handleSaveClick} className=''><ArrowDownToLine /></button>
          <button onClick={handleCancelClick}><X /></button>
        </div>
      ) : (
        <button onClick={handleUpdateClick} className='px-3'><Pencil  /></button>
      )}

      <button onClick={() => onDelete(id)}><Trash /></button>
    </div>
  );
};

export default TodoItem;