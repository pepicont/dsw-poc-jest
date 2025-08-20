export class TodoList {
  private todos: { task: string; done: boolean }[];

  constructor() {
    this.todos = [];
  }

  add(task: string) {
    if (!task || typeof task !== 'string') {
      throw new Error('Task must be a non-empty string');
    }
    const newTodo = { task, done: false };
    this.todos.push(newTodo);
    return newTodo;
  }

  complete(index: number) {
    if (index < 0 || index >= this.todos.length) {
      throw new Error('Invalid index');
    }
    this.todos[index].done = true;
    return this.todos[index];
  }

  remove(index: number) {
    if (index < 0 || index >= this.todos.length) {
      throw new Error('Invalid index');
    }
    return this.todos.splice(index, 1)[0];
  }

  getAll() {
    return this.todos;
  }
}