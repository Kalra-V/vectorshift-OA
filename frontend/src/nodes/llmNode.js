// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {

  return (
    <BaseNode
      title={"LLM"}
      text={"This is a LLM."}
      style={{ width: 200, height: 80, border: '1px solid black' }}
      handles={[
        { type: "source", position: Position.Right, id: `${id}-response` },
        { type: "target", position: Position.Left, id: `${id}-system`, style: { top: `${100 / 3}%` } },
        { type: "target", position: Position.Left, id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
      ]}
    />
  );
}