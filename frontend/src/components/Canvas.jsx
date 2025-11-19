import { useMemo } from 'react';
import Fan from './features/Fan/Fan';
import Light from './features/Light/Light';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../dndTypes';
import { useDevice } from '../hooks/useDevice';

const Canvas = () => {
  const { currentDevice, setCurrentDevice } = useDevice();
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: ItemTypes.DEVICE,
    drop: (item) => {
      setCurrentDevice(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  }));

  const dynamicStyle = useMemo(() => {
    const base = 'h-full rounded-2xl border shadow-inner flex items-center justify-center p-4 sm:p-10 transition-colors';
    if (isOver && canDrop) {
      return `${base} border-emerald-500 bg-emerald-500/10 opacity-80`;
    }
    if (canDrop) {
      return `${base} border-yellow-500 bg-yellow-500/5`;
    }
    return `${base} border-[#1E2939] bg-[#0A101D]`;
  }, [isOver, canDrop]);

  return (
    <main className="px-4 sm:px-8 py-4 sm:py-6 h-full">
      <div ref={dropRef} className={dynamicStyle}>
        {(currentDevice?.type === 'fan') && <Fan settings={currentDevice.settings} />}
        {(currentDevice?.type === 'light') && <Light settings={currentDevice.settings} />}
        {isOver && canDrop && <span className='absolute text-sm text-[#E5E7EB] bg-slate-700 px-2 py-1 rounded'>Release to drop</span>}
        {!isOver && !currentDevice && <span className="text-sm text-[#4C505B]">Drag to add device</span>}
      </div>
    </main>
  );
};

export default Canvas;
