import React from 'react';
/**
 * AppInput component
 * @param  {string} {inputType
 * @param  {string} inputName
 * @param  {string} inputLabel
 * @param  {string} inputValue
 * @param  {string} inputPlaceholder
 * @param  {void} inputOnChange
 * @param  {void} inputOnBlur
 * @param  {string} inputClassName
 * @param  {string} inputRequired
 * @param  {string} inputDisabled
 * @param  {string} inputSize
 * @return {JSX.Element}
 */
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
  ...rest
}) {
  let inputClassSize;
  if (inputSize === 'small') {
    inputClassSize = 'py-1 px-2 text-xs';
  } else if (inputSize === 'medium') {
    inputClassSize = 'py-1.5 px-3 text-base';
  } else if (inputSize === 'large') {
    inputClassSize = 'py-4 px-2 text-xl';
  }

  return (
    <>
      {inputLabel && (
        <label
          htmlFor={inputName}
          className="form-label inline-block mt-4 mb-2 text-zinc-200"
        >
          {inputLabel}
        </label>
      )}
      <input
        type={inputType}
        className={`form-control block w-full ${inputClassSize} text-zinc-200
          bg-zinc-500 bg-clip-padding rounded shadow-lg focus:outline-none
            transition ease-in-out m-0 focus:text-zinc-200 focus:bg-zinc-500 
            focus:ring-2 ${inputClassName}`}
        id={inputName}
        name={inputName}
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={inputOnChange}
        onBlur={inputOnBlur}
        required={inputRequired}
        disabled={inputDisabled}
        {...rest}
      />
    </>
  );
}

export default AppInput;
