const InputRange = ({ value, label, onRangeChange, disabled = false }) => {

    const handleRangeChange = (e) => {
        onRangeChange(Number(e.target.value));
    };

    const getSliderTrackStyle = () => {
        return {
            background: `linear-gradient(to right, #2B7FFF 0%, #2B7FFF ${value}%, #364153 ${value}%, #364153 100%)`,
        };
    };

    return (
        <>
            <div className="flex items-center justify-between mb-3">
                <label htmlFor="range-input" className="text-[#E5E7EB] text-sm font-semibold">{label}</label>
                <span className="text-[#99A1AF] text-base">{value}%</span>
            </div>

            <input
                type="range"
                id="range-input"
                min="0"
                max="100"
                value={value}
                onChange={handleRangeChange}
                disabled={disabled}
                className="w-full h-4 bg-[#364153] rounded-full appearance-none cursor-pointer range-lg 
                [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full 
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:-mt-1 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg
                bg-linear-to-r from-[#2B7FFF] to-[#2B7FFF] bg-no-repeat"
                style={getSliderTrackStyle()}
            />
        </>
    );
}

export default InputRange;
