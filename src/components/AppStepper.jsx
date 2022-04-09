import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

/**
 * AppStepper component
 * @param  {object} {steps
 * @param  {number} activeStep}
 * @return {JSX.Element}
 */
function AppStepper({steps, activeStep}) {
  return (
    <div className="max-w-xl min-w-[200px] block mx-auto h-auto pb-10">
      <div className="mx-4 p-4">
        <div className="flex items-center">
          {steps.map((step, index) => {
            return (
              <React.Fragment key={index}>
                {index > 0 && (
                  <div
                    className={`flex-auto border-t-2 transition duration-500 
                    ease-in-out 
                    ${
                      activeStep >= index
                        ? 'border-green-400'
                        : 'border-gray-200'
                    }
                    `}
                  ></div>
                )}
                <div className="flex items-center text-white relative">
                  <div
                    className={`rounded-full transition duration-500 
                      ease-in-out h-12 w-12 py-3 border-2 border-green-500 
                      ${activeStep >= index && 'bg-green-500'} 
                      `}
                  >
                    <FontAwesomeIcon
                      icon={step.icon}
                      className="block w-full h-full max-w-[20px] mx-auto"
                    ></FontAwesomeIcon>
                  </div>
                  <div
                    className="absolute block top-14 left-0 right-0
                      w-12 mx-auto"
                  >
                    <p
                      className="text-xs font-medium uppercase text-center
                        flex flex-col items-center"
                    >
                      {step.name}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AppStepper;
