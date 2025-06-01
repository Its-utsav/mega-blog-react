const Button = ({ children, type = "button", className = "", ...props }) => {
    return (
        <button
            type={type}
            className={`inline-bock cursor-pointer rounded-full px-6 py-2 duration-200 hover:bg-blue-100 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
export default Button;
