export class PriorityQueue<T> {
  private heap: T[] = [];
  
  constructor(
    // expose how values could be comparable, e.g. priority/expiration, etc
    private readonly compare: (a: T, b: T)=> number
  ) {}

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  // It should be private, but exposing for visualization
  public getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  // It should be private, but exposing for visualization
  public getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  private swap(index1: number, index2: number): PriorityQueue<T> {
    console.log(`Swap positions index ${index1} (value ${this.heap[index1]}) and index ${index2} (value ${this.heap[index2]})`)
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;    
    return this;
  }

  private siftUp(index: number): PriorityQueue<T> {
    console.log(`Sift up index ${index} (value ${this.heap[index]})`)
    if (index === 0) return this;
    const parentIndex = this.getParentIndex(index);
    if (this.compare(this.heap[index], this.heap[parentIndex]) > 0) {
      this.swap(index, parentIndex);
      this.siftUp(parentIndex);
    }
    return this;
  }

  private siftDown(index: number): PriorityQueue<T> {
    console.log(`Sift down index ${index} (value ${this.heap[index]})`)
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);
    let maxIndex = index;
    
    if (
      leftChildIndex < this.heap.length &&
      this.compare(this.heap[leftChildIndex], this.heap[maxIndex]) > 0
    ) {
      maxIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.compare(this.heap[rightChildIndex], this.heap[maxIndex]) > 0
    ) {
      maxIndex = rightChildIndex;
    }
    
    if (index !== maxIndex) {
      this.swap(index, maxIndex);
      this.siftDown(maxIndex);
    }
    return this;
  }

  public insert(value: T): PriorityQueue<T> {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
    return this;
  }

  public extractMax(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const max = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0 && last !== undefined) {
      this.heap[0] = last;
      this.siftDown(0);
    }
    return max;
  }

  public get size(): number {
    return this.heap.length;
  }

  // It should be private, but exposing for visualization
  public get getHeap(): T[] {
    return this.heap;
  }

  // It should be private, but exposing for visualization
  public get getMax(): T | undefined {
    const heapLength =  this.heap?.length ?? 0;
    if (heapLength === 0) return undefined;
    return this.heap[0];
  }
}