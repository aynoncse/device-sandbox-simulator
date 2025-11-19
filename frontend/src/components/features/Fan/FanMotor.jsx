const FanMotor = () => {
    return (
        <div>
            <div className="absolute w-(--f-motor-size) h-(--f-motor-size) top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-10 border-4 border-[#364153] bg-[linear-gradient(to_top,#4A5565_0%,#1E2939_100%)] shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)]" />

            <div className="absolute w-(--f-motor-circle-size) h-(--f-motor-circle-size) rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-15 bg-[linear-gradient(to_left,#364153_0%,#101828_100%)] rotate-300" />
        </div>
    );
}

export default FanMotor;
