const Button = ({
    onClick,
    children,
    variant = "primary",
    className = "",
    ...props
}) => {
    const buttonStyles = {
        primary: 'bg-[#2B7FFF] hover:bg-[#2b80ffc4]',
        secondary: 'bg-[#1E2939] hover:bg-[#1e2939c7]',
        danger: 'bg-[#DC2626] hover:bg-[#dc2626c4]',
    };

    return (
        <button
            onClick={onClick}
            className={`
                rounded-lg px-2 sm:px-4 py-1 sm:py-2 
                text-sm text-[#D1D5DC] 
                border border-[#364153] 
                transition 
                ${buttonStyles[variant]}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
