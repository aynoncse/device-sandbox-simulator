import ToggleSwitch from "../../ui/ToggleSwitch";
import InputRange from "../../ui/InputRange";
import ControlCard from "../../ControlCard";
import FanMotor from "./FanMotor";
import { useDevice } from "../../../hooks/useDevice";
import { useMemo } from "react";
import { toast } from "react-toastify";
const defaultSettings = { isOn: false, speed: 70 };

const Fan = ({ settings = defaultSettings }) => {
  const { updateCurrentDeviceSettings } = useDevice();
  const isOn = settings.isOn;
  const speed = settings.speed;

  const toggleFanPower = () => updateCurrentDeviceSettings({ isOn: !isOn });

  const handleSpeedChange = (newValue) => {
    if (!isOn) {
      toast.error("Turn the fan on to adjust the speed.", {
        toastId: "fanSpeedError",
      });
      return;
    }
    if (newValue === speed) return;
    updateCurrentDeviceSettings({ speed: newValue });
  };

  const duration = useMemo(() => {
    const minDuration = 200;
    const maxDuration = 2000;
    return isOn ? maxDuration - ((maxDuration - minDuration) * speed) / 100 : 0;
  }, [isOn, speed]);

  return (
    <div className="flex flex-col gap-28 items-center justify-center">
      <div>
        <div className=" w-(--f-container) h-(--f-container) relative fan" >
          {/* Fan Motor */}
          <FanMotor />
          {/* Fan Wings */}
          <div className="w-full h-full relative animate-[spin_linear_infinite]" style={{ animationDuration: `${duration}ms` }}>
            {/* Right wing */}
            <div className="w-(--f-wing-l) h-(--f-wing-h) shadow-inner shadow-[rgba(255,255,255,10%)] absolute top-1/2 right-2 transform  -translate-y-1/2 rounded-tr-4xl rounded-br-4xl bg-[linear-gradient(to_right,#4A5568_0%,#2D3748_30%,#1A202C_70%,#0F1419_100%)]" />
            {/* Top wing */}
            <div className="w-(--f-wing-h) h-(--f-wing-l) shadow-inner shadow-[rgba(255,255,255,10%)] absolute top-2 left-1/2 transform -translate-x-1/2 rounded-t-4xl bg-[linear-gradient(to_top,#4A5568_0%,#2D3748_30%,#1A202C_70%,#0F1419_100%)]" />
            {/* Left wing */}
            <div className=" w-(--f-wing-l) h-(--f-wing-h) shadow-inner shadow-[rgba(255,255,255,10%)] absolute top-1/2 left-2 transform  -translate-y-1/2 rounded-tl-4xl rounded-bl-4xl bg-[linear-gradient(to_left,#4A5568_0%,#2D3748_30%,#1A202C_70%,#0F1419_100%)]" />
            {/* Bottom wing */}
            <div className=" w-(--f-wing-h) h-(--f-wing-l) shadow-inner shadow-[rgba(255,255,255,10%)] absolute bottom-2 left-1/2 transform -translate-x-1/2 rounded-b-4xl bg-[linear-gradient(to_bottom,#4A5568_0%,#2D3748_30%,#1A202C_70%,#0F1419_100%)]"></div>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-md ">
        <ControlCard>
          <div className="flex flex-1 items-center justify-between">
            <p className="text-white text-sm font-semibold">Power</p>
            <ToggleSwitch isOn={isOn} onToggle={toggleFanPower} />
          </div>

          <InputRange
            label="Speed"
            value={speed}
            onRangeChange={handleSpeedChange}
          />
        </ControlCard>
      </div>
    </div>
  );
};

export default Fan;
