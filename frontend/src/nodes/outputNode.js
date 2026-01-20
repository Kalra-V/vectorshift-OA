// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      title={"Output"}
      style={{ width: 200, height: 80, border: '1px solid black' }}
      fields={[
        { type: 'text', label: 'Name', currValue: currName, handleChange: handleNameChange },
        { type: 'select', label: 'Type', currValue: outputType, handleChange: handleTypeChange, options: [{ label: "Text", value: "Text" }, { label: "Image", value: "Image" }] }
      ]}
      handles={[
        { type: "target", position: Position.Left, id: `${id}-value` },
      ]}
    />
  );
}
