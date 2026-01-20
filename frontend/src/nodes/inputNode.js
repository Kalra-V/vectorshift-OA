// inputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      title={"Input"}
      fields={[
        { type: 'text', label: 'Name', currValue: currName, handleChange: handleNameChange },
        { type: 'select', label: 'Type', currValue: inputType, handleChange: handleTypeChange, options: [{ label: "Text", value: "Text" }, { label: "File", value: "File" }] }
      ]}
      style={{ width: 200, height: 80, border: '1px solid black' }}
      handles={[{ type: "source", position: Position.Right, id: `${id}-value` }]} />
  );
}
