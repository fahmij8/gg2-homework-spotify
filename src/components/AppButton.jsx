import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

/**
 * AppButton component
 * @param  {string} buttonTheme
 * @param  {void} buttonClick
 * @param  {string} buttonClass
 * @param  {string} buttonType
 * @param  {string} buttonText
 * @param  {string} buttonSize
 * @param  {string} buttonIcon
 * @param  {string} buttonIconPosition
 * @return {JSX.Element}
 */
function AppButton({
  buttonTheme,
  buttonClick,
  buttonClass,
  buttonType,
  buttonText,
  buttonSize,
  buttonIcon,
  buttonIconPosition,
}) {
  let selectedTheme;
  if (buttonTheme === 'primary') {
    selectedTheme = `bg-green-500 text-zinc-50 hover:bg-green-400 
      focus:bg-green-400 active:bg-green-400 `;
  } else if (buttonTheme === 'secondary') {
    selectedTheme = `bg-white text-zinc-500 hover:bg-slate-300 
      focus:bg-slate-300 active:bg-slate-300 `;
  } else if (buttonTheme === 'danger') {
    selectedTheme = `bg-red-500 text-zinc-50 hover:bg-red-400 focus:bg-red-400 
      active:bg-red-400 `;
  }

  selectedTheme += `inline-block leading-tight focus:outline-none focus:ring-0 
    transition ease-in-out duration-75 hover:scale-105 `;

  if (buttonSize === 'small') {
    selectedTheme += 'py-1.5 px-2.5 font-medium text-xs leading-tight ';
  } else if (buttonSize === 'medium') {
    selectedTheme += 'py-2 px-3 font-medium text-sm leading-tight ';
  } else if (buttonSize === 'large') {
    selectedTheme += 'py-3 px-5 font-medium text-lg leading-tight ';
  }

  return (
    <button
      className={`${buttonClass} ${selectedTheme}`}
      onClick={buttonClick}
      type={buttonType}
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
    >
      {buttonIconPosition === 'back' && (
        <FontAwesomeIcon
          icon={buttonIcon}
          className={`${buttonText && 'mr-1.5'}`}
        ></FontAwesomeIcon>
      )}
      {buttonText}
      {buttonIconPosition === 'front' && (
        <FontAwesomeIcon
          icon={buttonIcon}
          className={`${buttonText && 'ml-1.5'}`}
        ></FontAwesomeIcon>
      )}
    </button>
  );
}

export default AppButton;
