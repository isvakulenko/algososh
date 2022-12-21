// в помощь https://frontend-stuff.com/blog/linked-lists-with-javascript/
class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteTail: () => T | null;
  deleteHead: () => T | null;
  insertByIndex: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
}
export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  constructor(initialList?: T[]) {
    this.head = null;
    this.tail = null;
    // сделаем список из первоначального массива для первичной загрузки
    initialList?.forEach((item) => {
      this.append(item);
    });
  }
  //Вставка элемента по индексу
  insertByIndex(element: T, index: number) {
    if (index < 0) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);
      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        // перебрать элементы в списке до нужной позиции
        let current = this.head;
        let currentIndex = 0;
        while (currentIndex < index) {
          currentIndex++;
          if (current?.next && currentIndex !== index) {
            current = current?.next;
          }
        }
        // добавить элемент
        if (current) {
          node.next = current.next;
          current.next = node;
        }
      }
    }
  }
  // Удаление элемента по индексу
  deleteByIndex(index: number) {
    if (index < 0) {
      return null;
    }
    if (!this.head) {
      return null;
    }
    if (index === 0) {
      return this.deleteHead();
    }
    let currentNode = this.head;
    let beforeNodeToDelete = null;

    let count = 0;

    while (count < index) {
      beforeNodeToDelete = currentNode;
      currentNode = currentNode.next!;
      count++;
    }

    beforeNodeToDelete!.next = currentNode.next!;

    return currentNode.value;
  }

  // узел добавляется в конец списка
  append(element: T) {
    // Создаём новый узел.
    const node = new Node(element);

    // Если нет head или tail, делаем новым узлом head и tail.
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      return this;
    }
    // Присоединяем новый узел к концу связного списка.
    // Берём последний узел и указываем, что его next будет новым узлом.
    this.tail.next = node;
    // Переназначаем tail на новый узел.
    this.tail = node;

    return this;
  }
// Удаляется последний элемент списка
  deleteTail() {
    // Если нет tail, значит список пуст.
    if (!this.tail) {
      return null;
    }
    // Сохраняем значение последнего узла.
    const deletedTail = this.tail;
    // Если head и tail равны, значит в списке только один узел.
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail.value;
    }
    // Если в связном списке много узлов.
    // Перебираем все узлы и находим предпоследний узел,
    // убираем ссылку «next» на последний узел.
    let currentNode = this.head;
    while (currentNode?.next) {
      // Если у следующего узла нет следующего узла,
      // значит текущий узел предпоследний.
      if (!currentNode.next.next) {
        // убираем ссылку «next» на последний узел.
        currentNode.next = null;
      } else {
        // Перематываем на один узел вперед.
        currentNode = currentNode.next;
      }
    }
    // В данном случае currentNode - это предпоследний узел или head,
    // который становится последним узлом.
    this.tail = currentNode;
    return deletedTail.value;
  }

  // узел добавляется в начало списка
  prepend(element: T) {
    // Создаём новый узел, который будет новым head,
    // при создании передаем второй аргумент, который указывает
    // что его "next" будет текущий head,
    // так как новый узел будет стоять перед текущем head.
    const node = new Node(element, this.head);
    // Переназначаем head на новый узел
    this.head = node;
    // Если ещё нет tail, делаем новый узел tail.
    if (!this.tail) {
      this.tail = node;
    }
    // Возвращаем весь список.
    //console.log("this", this);
    return this;
  }
  //Удаляется первый элемент списка
  deleteHead() {
    // Если нет head значит список пуст.
    if (!this.head) {
      return null;
    }
    const deletedHead = this.head;
    // Если у head есть ссылка на следующий "next" узел
    // то делаем его новым head.
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      // Если у head нет ссылки на следующий "next" узел
      // то мы удаляем последний узел.
      this.head = null;
      this.tail = null;
    }
    return deletedHead.value;
  }
}
