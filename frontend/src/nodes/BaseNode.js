import { Handle, Position } from 'reactflow';

export const BaseNode = ({ title, text, fields, handles, style }) => {
    const leftHandles = handles?.filter((h) => h.position === Position.Left)
    const rightHandles = handles?.filter((h) => h.position === Position.Right)

    return (
        <div style={style}>
            {leftHandles && leftHandles.map((h) => {
                return (
                    <>
                        <Handle type={h.type} position={h.position} id={h.id} style={h.style} />
                    </>
                )
            })}
            <div>
                <span>{title}</span>
            </div>
            {text && <div>
                <span>{text}</span>
            </div>}
            <div>
                {fields && fields.map((f) => {
                    return (
                        <>
                            <label>
                                {f.label}:
                                {f.type === 'select' ?
                                    <select value={f.currValue} onChange={f.handleChange}>
                                        {f.options.map((o) => <option value={o.value}>{o.label}</option>)}
                                    </select>
                                    :
                                    <input
                                        type={f.type}
                                        value={f.currValue}
                                        onChange={f.handleChange}
                                    />}


                            </label>
                        </>
                    )
                })}

            </div>
            {rightHandles && rightHandles.map((h) => {
                return (
                    <>
                        <Handle type={h.type} position={h.position} id={h.id} />
                    </>
                )
            })}
        </div>
    );
}