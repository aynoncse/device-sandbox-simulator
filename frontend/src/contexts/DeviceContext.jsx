import { createContext, useEffect, useReducer, useState } from "react";
import { getDevices } from "../services/api";

const DeviceContext = createContext(null);
const STORAGE_KEY = "device-sandbox.currentDevice";

/* Actions */
const SET_CURRENT_DEVICE = "SET_CURRENT_DEVICE";
const CLEAR_CURRENT_DEVICE = "CLEAR_CURRENT_DEVICE";
const UPDATE_SETTINGS = "UPDATE_SETTINGS";

function getCurrentDeviceFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function reducer(state, action) {
    switch (action.type) {
        case SET_CURRENT_DEVICE: {
            const device = action.payload ?? null;
            if (!device) return null;

            return {
                ...device,
                settings: device.settings || {},
            };
        }
        case CLEAR_CURRENT_DEVICE: {
            return null;
        }
        case UPDATE_SETTINGS: {
            if (!state) return state;
            return { ...state, settings: { ...state.settings, ...action.payload } };
        }
        default:
            return state;
    }
}

export function DeviceProvider({ children }) {
    const [currentDevice, dispatch] = useReducer(reducer, null, getCurrentDeviceFromStorage);

    const [devices, setDevices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await getDevices();
                const { data } = response.data;
                setDevices(data.devices);
            } catch (error) {
                console.error("Failed to fetch devices:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDevices();
    }, []);


    useEffect(() => {
        try {
            if (currentDevice == null) {
                localStorage.removeItem(STORAGE_KEY);
            } else {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(currentDevice));
            }
        } catch {
            // ignore
        }
    }, [currentDevice]);

    const setCurrentDevice = (device) => dispatch({ type: SET_CURRENT_DEVICE, payload: device });
    const clearCurrentDevice = () => dispatch({ type: CLEAR_CURRENT_DEVICE });
    const updateCurrentDeviceSettings = (settings) => dispatch({ type: UPDATE_SETTINGS, payload: settings });

    return (
        <DeviceContext.Provider value={{ currentDevice, setCurrentDevice, clearCurrentDevice, updateCurrentDeviceSettings, devices, isLoading }}>
            {children}
        </DeviceContext.Provider>
    );
}

export default DeviceContext;