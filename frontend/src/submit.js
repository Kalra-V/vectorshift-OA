// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { theme } from './styles/theme';

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            const pipelineData = {
                nodes: nodes.map(node => ({ id: node.id })),
                edges: edges.map(edge => ({
                    source: edge.source,
                    target: edge.target
                }))
            };

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            showAlert(data);

        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to backend. Make sure the backend is running on http://localhost:8000');
        } finally {
            setIsLoading(false);
        }
    };

    const showAlert = (data) => {
        const { num_nodes, num_edges, is_dag } = data;

        const dagEmoji = is_dag ? '✅' : '⚠️';

        const message = `
            ${dagEmoji} Pipeline Analysis

            Nodes: ${num_nodes}
            Edges: ${num_edges}
            DAG Status: ${is_dag}

            ${is_dag ? 'This pipeline is valid and can be executed.' : 'This pipeline contains a cycle and cannot be executed.'}
        `.trim();

        alert(message);
    };

    const buttonStyle = {
        padding: '12px 32px',
        background: theme.button.primary,
        color: theme.button.text,
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s',
        opacity: isLoading ? 0.7 : 1,
    };
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                style={buttonStyle}
                onMouseEnter={(e) => {
                    if (!isLoading) {
                        e.target.style.background = theme.button.primaryHover;
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isLoading) {
                        e.target.style.background = theme.button.primary;
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                    }
                }}
            >
                {isLoading ? 'Analyzing...' : 'Submit Pipeline'}
            </button>
        </div>
    );
}
