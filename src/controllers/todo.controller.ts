import { FastifyRequest, FastifyReply } from 'fastify';
import * as todoService from '../services/todo.service';

interface CreateTodoRequest {
  Body: {
    title: string;
  }
}

interface UpdateTodoRequest {
  Params: {
    id: string;
  }
  Body: {
    title?: string;
    completed?: boolean;
  }
}

interface GetDeleteTodoRequest {
  Params: {
    id: string;
  }
}

// Get all todos
export const getAllTodos = async (request: FastifyRequest, reply: FastifyReply) => {
  console.log(`🔍 TodoController getAllTodos called`);
  try {
    const todos = await todoService.getAllTodos();
    return todos;
  } catch (error) {
    console.error(`❌ TodoController getAllTodos error:`, error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

// Get todo by ID
export const getTodoById = async (request: FastifyRequest<GetDeleteTodoRequest>, reply: FastifyReply) => {
  const id = request.params.id;
  console.log(`🔍 TodoController getTodoById id:`, id);
  
  try {
    const todo = await todoService.getTodoById(id);
    return todo;
  } catch (error) {
    console.error(`❌ TodoController getTodoById error:`, error);
    return reply.code(404).send({ error: 'Todo not found' });
  }
};

// Create new todo
export const createTodo = async (request: FastifyRequest<CreateTodoRequest>, reply: FastifyReply) => {
  const { title } = request.body;
  console.log(`➕ TodoController createTodo title:`, title);
  
  try {
    const newTodo = await todoService.createTodo(title);
    return reply.code(201).send(newTodo);
  } catch (error) {
    console.error(`❌ TodoController createTodo error:`, error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return reply.code(400).send({ error: message });
  }
};

// Update todo
export const updateTodo = async (request: FastifyRequest<UpdateTodoRequest>, reply: FastifyReply) => {
  const id = request.params.id;
  const { title, completed } = request.body;
  console.log(`✏️ TodoController updateTodo id:`, id);
  
  try {
    const updatedTodo = await todoService.updateTodo(id, { title, completed });
    return updatedTodo;
  } catch (error) {
    console.error(`❌ TodoController updateTodo error:`, error);
    return reply.code(404).send({ error: 'Todo not found' });
  }
};

// Delete todo
export const deleteTodo = async (request: FastifyRequest<GetDeleteTodoRequest>, reply: FastifyReply) => {
  const id = request.params.id;
  console.log(`🗑️ TodoController deleteTodo id:`, id);
  
  try {
    const deletedTodo = await todoService.deleteTodo(id);
    return deletedTodo;
  } catch (error) {
    console.error(`❌ TodoController deleteTodo error:`, error);
    return reply.code(404).send({ error: 'Todo not found' });
  }
}; 