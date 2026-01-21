import { Handle, Position } from 'reactflow';
import { theme } from '../styles/theme';

export const BaseNode = ({ title, text, fields, handles, style, variables }) => {
    const leftHandles = handles?.filter((h) => h.position === Position.Left)
    const rightHandles = handles?.filter((h) => h.position === Position.Right)

    // Base node style
    const nodeStyle = {
        minWidth: 200,
        minHeight: 180,
        background: theme.node.background,
        border: `2px solid ${theme.node.border}`,
        borderRadius: '8px',
        boxShadow: theme.node.shadow,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        position: 'relative',
        ...style // Allow override
    };

    // Header style
    const headerStyle = {
        background: theme.node.headerBg,
        padding: '8px 12px',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px',
        borderBottom: `1px solid ${theme.node.border}`,
        fontWeight: '600',
        fontSize: '13px',
        color: theme.text.primary,
    };

    // Content style
    const contentStyle = {
        padding: '12px',
    };

    // Text style
    const textStyle = {
        color: theme.text.secondary,
        fontSize: '12px',
        marginBottom: '8px',
        display: 'block',
    };

    // Label style
    const labelStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginBottom: '8px',
        fontSize: '12px',
        color: theme.text.secondary,
    };

    // Input style
    const inputStyle = {
        width: '100%',
        padding: '6px 2px',
        border: `1px solid ${theme.input.border}`,
        borderRadius: '4px',
        fontSize: '13px',
        color: theme.input.text,
        outline: 'none',
        transition: 'border-color 0.2s',
    };

    // Variable label style
    const variableLabelStyle = {
        position: 'absolute',
        left: '-55px',
        fontSize: '10px',
        color: theme.text.secondary,
        background: 'white',
        padding: '2px 6px',
        borderRadius: '3px',
        border: `1px solid ${theme.node.border}`,
        whiteSpace: 'nowrap',
        transform: 'translateY(-50%)',
    };

    // Handle style helper
    const getHandleStyle = (handleType, customStyle = {}) => ({
        width: '12px',
        height: '12px',
        background: handleType === 'source' ? theme.handle.source : theme.handle.target,
        border: '2px solid white',
        ...customStyle
    });

    return (
        <div style={nodeStyle}>
            {leftHandles && leftHandles.map((h, idx) => {
                console.log("VARIABLE LABEL STYLE: ", variableLabelStyle);
                console.log("H: ", h.style);
                return (
                    <div key={`left-${idx}`} style={{ position: 'relative', top: h.style?.top || '50%' }}>
                        <Handle
                            type={h.type}
                            position={h.position}
                            id={h.id}
                            style={getHandleStyle(h.type, h.style)}
                        />
                        {/* Show label if it exists (for variable handles) */}
                        {h.label && (
                            <div style={{
                                ...variableLabelStyle,
                                top: h.style?.top || '50%',
                            }}>
                                {h.label}
                            </div>
                        )}
                    </div>
                )
            })}
            <div style={headerStyle}>
                <span>{title}</span>
            </div>
            <div style={contentStyle}>
                {text && <div>
                    <span style={textStyle}>{text}</span>
                </div>}
                <div>
                    {fields && fields.map((f) => {
                        return (
                            <>
                                <label style={labelStyle}>
                                    {f.label}:
                                    {f.type === 'select' ?
                                        <select value={f.currValue} onChange={f.handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                                            {f.options.map((o) => <option value={o.value}>{o.label}</option>)}
                                        </select>
                                        :
                                        (
                                            <textarea
                                                value={f.currValue}
                                                onChange={f.handleChange}
                                                style={{
                                                    ...inputStyle,
                                                    resize: 'none',
                                                    minHeight: '60px',
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = theme.input.borderFocus}
                                                onBlur={(e) => e.target.style.borderColor = theme.input.border}
                                                placeholder="Enter text with {{variables}}"
                                            />
                                        )}


                                </label>
                            </>
                        )
                    })}

                </div>

                {variables && variables.length > 0 && (
                    <div style={{ 
                        fontSize: '11px', 
                        color: theme.text.secondary,
                        marginTop: '8px',
                        paddingTop: '8px',
                        borderTop: `1px solid ${theme.node.border}`,
                    }}>
                        Variables: {variables.join(', ')}
                    </div>
                )}
            </div>
            {rightHandles && rightHandles.map((h) => {
                return (
                    <>
                        <Handle type={h.type} position={h.position} id={h.id} style={getHandleStyle(h.type, h.style)} />
                    </>
                )
            })}
        </div>
    );
}