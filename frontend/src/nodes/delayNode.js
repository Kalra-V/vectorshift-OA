import { BaseNode } from "./baseNode"
import { Position } from "reactflow";
import { useState } from "react";

export const DelayNode = ({ data, id }) => {
    const [currDelay, setDelay] = useState(data?.delay || "5");

    const handleDelayChange = (e) => {
        setDelay(e.target.value);
    };

    return (
        <BaseNode
            title={"Delay"}
            style={{ width: 200, height: 80, border: '1px solid black' }}
            fields={[
                { type: 'select', label: 'Delay', currValue: currDelay, handleChange: handleDelayChange, options: [{ label: "1s", value: "1" }, { label: "5s", value: "5" }, { label: "10s", value: "10" }] },
            ]}
            handles={[
                { type: "target", position: Position.Left, id: `${id}-delay-in` },
                { type: "source", position: Position.Right, id: `${id}-delay-out` },
            ]}
        />
    )
}