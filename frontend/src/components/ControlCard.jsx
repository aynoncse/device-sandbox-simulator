
const ControlCard = ({ children }) => {
    return (
        <div className="bg-[#1e2939] w-full flex flex-col p-6 gap-5 rounded-xl border border-[#364153] " >
            {children}
        </div>
    );
}

export default ControlCard;
