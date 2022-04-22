import {TextAreaProps} from 'types';

/**
 * AppTextarea component
 * @param  {object} props
 * @return {JSX.Element}
 */
function AppTextarea({
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
}: TextAreaProps): JSX.Element {
  return (
    <>
      <label
        htmlFor={areaName}
        className="form-label inline-block mt-4 mb-2 text-zinc-200"
      >
        {areaLabel}
      </label>
      <textarea
        className={
          `form-control block w-full px-3 py-1.5 font-normal ` +
          `text-zinc-200 bg-zinc-500 bg-clip-padding rounded shadow-lg m-0 ` +
          `transition ease-in-out focus:text-zinc-200 focus:bg-zinc-500 focus:ring-2 ` +
          `focus:outline-none ${areaClassName}`
        }
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
