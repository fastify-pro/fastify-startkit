interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

// DOM Elements
const todoInput = document.getElementById('todoInput') as HTMLInputElement;
const addTodoBtn = document.getElementById('addTodoBtn') as HTMLButtonElement;
const todoList = document.getElementById('todoList') as HTMLUListElement;

// API Base URL
const API_URL = '/api/todos';

// Event Listeners
document.addEventListener('DOMContentLoaded', fetchTodos);
addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e: KeyboardEvent) => {
  if (e.key === 'Enter') addTodo();
});

// Fetch all todos from API
async function fetchTodos(): Promise<void> {
  try {
    console.log(`🔍 App fetchTodos called`);
    const response = await fetch(API_URL);
    const todos: Todo[] = await response.json();
    
    // Clear list
    todoList.innerHTML = '';
    
    // Render todos
    todos.forEach(todo => {
      renderTodoItem(todo);
    });
  } catch (error) {
    console.error(`❌ App fetchTodos error:`, error);
  }
}

// Add new todo
async function addTodo(): Promise<void> {
  const title = todoInput.value.trim();
  
  if (!title) return;
  
  try {
    console.log(`➕ App addTodo title:`, title);
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });
    
    const newTodo: Todo = await response.json();
    
    // Clear input
    todoInput.value = '';
    
    // Add to list
    renderTodoItem(newTodo);
  } catch (error) {
    console.error(`❌ App addTodo error:`, error);
  }
}

// Toggle todo completion status
async function toggleTodo(id: string, completed: boolean): Promise<void> {
  try {
    console.log(`✅ App toggleTodo id:`, id);
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed })
    });
  } catch (error) {
    console.error(`❌ App toggleTodo error:`, error);
  }
}

// Delete todo
async function deleteTodo(id: string): Promise<void> {
  try {
    console.log(`🗑️ App deleteTodo id:`, id);
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error(`❌ App deleteTodo error:`, error);
  }
}

// Render a todo item in the list
function renderTodoItem(todo: Todo): void {
  const li = document.createElement('li');
  if (todo.completed) {
    li.classList.add('completed');
  }
  
  li.innerHTML = `
    <span>${todo.title}</span>
    <div class="todo-actions">
      <button class="complete-btn">${todo.completed ? '↩️' : '✅'}</button>
      <button class="delete-btn">🗑️</button>
    </div>
  `;
  
  // Add event listeners to buttons
  const completeBtn = li.querySelector('.complete-btn') as HTMLButtonElement;
  const deleteBtn = li.querySelector('.delete-btn') as HTMLButtonElement;
  
  completeBtn.addEventListener('click', () => {
    const newStatus = !todo.completed;
    toggleTodo(todo.id, newStatus);
    li.classList.toggle('completed');
    completeBtn.textContent = newStatus ? '↩️' : '✅';
  });
  
  deleteBtn.addEventListener('click', () => {
    deleteTodo(todo.id);
    li.remove();
  });
  
  todoList.appendChild(li);
} 