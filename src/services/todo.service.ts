import { Repository } from 'typeorm';
import { Todo } from '../database/entities/todo.entity';
import { AppDataSource } from '../database/config';

// Get repository for Todo entity
const getTodoRepository = (): Repository<Todo> => {
  return AppDataSource.getRepository(Todo);
};

/**
 * Get all todos
 */
export const getAllTodos = async (): Promise<Todo[]> => {
  const todoRepository = getTodoRepository();
  return todoRepository.find();
};

/**
 * Get todo by ID
 */
export const getTodoById = async (id: string): Promise<Todo> => {
  const todoRepository = getTodoRepository();
  const todo = await todoRepository.findOneBy({ id });
  
  if (!todo) {
    throw new Error('Todo not found');
  }
  
  return todo;
};

/**
 * Create new todo
 */
export const createTodo = async (title: string): Promise<Todo> => {
  if (!title) {
    throw new Error('Title is required');
  }
  
  const todoRepository = getTodoRepository();
  
  const newTodo = todoRepository.create({
    title,
    completed: false
  });
  
  return todoRepository.save(newTodo);
};

/**
 * Update todo
 */
export const updateTodo = async (id: string, data: {title?: string; completed?: boolean}): Promise<Todo> => {
  const todoRepository = getTodoRepository();
  const todo = await getTodoById(id);
  
  // Update properties
  if (data.title !== undefined) {
    todo.title = data.title;
  }
  
  if (data.completed !== undefined) {
    todo.completed = data.completed;
  }
  
  // Save changes
  return todoRepository.save(todo);
};

/**
 * Delete todo
 */
export const deleteTodo = async (id: string): Promise<Todo> => {
  const todoRepository = getTodoRepository();
  const todo = await getTodoById(id);
  
  // Remove from database
  await todoRepository.remove(todo);
  
  return todo;
}; 