import { useState, useCallback } from 'react';
import SavePresetModal from '../components/SavePresetModal';
import { usePreset } from '../hooks/usePreset';
import { useDevice } from '../hooks/useDevice';
import Button from '../components/ui/Button';
import SidebarOpenButton from '../components/ui/SidebarOpenButton';

const Header = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { currentDevice, clearCurrentDevice } = useDevice();
  const { savePreset, removePreset } = usePreset();

  const openSaveModal = () => {
    if (!currentDevice) return;
    setShowSaveModal(true);
  };

  const handleSave = useCallback(async (name) => {
    if (!currentDevice) return;
    const { type, settings, isPreset, id } = currentDevice;
    const presetId = isPreset ? id : undefined;
    const payload = {
      name: name?.trim(),
      type,
      settings,
    };

    await savePreset(payload, presetId);
    setShowSaveModal(false);
  }, [currentDevice, savePreset, setShowSaveModal]);

  const onDeletePrestClick = (e) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure you want to delete this preset?');
    if (!confirmed) return;
    removePreset(currentDevice.id);
    clearCurrentDevice();
  };

  return (
    <>
      <header className="flex items-center justify-between px-3 py-3 sm:px-8 sm:py-4">
        <div className="flex items-center gap-1">
          <SidebarOpenButton />
          <h4 className="text-sm sm:text-base text-[#F3F4F6]">Testing Canvas</h4>
        </div>

        <div className="flex gap-1 sm:gap-3">
          {
            currentDevice && (
              <>
                <Button
                  type="button"
                  onClick={clearCurrentDevice}
                  variant="secondary">
                  Clear
                </Button>

                <Button type="button" onClick={openSaveModal} variant="primary">
                  {
                    currentDevice?.isPreset
                      ? 'Update Preset'
                      : 'Save as Preset'
                  }
                </Button>

                {
                  currentDevice?.isPreset &&
                  <Button
                    type="button"
                    variant="danger"
                    onClick={onDeletePrestClick}
                  >
                    Delete Preset
                  </Button>
                }
              </>
            )
          }
        </div>
      </header>

      <SavePresetModal
        isOpen={showSaveModal}
        defaultName={currentDevice?.isPreset ? `${currentDevice.name}` : ""}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default Header;
