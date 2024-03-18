// types.ts
export interface Todo {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in progress' | 'done';
    completed: boolean;
}

export enum TodoStatus {
    Pending = 'pending',
    InProgress = 'in progress',
    Done = 'done',
}
// In TodoItem.tsx