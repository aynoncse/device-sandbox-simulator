import { useDrop } from "react-dnd";
import { ItemTypes } from "../dndTypes";

const DropArea = () => {
    const [{ isOver, canDrop }, dropRef] = useDrop(
        () => ({
            accept: ItemTypes.BOX,
            drop: () => {
                alert("Box dropped here! 🎉");
                return { name: "DropArea" }; // optional
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        []
    );

    const isActive = isOver && canDrop;

    return (
        <div
            ref={dropRef}
            className="w-64 h-64 rounded-2xl border-2 border-dashed flex items-center justify-center transition-colors"
            style={{
                borderColor: isActive
                    ? "#22c55e" // green
                    : canDrop
                        ? "#eab308" // yellow
                        : "#4b5563", // gray
                backgroundColor: isActive ? "rgba(34,197,94,0.08)" : "transparent",
            }}
        >
            {isActive
                ? "Release to drop"
                : canDrop
                    ? "Drag over me"
                    : "Drop area"}
        </div>
    );
};

export default DropArea;
