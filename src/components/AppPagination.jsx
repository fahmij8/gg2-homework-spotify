import React from 'react';
import AppButton from './AppButton';
import {faAnglesRight, faAnglesLeft} from '@fortawesome/free-solid-svg-icons';

/**
 * AppPagination component
 * @param {number} searchOffset
 * @param {void} setSearchOffset
 * @return {JSX.Element}
 */
function AppPagination({searchOffset, setSearchOffset, songData}) {
  return (
    <>
      {typeof songData === 'object' && songData.length > 0 && (
        <div className="flex items-center justify-center mt-8">
          <div
            className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
            role="group"
          >
            {searchOffset > 0 && (
              <AppButton
                buttonTheme="primary"
                buttonIcon={faAnglesLeft}
                buttonIconPosition="back"
                buttonSize="medium"
                buttonClass="rounded-full mr-2"
                buttonClick={() => {
                  setSearchOffset(
                    searchOffset - 10 < 0 ? 0 : searchOffset - 10,
                  );
                }}
              ></AppButton>
            )}
            <AppButton
              buttonTheme="primary"
              buttonIcon={faAnglesRight}
              buttonIconPosition="front"
              buttonSize="medium"
              buttonClass="rounded-full"
              buttonClick={() => {
                setSearchOffset(searchOffset + 10);
              }}
            ></AppButton>
          </div>
        </div>
      )}
    </>
  );
}

export default AppPagination;
