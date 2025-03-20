export const todoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    completed: { type: 'boolean' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  }
};

export const todoArraySchema = {
  type: 'array',
  items: todoSchema
};

export const createTodoSchema = {
  body: {
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string', minLength: 1 }
    }
  },
  response: {
    201: {
      description: 'Successfully created Todo',
      type: 'object',
      properties: {
        ...todoSchema.properties
      }
    },
    400: {
      description: 'Bad Request',
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  }
};

export const getTodoByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' }
    }
  },
  response: {
    200: {
      description: 'Todo found',
      type: 'object',
      properties: {
        ...todoSchema.properties
      }
    },
    404: {
      description: 'Todo not found',
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  }
};

export const updateTodoSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' }
    }
  },
  body: {
    type: 'object',
    properties: {
      title: { type: 'string', minLength: 1 },
      completed: { type: 'boolean' }
    },
    anyOf: [
      { required: ['title'] },
      { required: ['completed'] }
    ]
  },
  response: {
    200: {
      description: 'Todo updated',
      type: 'object',
      properties: {
        ...todoSchema.properties
      }
    },
    404: {
      description: 'Todo not found',
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  }
};

export const deleteTodoSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' }
    }
  },
  response: {
    200: {
      description: 'Todo deleted',
      type: 'object',
      properties: {
        ...todoSchema.properties
      }
    },
    404: {
      description: 'Todo not found',
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  }
};

export const getAllTodosSchema = {
  response: {
    200: {
      description: 'List of all todos',
      ...todoArraySchema
    }
  }
}; 