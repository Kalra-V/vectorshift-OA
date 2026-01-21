// toolbar.js

import { DraggableNode } from './draggableNode';
import { theme } from './styles/theme';

export const PipelineToolbar = () => {
    const toolbarStyle = {
        padding: '16px',
        background: 'white',
        borderBottom: `2px solid ${theme.node.border}`,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
    };

    return (
        <div style={toolbarStyle}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='apiCall' label='API Call' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='merge' label='Merge' />
            </div>
        </div>
    );
};
