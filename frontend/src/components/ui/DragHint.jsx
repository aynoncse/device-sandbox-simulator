import { useEffect, useState } from "react";
import { useDevice } from "../../hooks/useDevice";

const DragHint = ({ text = "Drag items from here", autoHideMs = 4000 }) => {
    const { currentDevice } = useDevice();

    const [show, setShow] = useState(true);

    useEffect(() => {
        if (currentDevice) setShow(false);
    }, [currentDevice]);

    useEffect(() => {
        if (!autoHideMs) return;
        const t = setTimeout(() => setShow(false), autoHideMs);
        return () => clearTimeout(t);
    }, [autoHideMs]);

    if (!show) return null;

    return (
        <div
            className="
        relative isolate select-none pointer-events-none
        rounded-md bg-[#2B7FFF] text-white p-6 text-sm font-normal shadow-lg
        animate-[slideInRight_.5s_ease-out_both]
        [animation-delay:80ms]
      "
        >
            <span
                className="
          absolute -left-2 top-1/2 -translate-y-1/2
          border-y-8 border-y-transparent border-r-8 border-r-[#2B7FFF]
        "
            />
            {text}
        </div>
    );
};

export default DragHint;