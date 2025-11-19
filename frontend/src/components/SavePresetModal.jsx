import { X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Button from './ui/Button';
import { useDevice } from '../hooks/useDevice';

const SavePresetModal = ({ isOpen, onClose, onSave, defaultName = '' }) => {
    const [name, setName] = useState(defaultName);
    const [showContent, setShowContent] = useState(false);
    const inputRef = useRef(null);
    const { currentDevice } = useDevice();

    const TRANSITION_DURATION = 200;

    useEffect(() => {
        if (isOpen) {
            setName(defaultName);

            const openTimeout = setTimeout(() => {
                setShowContent(true);
            }, 50);

            const focusTimeout = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);

            return () => {
                clearTimeout(openTimeout);
                clearTimeout(focusTimeout);
            };
        } else {
            setShowContent(false);
        }

    }, [isOpen, defaultName]);


    if (!isOpen && !showContent) return null;

    const handleClose = () => {
        setShowContent(false);

        setTimeout(() => {
            onClose();
        }, TRANSITION_DURATION);
    };


    const handleSave = (e) => {
        e.preventDefault();
        if (!name?.trim()) {
            inputRef.current?.focus();
            toast.error('Please enter a name');
            return;
        }
        onSave(name);
        handleClose();
    };

    const overlayClass = `transition-opacity duration-${TRANSITION_DURATION} ${showContent ? 'opacity-100' : 'opacity-0'}`;
    const dialogClass = `transition-transform duration-${TRANSITION_DURATION} ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`;

    return (
        <div className={`fixed inset-0 z-40 flex items-center justify-center backdrop-blur-[11.7px] rgba(10, 16, 29, 0.9) ${overlayClass}`} role="dialog" aria-modal="true">
            <div className={`w-full max-w-[530px] rounded-[14px] bg-slate-900 border border-[#364153] shadow-xl ${dialogClass}`}
            >

                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                    <h5 className="text-lg font-bold text-[#E5E7EB]">Give me a name</h5>
                    <button className="text-white hover:text-slate-300" onClick={onClose}>
                        {<X className="w-5 h-5" />}
                    </button>
                </div>

                <form onSubmit={handleSave}>
                    <div className="p-6 space-y-3.5">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Name it"
                            className="
                        w-full 
                        rounded-lg
                        bg-[#364153]
                        p-3 
                        text-sm 
                        text-[#cbccce]
                        placeholder:text-[#99A1AF]
                        border
                        border-[#364153]
                        focus:outline-none
                        focus:border
                        focus:border-[#2b80ff63]
                        "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className="text-sm text-[#99A1AF]">
                            By adding this effect as a present you can reuse this anytime.
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 p-6">
                        <Button
                            type='button'
                            onClick={onClose}
                            variant="secondary">
                            Clear
                        </Button>


                        <Button type='submit' variant='primary'>
                            {
                                currentDevice?.isPreset ? 'Update' : 'Save'
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SavePresetModal;
