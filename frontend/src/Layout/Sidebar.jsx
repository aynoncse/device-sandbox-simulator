import DraggableDeviceButton from '../components/DraggableDeviceButton';
import DragHint from '../components/ui/DragHint';
import SidebarCloseButton from '../components/ui/SidebarCloseButton';
import { useDevice } from '../hooks/useDevice';
import { usePreset } from '../hooks/usePreset';
import { useSidebar } from '../hooks/useSidebar';

/**
 * The Sidebar component renders a sidebar with a list of devices and a list of saved presets.
 * It also renders a button to close the sidebar.
 * The sidebar is hidden by default and is only shown when the user clicks on the toggle sidebar button.
 * The sidebar will also be shown when the user drags a device from the canvas to the sidebar.
 *
 * @returns {React.Component} - The rendered sidebar component.
 */
const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();
  const { currentDevice, devices, isLoading: isDeviceLoading } = useDevice();
  const { presets, isLoading: isPresetLoading } = usePreset();
  const mobileClass = isSidebarOpen ? 'translate-x-0' : '-translate-x-full';

  return (
    <aside className={`w-64 bg-[#101828] border-r border-[#1E2939] fixed inset-y-0 left-0 flex flex-col px-4 py-6 transition duration-300 ease-in-out z-50 md:relative md:translate-x-0 ${mobileClass}`}>
      <SidebarCloseButton />

      <div>
        <h4 className="text-base text-[#F3F4F6] mb-3">Devices</h4>
        <div className="space-y-2 relative">
          {isDeviceLoading ? (
            <p className="text-[#E5E7EB]">Loading devices...</p>
          ) : (
            devices.map((device) => (
              <DraggableDeviceButton
                key={`device-${device.id}`}
                device={device}
                isActive={currentDevice?.id === device.id && currentDevice?.isPreset === false}
              />
            ))
          )}

          {!isDeviceLoading && devices.length !== 0 && (
            <div className='hidden md:block absolute top-8 right-[-90%] pointer-events-none'>
              <DragHint />
            </div>
          )
          }
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-base text-[#F3F4F6] mb-3">Saved Presets</h4>

        <div className="space-y-2 overflow-y-auto pr-1">
          {isPresetLoading
            ? <p className="text-[#E5E7EB]">Loading presets...</p>
            : presets.length === 0 ? (
              <div className="rounded-lg border border-[#364153] px-3 py-2 text-sm text-[rgba(229,231,235,0.3)] mb-3">
                Nothing added yet
              </div>
            ) : (
              <div className="space-y-2 overflow-y-auto pr-1">
                {presets.map((preset) => (
                  <DraggableDeviceButton
                    key={`preset-${preset.id}`}
                    device={preset}
                    isActive={currentDevice?.id === preset.id && currentDevice?.isPreset === true}
                    isPreset={true}
                  />
                ))}
              </div>
            )}
        </div>
      </div>
    </aside >
  );
};

export default Sidebar;
