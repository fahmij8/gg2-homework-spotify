import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {motion} from 'framer-motion';
import {ButtonProps} from 'types';

/**
 * AppButton component
 * @param {object} props
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
  buttonIconClassName,
  ...rest
}: ButtonProps): JSX.Element {
  let selectedTheme;
  if (buttonTheme === 'primary') {
    selectedTheme =
      `bg-green-500 text-zinc-50 hover:bg-green-400 ` +
      `focus:bg-green-400 active:bg-green-400 disabled:bg-green-400/50 `;
  } else if (buttonTheme === 'secondary') {
    selectedTheme =
      `bg-white text-zinc-500 hover:bg-slate-300 ` +
      `focus:bg-slate-300 active:bg-slate-300 disabled:bg-slate-300/50 `;
  } else if (buttonTheme === 'danger') {
    selectedTheme =
      `bg-red-500 text-zinc-50 hover:bg-red-400 focus:bg-red-400 ` +
      `active:bg-red-400 disabled:bg-red-400/50 `;
  }

  selectedTheme += `inline-block leading-tight focus:outline-none focus:ring-0 `;

  if (buttonSize === 'small') {
    selectedTheme += `py-1.5 px-2.5 font-medium text-xs leading-tight `;
  } else if (buttonSize === 'medium') {
    selectedTheme += `py-2 px-3 font-medium text-sm leading-tight `;
  } else if (buttonSize === 'large') {
    selectedTheme += `py-3 px-5 font-medium text-lg leading-tight `;
  }

  return (
    <motion.button
      className={`${buttonClass} ${selectedTheme}`}
      onClick={buttonClick}
      type={buttonType}
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      whileHover={{scale: 1.1}}
      whileTap={{scale: 0.9}}
      {...rest}
    >
      {buttonIconPosition === 'back' && buttonIcon && (
        <FontAwesomeIcon
          icon={buttonIcon}
          className={`${buttonText ? 'mr-1.5' : ''} ${buttonIconClassName}`}
        ></FontAwesomeIcon>
      )}
      {buttonText}
      {buttonIconPosition === 'front' && buttonIcon && (
        <FontAwesomeIcon
          icon={buttonIcon}
          className={`${buttonText ? 'ml-1.5' : ''}  ${buttonIconClassName}`}
        ></FontAwesomeIcon>
      )}
    </motion.button>
  );
}

export default AppButton;
