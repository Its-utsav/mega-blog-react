import { useId } from "react";
// as per new docs
const Input = ({ label, type = "text", className = "", ref, ...props }) => {
    const inputId = useId();
    return (
        <div className="w-full">
            {label && (
                <label className="mb-1 inline-block pl-1" htmlFor={inputId}>
                    {label}
                </label>
            )}
            <input
                type={type}
                id={inputId}
                className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-black duration-200 outline-none focus:bg-gray-50 ${className}`}
                {...props}
                ref={ref}
            />
        </div>
    );
};
// const Input = forwardRef((props, ref) => {
//     {
//         const { label, type = "text", className = "", ...prop } = props;
//         const inputId = useId();
//         return (
//             <div className="w-full">
//                 {label && (
//                     <label className="mb-1 inline-block pl-1" htmlFor={inputId}>
//                         {label}
//                     </label>
//                 )}
//                 <input
//                     type={type}
//                     id={inputId}
//                     className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-black duration-200 outline-none focus:bg-gray-50 ${className}`}
//                     {...prop}
//                     ref={ref}
//                 />
//             </div>
//         );
//     }
// });

export default Input;
