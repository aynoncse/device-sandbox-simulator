const ToggleSwitch = ({ isOn, onToggle, id = "toggle-switch" }) => {
    return (
        <label className="relative inline-block w-8 h-[18.4px]">
            <input type="checkbox" id={id} className="opacity-0 w-0 h-0 peer" checked={isOn} onChange={onToggle} />
            <span className="
            absolute
            cursor
            pointer
            top-0
            left-0
            right-0
            bottom-0
            bg-[#CBCED4]
            peer-checked:bg-[#2B7FFF]
            transition-[.4s]
            rounded-full
            before:absolute
            before:content-['']
            before:w-4
            before:h-4
            before:bg-white
            before:bottom-[1.3px]
            before:left-[1.5px]
            before:rounded-full
            before:transition-[.4s]
            peer-checked:before:translate-x-[13.2px]
        "/>
        </label>
    );
}

export default ToggleSwitch;
