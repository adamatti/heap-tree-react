import Tree from 'react-d3-tree';
import { PriorityQueue } from '../heap-map';

interface ShowTreeProps {
  queue: PriorityQueue<number>
}

interface TreeNode {
  name: string
  attributes?: unknown
  children?: TreeNode[]
}

const convertToD3 = (queue: PriorityQueue<number>, index = 0): TreeNode | undefined=> {
  if (index >= queue.size) return undefined;
  const value = queue.getHeap[index];

  const left = queue.getLeftChildIndex(index);
  const right = queue.getRightChildIndex(index);

  const result: TreeNode = {
    name: `${value}`,
    children: [left, right].map(it => convertToD3(queue, it)).filter(it => !!it) as TreeNode[]
  }

  return result;
}

const ShowTree = ({queue}: ShowTreeProps) => {
  const treeData = convertToD3(queue);

  return <>
    {queue.size > 1 && <div id="treeWrapper" style={{ width: '100em', height: '40em' }}>
      <Tree data={treeData} orientation="vertical"/>
    </div>}
</>
}

export default ShowTree; 