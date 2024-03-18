import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TodoItem from './item';

interface Todo {
    id: number;
    title: string;
    description: string;
    status: TodoStatus;
    completed: boolean;
}

interface Token {
    user: {
        user_metadata: {
            full_name: string;
        };
    };
}

export enum TodoStatus {
    Pending = 'pending',
    InProgress = 'in progress',
    Done = 'done',
}

const Homepage = ({ token }: { token: Token }) => {
    const navigate = useNavigate();
    const apiUrl = 'http://localhost:3000/todos';
    const [newTodo, setNewTodo] = useState({
        title: '',
        description: '',
        status: TodoStatus.Pending,
    });



    const [todos, setTodos] = useState<Todo[]>([]);

    async function fetchTodos() {
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch TODOs: ${response.status} ${response.statusText}`);
            }

            const updatedTodos: Todo[] = await response.json();
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Error fetching TODOs:', error);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleTodoStatusChange = async (id: number, newStatus: TodoStatus, title: string, description: string) => {
        console.log(title)
        console.log(description)
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus,
                    title: title, // Replace with the actual variable holding the new title
                    description: description,
                    completed: false // Replace with the actual variable holding the new description
                }),
            });

            if (response.ok) {
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id
                        ? { ...todo, status: newStatus, title, description }
                        : todo
                )
            );
        }


            console.log('Todos after status update:', todos); // Check if todos contain title and description
        } catch (error) {
            console.error('Error updating TODO status:', error);
        }
    };


    async function addTodo(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const { title, description } = newTodo;
        const status = TodoStatus.Pending;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    status,
                    completed: false, // Check if your server expects this field
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Failed to add TODO: ${response.status} ${response.statusText}\n${errorText}`);
                throw new Error(`Failed to add TODO: ${response.status} ${response.statusText}\n${errorText}`);
            }

            setNewTodo({
                title: '',
                description: '',
                status: TodoStatus.Pending,
            });
    

            fetchTodos(); // Fetch updated todos after adding a new one
        } catch (error) {
            console.error('Error adding TODO:', error);

            if (error instanceof Error && error.message.includes('Failed to add TODO')) {
                console.error('Error response text:', error.message.split('\n')[1]);
            }
        }
    }




    const handleTodoDelete = async (id: number) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete TODO: ${response.status} ${response.statusText}\n${errorText}`);
            }

        
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error('Error deleting TODO:', error);
        }
    };

    function handleLogout() {
        sessionStorage.removeItem('token');
        navigate('/');
    }


    const handleTodoUpdate = async (id: number, newStatus: TodoStatus, newTitle: string, newDescription: string) => {
        try {
            console.log('Updating todo:', id, newTitle, newDescription);

            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newTitle,
                    description: newDescription,
                    status: newStatus,
                    // Include other properties you want to update
                }),
            });
            console.log('New Status:', newStatus);
            console.log('Update response:', response);

            if (response.ok) {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo.id === id
                            ? { ...todo, status: newStatus, title: newTitle, description: newDescription }
                            : todo
                    )
                );
            }
    

            // ... rest of the code
        } catch (error) {
            console.error('Error updating TODO:', error);
        }
    };

    const renderTodoList = (status: TodoStatus) => {
        return (
            <div>
                
                {todos
                    .filter((todo) => todo.status === status)
                    .map((todo) => (
                        <TodoItem
                        key={todo.id}
                        id={todo.id}
                        title={todo.title} 
                        description={todo.description}
                        status={todo.status}
                        completed={todo.completed}
                        onStatusChange={handleTodoStatusChange}
                        onDelete={handleTodoDelete}
                        onUpdate={handleTodoUpdate}
                      />
                      

                    ))}

            </div>
        );
    };


    return (
        <div className='p-5'>
            <div>
                <div className=''>
                    <h3 className='font-bold text-5xl'>Welcome back, {token.user.user_metadata.full_name}</h3>

                </div>
                <div className='flex justify-center p-20'>
                    <form className=' border p-5 bg-green-300 rounded-xl  ' id='todoForm' onSubmit={(event) => addTodo(event)}>

                        <h1 className='text-2xl font-bold p-10'>Create Todos for the Day</h1>
                        <div className='flex flex-col justify-center px-10 py-3'>
                            <label className='text-xl font-semibold'>Title:</label>
                            <input
                                className='border rounded-lg ml-1 m-1 '
                                type='text'
                                id='title'
                                name='title'
                                required
                                value={newTodo.title}
                                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                            />
                            <br />
                            <label className='text-xl font-semibold'>Description:</label>
                            <input
                                className='border rounded-lg ml-1 m-1'
                                type='text'
                                id='description'
                                name='description'
                                required
                                value={newTodo.description}
                                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                            />
                            <br />
                            <button type='submit' className='rounded-lg p-1 px-3 m-4 mt-2 ml-10 bg-green-600'>Add TODO</button>
                        </div>
                    </form>
                </div>
                <div className='flex gap-20' id='pendingContainer'>
                    <div className='border bg-green-300 rounded-lg p-10 w-1/3 hover:shadow-xl hover:shadow-slate-600'>
                        <h2 className='text-center font-bold underline'>Pending</h2>
                        <br />
                        <div id='pendingList'>{renderTodoList(TodoStatus.Pending)}</div>

                    </div>


                    <div className='border bg-green-300 rounded-lg p-10 w-1/3 hover:shadow-xl hover:shadow-slate-600' id='inProgressContainer'>
                        <h2 className='text-center font-bold underline'>In Progress</h2>

                        <div id='In Progress'>
                            {renderTodoList(TodoStatus.InProgress)}
                        </div>

                    </div>

                    <div className='border bg-green-300 rounded-lg p-10 w-1/3 hover:shadow-xl hover:shadow-slate-600' id='doneContainer'>
                        <h2 className='text-center font-bold underline'>Done</h2>
                        <div id='doneList'>
                            {renderTodoList(TodoStatus.Done)}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-end'>
                <button onClick={handleLogout} className=' border rounded-xl bg-cyan-400 p-2 w-20 mt-28'>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Homepage;