import { BaseNode } from "./baseNode"
import { Position } from "reactflow";
import { useState } from "react";

export const ApiCallNode = ({ data, id }) => {
    const [currCondition, setCondition] = useState(data?.apiCall || "GET");
    const [currUrl, setCurrUrl] = useState(data?.url || "");

    const handleConditionChange = (e) => {
        setCondition(e.target.value);
    };

    const handleUrlChange = (e) => {
        setCurrUrl(e.target.value);
    };

    return (
        <BaseNode
            title={"API Call"}
            style={{ width: 200, height: 80, border: '1px solid black' }}
            fields={[
                { type: 'text', label: 'URL', currValue: currUrl, handleChange: handleUrlChange },
                { type: 'select', label: 'Type', currValue: currCondition, handleChange: handleConditionChange, options: [{ label: "GET", value: "GET" }, { label: "POST", value: "POST" }, { label: "PUT", value: "PUT" }, { label: "DELETE", value: "DELETE" }] },
            ]}
            handles={[
                { type: "target", position: Position.Left, id: `${id}-api-call` },
                { type: "source", position: Position.Right, id: `${id}-api-response` },
            ]}
        />
    )
}