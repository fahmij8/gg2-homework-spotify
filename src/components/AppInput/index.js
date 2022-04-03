function AppInput({
    inputType,
    inputName,
    inputLabel,
    inputValue,
    inputPlaceholder,
    inputOnChange,
    inputOnBlur,
    inputClassName,
    inputRequired,
    inputDisabled,
    inputSize,
}) {
    let inputClassSize;
    if (inputSize === "small") {
        inputClassSize = "py-1 px-2 text-xs";
    } else if (inputSize === "medium") {
        inputClassSize = "py-1.5 px-3 text-base";
    } else if (inputSize === "large") {
        inputClassSize = "py-4 px-2 text-xl";
    }

    return (
        <div className="flex justify-center mx-6 sm:mx-11 md:mx-20">
            <div className="mb-3 w-full max-w-md">
                <label
                    htmlFor={inputName}
                    className="form-label inline-block mb-2 text-zinc-50"
                >
                    {inputLabel}
                </label>
                <input
                    type={inputType}
                    className={`form-control block w-full ${inputClassSize} text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none ${inputClassName}`}
                    id={inputName}
                    name={inputName}
                    placeholder={inputPlaceholder}
                    value={inputValue}
                    onChange={inputOnChange}
                    onBlur={inputOnBlur}
                    required={inputRequired}
                    disabled={inputDisabled}
                />
            </div>
        </div>
    );
}

export default AppInput;
