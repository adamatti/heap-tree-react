
import {PriorityQueue} from './heap-map'

import HeapPlayground from './components/heap-playground';

const compare = (a:number, b: number):number => {
  if (a > b) return 1;
  if (b > a) return -1;
  return 0;
}

const queue = new PriorityQueue<number>(compare);

function App() {  
  return <>
    <HeapPlayground queue={queue} />    
  </>
}

export default App
