import LightHead from "./LightHead";
import { hexToRgba, ucFirst } from "../../../helpers";
import ControlCard from "../../ControlCard";
import ToggleSwitch from "../../ui/ToggleSwitch";
import InputRange from "../../ui/InputRange";
import COLORS from "../../../data/colors";
import { useDevice } from "../../../hooks/useDevice";
import { useMemo } from "react";
import { toast } from "react-toastify";

const defaultSettings = { isOn: false, brightness: 70, colorId: COLORS[0].id };

const Light = ({ settings = defaultSettings }) => {
  const { updateCurrentDeviceSettings } = useDevice();

  const isOn = settings.isOn;
  const brightness = settings.brightness;
  const activeColor = COLORS.find((color) => color.id === settings.colorId);
  const toggleLight = () => updateCurrentDeviceSettings({ isOn: !isOn });

  const lightOffStyle = {
    background: "radial-gradient(circle at 30% 25%, #4A5568 0%, #2D3748 50%, #1A202C 100%)",
    boxShadow: "inset 0 0 20px 0 rgba(0, 0, 0, 0.5)"
  }

  const lightOnStyle = useMemo(() => {
    return {
      background: `radial-gradient(circle at 30% 25%, ${hexToRgba(activeColor.code, "100%")} 0%, ${hexToRgba(activeColor.code, "87%")} 50%, ${hexToRgba(activeColor.code, "60%")} 100%)`,
      boxShadow: `0 0 60px 0 ${hexToRgba(activeColor.code, "60%")}`
    };
  }, [activeColor]);



  const innerReflection = {
    background: `linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(0, 0, 0, 0) 85%
  )`,
    opacity: settings.isOn ? 0.2 : 0.5,
  }

  const handleColorChange = (color) => {
    if (!color || color.id === settings.colorId) return;
    updateCurrentDeviceSettings({ colorId: color.id });
  };

  const handleBrightnessChange = (value) => {
    if (!isOn) {
      toast.error("Turn the fan on to adjust the brightness.", {
        toastId: "lightBrightnessError",
      });
      return;
    }
    if (value === brightness) return;
    updateCurrentDeviceSettings({ brightness: value });
  };

  const brightnessNorm = brightness / 100;

  const outerGlowStyle = {
    backgroundColor: activeColor.code,
    filter: "blur(24px)",
    opacity: 0.62 * brightnessNorm,
  }


  const innerGlowStyle = {
    backgroundColor: activeColor.code,
    filter: "blur(25px)",
    opacity: 0.4 * brightnessNorm,
  };

  return (
    <div className="flex grow flex-col items-center gap-12">
      <div className={`relative w-(--light-container) h-(--light-container) flex items-center justify-center`}>
        {/* Light Top */}
        {/* The Oval Element */}
        <div className="w-48 h-60 flex justify-center items-center relative z-10">
          <LightHead />
          <div className="relative flex items-center justify-center">
            <div className={`w-32 h-40 rounded-full shadow-2xl relative`} style={isOn ? lightOnStyle : lightOffStyle} />
            {/* Center Line */}
            <span
              className={`w-1 h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl z-30 ${isOn ? "visible" : "hidden"}`}
              style={{ background: `linear-gradient(${hexToRgba(activeColor.code)} 0%, #ffffff 85%)` }}
            />
            {/* Bulb inner reflection */}
            <div className="w-12 h-16 top-8 left-8 blur-sm rounded-[80%/60%] absolute" style={innerReflection} />
          </div>
          {isOn && <div className="opacity-40 w-full h-full blur-[25px] absolute rounded-[50%/40%]" style={innerGlowStyle} />}
        </div>
        {isOn && <div className={`opacity-40 w-full h-full absolute rounded-[50%] inset-0`} style={outerGlowStyle} />}
      </div>

      {/* Light Controls */}
      <div className="w-full sm:w-md">
        <ControlCard >
          <div className="flex flex-1 items-center justify-between">
            <p className="text-white text-sm font-semibold">Power</p>
            <ToggleSwitch isOn={isOn} onToggle={toggleLight} />
          </div>

          {/* Color Temperature Controls */}
          <div className="flex flex-col gap-3" >
            <p className="text-white text-sm font-semibold">Color Temperature</p>
            <div className="flex gap-2">
              {
                COLORS.map((color) => (
                  <button
                    key={color.id}
                    className={`h-12 flex-1 rounded-lg border-2 ${activeColor.temperature === color.temperature ? "border-[#2B7FFF]" : "border-4A5565"}`}
                    style={{ backgroundColor: color.code }}
                    aria-label={color.temperature}
                    title={ucFirst(color.temperature)}
                    disabled={!isOn}
                    onClick={() => handleColorChange(color)}
                  ></button>
                ))
              }
            </div>
          </div >
          <InputRange value={brightness} label="Brightness" onRangeChange={handleBrightnessChange} />
        </ ControlCard>
      </div>
    </div >
  );
};

export default Light;
