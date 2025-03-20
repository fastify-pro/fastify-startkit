import { FastifyInstance } from 'fastify';
import * as todoController from '../../controllers/todo.controller';
import {
  getAllTodosSchema,
  getTodoByIdSchema,
  createTodoSchema,
  updateTodoSchema,
  deleteTodoSchema
} from '../../schemas/todo.schema';

export default async function(fastify: FastifyInstance, opts: object): Promise<void> {
  // Get all todos
  fastify.get('/', {
    schema: {
      tags: ['todos'],
      summary: 'Get all todos',
      description: 'Returns a list of all todos',
      ...getAllTodosSchema
    },
    handler: todoController.getAllTodos
  });

  // Get a specific todo
  fastify.get('/:id', {
    schema: {
      tags: ['todos'],
      summary: 'Get a specific todo',
      description: 'Returns a single todo by ID',
      ...getTodoByIdSchema
    },
    handler: todoController.getTodoById
  });

  // Create a new todo
  fastify.post('/', {
    schema: {
      tags: ['todos'],
      summary: 'Create a new todo',
      description: 'Creates a new todo item',
      ...createTodoSchema
    },
    handler: todoController.createTodo
  });

  // Update a todo
  fastify.put('/:id', {
    schema: {
      tags: ['todos'],
      summary: 'Update a todo',
      description: 'Updates an existing todo by ID',
      ...updateTodoSchema
    },
    handler: todoController.updateTodo
  });

  // Delete a todo
  fastify.delete('/:id', {
    schema: {
      tags: ['todos'],
      summary: 'Delete a todo',
      description: 'Deletes a todo by ID',
      ...deleteTodoSchema
    },
    handler: todoController.deleteTodo
  });
} 