import React from 'react';

/**
 * AppTextarea component
 * @param  {string} {areaType
 * @param  {string} areaName
 * @param  {string} areaLabel
 * @param  {string} areaValue
 * @param  {string} areaPlaceholder
 * @param  {void} areaOnChange
 * @param  {void} areaOnBlur
 * @param  {string} areaClassName
 * @param  {string} areaRequired
 * @param  {string} areaDisabled
 * @param  {string} areaSize
 * @return {JSX.Element}
 */
function AppTextarea({
  areaType,
  areaName,
  areaLabel,
  areaValue,
  areaPlaceholder,
  areaOnChange,
  areaOnBlur,
  areaClassName,
  areaRequired,
  areaDisabled,
  areaSize,
}) {
  return (
    <>
      <label
        htmlFor={areaName}
        className="form-label inline-block mt-4 mb-2 text-zinc-200"
      >
        {areaLabel}
      </label>
      <textarea
        type={areaType}
        className={`form-control block w-full px-3 py-1.5 font-normal
          text-zinc-200 bg-zinc-500 bg-clip-padding rounded shadow-lg m-0 
            transition ease-in-out focus:text-zinc-200 focus:bg-zinc-500 focus:ring-2
            focus:outline-none ${areaClassName}`}
        id={areaName}
        name={areaName}
        placeholder={areaPlaceholder}
        onChange={areaOnChange}
        onBlur={areaOnBlur}
        required={areaRequired}
        disabled={areaDisabled}
        rows={areaSize}
        value={areaValue}
      ></textarea>
    </>
  );
}

export default AppTextarea;
