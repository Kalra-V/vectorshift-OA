import { BaseNode } from "./baseNode"
import { Position } from "reactflow";

export const MergeNode = ({ data, id }) => {

    return (
        <BaseNode
            title={"Merge"}
            style={{ width: 200, height: 80, border: '1px solid black' }}
            text={"This is a merge node."}
            handles={[
                { type: "target", position: Position.Left, id: `${id}-merge-1`, style: { top: `${100 / 3}%` } },
                { type: "target", position: Position.Left, id: `${id}-merge-2`, style: { top: `${200 / 3}%` } },
                { type: "source", position: Position.Right, id: `${id}-merge-out` },
            ]}
        />
    )
}