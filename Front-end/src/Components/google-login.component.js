// JavaScript source code
import axios from "axios";
require('dotenv').config()

const googleLogin = async (accesstoken) => {
    let res = await axios.post(
        process.env.REACT_APP_FRONT_END_SERVER_URI,
        {
            access_token: accesstoken,
        }
    );
    console.log(res);
    return await res.status;
};

export default googleLogin;