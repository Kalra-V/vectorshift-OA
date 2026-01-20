import { BaseNode } from "./baseNode"
import { Position } from "reactflow";
import { useState } from "react";

export const TransformNode = ({ data, id }) => {
    const [currTransform, setTransform] = useState(data?.transform || "Uppercase");

    const handleTransformChange = (e) => {
        setTransform(e.target.value);
    };

    return (
        <BaseNode
            title={"Transform"}
            style={{ width: 200, height: 80, border: '1px solid black' }}
            fields={[
                { type: 'select', label: 'Transform', currValue: currTransform, handleChange: handleTransformChange, options: [{ label: "Uppercase", value: "Uppercase" }, { label: "Lowercase", value: "Lowercase" }, { label: "Trim", value: "Trim" }] },
            ]}
            handles={[
                { type: "target", position: Position.Left, id: `${id}-transform-in` },
                { type: "source", position: Position.Right, id: `${id}-transform-out` },
            ]}
        />
    )
}