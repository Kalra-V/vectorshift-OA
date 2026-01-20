import { BaseNode } from "./baseNode"
import { Position } from "reactflow";
import { useState } from "react";

export const FilterNode = ({ data, id }) => {
    const [currFilter, setCurrFilter] = useState(data?.filter || "Contains");

    const handleFilterChange = (e) => {
        setCurrFilter(e.target.value);
    };

    return (
        <BaseNode
            title={"Filter"}
            style={{ width: 200, height: 80, border: '1px solid black' }}
            fields={[
                { type: 'select', label: 'Filter', currValue: currFilter, handleChange: handleFilterChange, options: [{ label: "Contains", value: "Contains" }, { label: "Starts With", value: "Starts-With" }, { label: "Ends With", value: "Ends-With" }] },
            ]}
            handles={[
                { type: "target", position: Position.Left, id: `${id}-filter-in` },
                { type: "source", position: Position.Right, id: `${id}-filter-out` },
            ]}
        />
    )
}