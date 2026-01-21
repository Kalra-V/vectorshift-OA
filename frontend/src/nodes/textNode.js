// textNode.js
import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [nodeSize, setNodeSize] = useState({ width: 200, height: 160 });
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Extract variables from text
  const extractVariables = (text) => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = [...text.matchAll(regex)];
    const uniqueVars = [...new Set(matches.map(m => m[1]))];
    return uniqueVars;
  };

  // Handle text change
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);

    // Extract and update variables
    const extractedVars = extractVariables(newText);
    setVariables(extractedVars);

    // Update store
    updateNodeField(id, 'text', newText);
    updateNodeField(id, 'variables', extractedVars);
  };

  // Auto-resize based on content
  useEffect(() => {
    // Calculate new dimensions based on text
    const lines = currText.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length), 10);

    // Width calculation: roughly 8px per character + padding
    const newWidth = Math.min(Math.max(maxLineLength * 8 + 60, 200), 400);

    // Height calculation: lines * line height + padding
    const lineCount = Math.max(lines.length, 3);
    const newHeight = Math.min(Math.max(lineCount * 25 + 80, 160), 350);

    setNodeSize({ width: newWidth, height: newHeight });

    // Update in store
    updateNodeField(id, 'width', newWidth);
    updateNodeField(id, 'height', newHeight);
  }, [currText, id, updateNodeField]);

  // Initialize variables on mount
  useEffect(() => {
    const initialVars = extractVariables(currText);
    setVariables(initialVars);
    updateNodeField(id, 'variables', initialVars);
  }, []);

  // Create dynamic handles for variables (left side) + output handle (right side)
  const dynamicHandles = [
    // Variable handles on the left
    ...variables.map((varName, index) => {
      const totalVars = variables.length;
      const topPosition = `${((index + 1) / (totalVars + 1)) * 100}%`;
      // console.log("TOP POSITION: ", topPosition);
      return {
        type: "target",
        position: Position.Left,
        id: `${id}-${varName}`,
        style: { top: topPosition },
        label: varName // We'll use this for display
      };
    }),
    // Output handle on the right
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`
    }
  ];

  return (
    <BaseNode
      title="Text"
      fields={[
        {
          type: 'textarea',
          label: 'Text',
          currValue: currText,
          handleChange: handleTextChange,
          ref: textareaRef
        },
      ]}
      style={{
        width: nodeSize.width,
        height: nodeSize.height,
      }}
      handles={dynamicHandles}
      variables={variables} // Pass variables for display
    />
  );
};