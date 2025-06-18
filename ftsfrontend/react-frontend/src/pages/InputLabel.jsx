
const InputLabel = ({name, 
    inputType,
    labelName, 
    placeholder, 
    onChange,
    inputValue  //this prop is obtained from signup page the parent component. we pass the value from there to the 
    // inputlabel component to maintain a single source of truth for the input value
    }) => {

return (   
    <>
        <div className="passworddiv flex flex-start items-center justify-start w-full ">
                <label
                 className="text-gray-700 my-1 sm:text-xs font-bold mb-2"
                 htmlFor={name}
                 >
                    {labelName}
                 </label>
            </div>

            <div className="inp-pass flex flex-col justify-start">
                <input
                id={name}
                name={name}
                type={inputType}
                value={inputValue}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full p-2  border border-gray-300 rounded text-sm"
                required
                />
            </div>
    </>
    
);
}

export default InputLabel;