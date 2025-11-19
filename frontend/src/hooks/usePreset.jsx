import { useContext } from "react";
import PresetContext from "../contexts/PresetContext";

export function usePreset() {
    const ctx = useContext(PresetContext);
    if (!ctx) throw new Error("usePreset must be used within PresetProvider");
    return ctx;
}