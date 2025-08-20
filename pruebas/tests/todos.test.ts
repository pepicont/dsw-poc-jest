import { TodoList } from '../src/todos';

describe('TodoList', () => {
  let list: TodoList;

  beforeEach(() => {
    list = new TodoList();
  });

  it('should add a new task', () => {
    const todo = list.add('Learn testing');
    expect(todo).toEqual({ task: 'Learn testing', done: false });
    expect(list.getAll()).toHaveLength(1);
  });

  it('should mark a task as complete', () => {
    list.add('Task 1');
    const updated = list.complete(0);
    expect(updated.done).toBe(true);
  });

  it('should remove a task', () => {
    list.add('Task 1');
    const removed = list.remove(0);
    expect(removed.task).toBe('Task 1');
    expect(list.getAll()).toHaveLength(0);
  });

  it('should throw if task is empty', () => {
    expect(() => list.add('')).toThrow('Task must be a non-empty string');
  });

  it('should throw if index is invalid', () => {
    expect(() => list.complete(5)).toThrow('Invalid index');
  });
});