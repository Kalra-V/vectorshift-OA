// textNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      title={"Text"}
      fields={[
        { type: 'text', label: 'Text', currValue: currText, handleChange: handleTextChange },
      ]}
      style={{ width: 200, height: 80, border: '1px solid black' }}
      handles={[{ type: "source", position: Position.Right, id: `${id}-value` }]}
    />
  );
}