import { createContext, useCallback, useEffect, useState } from "react";
import { addNewPreset, extractMessages, getPresets, updatePreset, deletePreset } from "../services/api";
import { toast } from "react-toastify";

const PresetContext = createContext(null);

export function PresetProvider({ children }) {
    const [presets, setPresets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPresets = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getPresets();
            const { data } = response.data;
            setPresets(data.presets);
        } catch (error) {
            console.error("Failed to fetch presets from server:", error);
            setPresets([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPresets();
    }, [fetchPresets]);

    const savePreset = (payload, presetId = null) => {
        if (!payload) {
            return;
        }
        if (presetId) {
            update(presetId, payload);
        } else {
            create(payload);
        }
    };

    const create = async (payload) => {
        try {
            await addNewPreset({ ...payload });
            toast.success('Preset saved');
            await fetchPresets();
        } catch (error) {
            if (error.response.status === 422) {
                extractMessages(error).forEach((message) => toast.error(message));
            } else if (error.response.status >= 500) {
                toast.error('Server error. Please try again.');
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
    }

    const update = async (id, payload) => {
        try {
            await updatePreset(id, payload);
            toast.success('Preset updated');
            await fetchPresets();
        } catch (error) {
            if (error.response.status === 422) {
                extractMessages(error).forEach((message) => toast.error(message));
            } else if (error.response.status >= 500) {
                toast.error('Server error. Please try again.');
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
    };

    const removePreset = async (id) => {
        try {
            await deletePreset(id, { isPreset: false });
            toast.success('Preset deleted');
            await fetchPresets();
        } catch (error) {
            if (error.response.status >= 500) {
                toast.error('Server error. Please try again.');
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <PresetContext.Provider value={{ savePreset, presets, isLoading, setIsLoading, removePreset }} >
            {children}
        </PresetContext.Provider>
    );
}

export default PresetContext;