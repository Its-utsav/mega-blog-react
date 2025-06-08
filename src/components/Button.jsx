const Button = ({ children, type = "button", className = "", ...props }) => {
    return (
        <button
            type={type}
            className={`bg-button inline-bock cursor-pointer rounded-full px-6 py-2 duration-200 hover:bg-[#FF6700] ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
export default Button;
