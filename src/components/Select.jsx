import { useId } from "react";

const Select = ({
    options = [], // avoid error when values are not provided
    label = "",
    className = "",
    ref,
    ...props
} = {}) => {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="">
                    {label}
                </label>
            )}
            <select
                name=""
                id={id}
                ref={ref}
                className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-black duration-200 outline-none focus:bg-gray-50 ${className}`}
                {...props}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default Select;
