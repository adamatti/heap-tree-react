import { useState, useRef } from 'react';
import { PriorityQueue } from '../heap-map';
import ShowTree from './show-tree';

interface HeapPlaygroundProps {
  queue: PriorityQueue<number>
}

const HeapPlayground = ({queue}: HeapPlaygroundProps) => {
  const newValue = useRef<HTMLInputElement>();
  const oldMax = useRef<HTMLInputElement>();  
 
  const [heap, setHeap] = useState(queue.getHeap);
  const [max, setMax] = useState(queue.getMax);
  
  const updateValues = () =>{
    setHeap([...queue.getHeap]);
    setMax(queue.getMax);
  }

  const handleAdd = (): void => {
    if (!newValue.current){
      return;
    }
    console.log('Add value clicked, value was', newValue.current.value);

    try {
      const value = parseInt(newValue.current.value);      
      queue.insert(value);
      updateValues();
      newValue.current.value = '';      
    } catch (error) {
      console.error('Error adding the value', error)
    }
  }

  const handleMax = ():void => {    
    if (!oldMax.current) {
      return;
    }
    console.log('Get max clicked')
    const maxValue = queue.extractMax()
    console.log('Get max clicked, value was', maxValue)
    oldMax.current.value = `${maxValue}`;
    updateValues()
  }

  return (
    <>
      <table border={1}>
        <tbody>
        <tr>
          <td>Heap</td>          
          <td>{JSON.stringify(heap)}</td>
        </tr>
        <tr>
          <td>Max</td>          
          <td>{max}</td>
        </tr>
        <tr>
          <td>Add</td>
          <td>
            <input type="text" ref={newValue}></input>
            <button onClick={handleAdd}>Add</button>
          </td>
        </tr>
        <tr>
          <td>Get Max</td>
          <td>
            <input type="text" ref={oldMax} readOnly></input>
            <button onClick={handleMax}>Get</button>
          </td>
        </tr>
        </tbody>
      </table>
      <ShowTree queue={queue} />
    </>
  )
}

export default HeapPlayground;