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
        <div className="flex justify-center mx-6 sm:mx-11 md:mx-20">
            <div className="mb-3 w-full max-w-md">
                <label
                    htmlFor={areaName}
                    className="form-label inline-block mb-2 text-zinc-50"
                >
                    {areaLabel}
                </label>
                <textarea
                    type={areaType}
                    className={`form-control block w-full px-3 py-1.5 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none ${areaClassName}`}
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
            </div>
        </div>
    );
}

export default AppTextarea;
