import { useContext } from "react";
import DeviceContext from "../contexts/DeviceContext";

export function useDevice() {
    const context = useContext(DeviceContext);
    if (!context) {
        throw new Error("useDevice must be used within a CurrentDeviceProvider");
    }
    return context;
}