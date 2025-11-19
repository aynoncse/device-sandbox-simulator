import { useDrag } from "react-dnd";
import { ItemTypes } from "../dndTypes";

const DraggableBox = () => {
    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: ItemTypes.BOX,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        []
    );

    return (
        <div
            ref={dragRef}
            className="w-24 h-24 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-semibold cursor-move"
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            Drag me
        </div>
    );
};

export default DraggableBox;
