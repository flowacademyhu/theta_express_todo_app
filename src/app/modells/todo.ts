export interface Todo {
  id: number;
  name: string;
  description: string;
  status: 'new' | 'in-progress' | 'done';
  userId: number;
}