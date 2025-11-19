import React from 'react';

const LightHead = () => {
    return (
        <div className="flex flex-col items-center w-20 overflow-hidden absolute top-1 left-1/2 transform -translate-x-1/2">
            <span className="
            h-3
            w-16
            rounded-tl-md
            rounded-tr-md
            bg-[linear-gradient(to_bottom,#4A5565_0%,#364153_100%)]
            "/>
            <span className="h-1 w-full flex border-b border-[#4A5565] bg-[#364153]" />
            <span className="h-1 w-full flex border-b border-[#4A5565] bg-[#364153]" />
            <span className="h-1 w-full flex border-b border-[#4A5565] bg-[#364153]" />
            <span className="h-1 w-full flex border-b border-[#4A5565] bg-[#364153]" />
        </div>
    );
}

export default LightHead;
