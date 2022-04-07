import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setTokenType } from "store/accountSlicer";
import { LOGIN_URL } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

function Login() {
    const dispatch = useDispatch();

    useEffect(() => {
        let urlParams = window.location.hash.substring(1).split("&");
        let params = {};
        urlParams.forEach((param) => {
            let keyValue = param.split("=");
            params[keyValue[0]] = keyValue[1];
        });
        params.access_token && dispatch(setAccessToken(params.access_token));
        params.token_type && dispatch(setTokenType(params.token_type));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="my-8 mx-6">
            <h2 className="text-3xl text-center mt-14 font-semibold text-white">
                Login first to use the service
            </h2>
            <a
                href={LOGIN_URL}
                className="bg-green-500 hover:bg-green-600 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white block mx-auto w-fit mt-5 transition ease-in-out duration-75 hover:scale-105"
            >
                <FontAwesomeIcon
                    icon={faSpotify}
                    className="mr-1"
                ></FontAwesomeIcon>
                Login with Spotify
            </a>
        </div>
    );
}

export default Login;
