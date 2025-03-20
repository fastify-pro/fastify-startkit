import { DataSource } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { AppDataSource } from './config';

const initialTodos = [
  {
    title: 'Learn Fastify',
    completed: false
  },
  {
    title: 'Build a REST API',
    completed: false
  },
  {
    title: 'Connect to PostgreSQL',
    completed: true
  },
  {
    title: 'Add Swagger documentation',
    completed: false
  },
  {
    title: 'Implement authentication',
    completed: false
  }
];

/**
 * Seed the database with initial data
 */
export const seedDatabase = async (dataSource: DataSource = AppDataSource): Promise<void> => {
  try {
    console.log('🌱 Starting database seeding...');
    
    const todoRepository = dataSource.getRepository(Todo);
    
    // Check if todos already exist
    const existingTodosCount = await todoRepository.count();
    
    if (existingTodosCount > 0) {
      console.log(`ℹ️  Database already has ${existingTodosCount} todos, skipping seeding.`);
      return;
    }
    
    // Create initial todos
    const todoEntities = initialTodos.map(todoData => {
      return todoRepository.create(todoData);
    });
    
    // Save all todos to the database
    await todoRepository.save(todoEntities);
    
    console.log(`✅ Successfully seeded database with ${todoEntities.length} todos.`);
  } catch (error) {
    console.error(`❌ Error seeding database:`, error);
    throw error;
  }
};

/**
 * Initialize the database with seed data
 * This function can be called when the application starts
 */
export const initializeDatabaseWithSeedData = async (): Promise<void> => {
  try {
    // Make sure the database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    
    // Seed the database
    await seedDatabase();
  } catch (error) {
    console.error('❌ Failed to initialize database with seed data:', error);
    throw error;
  }
};
