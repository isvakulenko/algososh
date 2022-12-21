interface IStack<T> {
  push: (items: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (items: T): void => {
    this.container[this.container.length] = items;
  };

  pop = (): void => {
    if (this.container[this.container.length - 1]) {
      this.container.length = this.container.length - 1;
    }
  };

  peak = (): T | null => {
    // ...
    if (this.container[this.container.length - 1]) {
      return this.container[this.container.length - 1];
    } else {
      return null;
    }
  };
  clear = () => (this.container.length = 0);
}
