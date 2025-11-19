import { useDrag } from 'react-dnd';
import { ItemTypes } from '../dndTypes';
import SidebarButton from './ui/SidebarButton';
import { getIconByType } from '../helpers';
import { useSidebar } from '../hooks/useSidebar';
import { useEffect } from 'react';

const DraggableDeviceButton = ({ device, isActive, isPreset = false }) => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();

    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: ItemTypes.DEVICE,
            item: { ...device, isPreset: isPreset },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [device]
    );

    useEffect(() => {
        if (isDragging && isSidebarOpen) {
            toggleSidebar();
        }
    }, [isDragging, isSidebarOpen, toggleSidebar]);


    return (
        <div
            ref={dragRef}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <SidebarButton isDragging={isDragging} icon={getIconByType(device.type)} label={device.name} isPreset={isPreset} id={device.id} isActive={isActive} />
        </div>
    );
}

export default DraggableDeviceButton;
