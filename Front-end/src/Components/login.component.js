import Button from '@material-ui/core/Button';
import { useState, useEffect, useRef } from "react";

const Login = (getUser) => {



    return (
        <div>
            <form className={"login-form"}>
                <header> Hotels R US Login <Button id={"logOutButton"} > log out</Button></header>
            </form>
        </div>
    )

}

export default Login
