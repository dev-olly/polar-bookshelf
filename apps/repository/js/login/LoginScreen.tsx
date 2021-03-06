import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button/Button';
import {Firebase} from "../../../../web/js/firebase/Firebase";
import {
    FirebaseUIAuth,
    FirebaseUIAuthOptions
} from "../../../../web/js/firebase/FirebaseUIAuth";
import {ExternalNavigationBlock} from "../../../../web/js/electron/navigation/ExternalNavigationBlock";
import Paper from '@material-ui/core/Paper';
import {MUIButtonBar} from "../../../../web/js/mui/MUIButtonBar";
import {SignInSuccessURLs} from "./SignInSuccessURLs";

interface IProps extends FirebaseUIAuthOptions {

}

export const LoginScreen = React.memo((props: IProps) => {

    function doCancel() {

        if (document.location.href.startsWith('https://app.getpolarized.io')) {
            document.location.href = 'https://app.getpolarized.io';
        } else {
            document.location.href = '/';
        }

    }

    function doDownloadDesktop() {
        document.location.href = 'https://getpolarized.io/download.html?utm_source=getpolarized.io&utm_content=login-download-button&utm_medium=site';
    }

    function doInit() {

        ExternalNavigationBlock.set(false);

        Firebase.init();

        const user = Firebase.currentUser();

        if (! user) {

            const signInSuccessUrl = SignInSuccessURLs.get();

            const authOptions: FirebaseUIAuthOptions = {
                ...props,
                signInSuccessUrl
            }

            FirebaseUIAuth.login(authOptions);

        } else {
            console.log("Already authenticated as " + user.email);
        }

    }

    useEffect(() => {
        doInit();
    });

    return (
        <div style={{
                 display: 'flex',
                 width: '100%',
                 height: '100%'
             }}>
            <Paper style={{
                       margin: 'auto',
                       maxWidth: '450px',
                       maxHeight: '500px',
                       width: '100%',
                       height: '100%',
                       display: 'flex',
                       flexDirection: 'column'
                   }}>

                <div style={{flexGrow: 1}}>

                    <div className="text-center">

                        <img className="logo"
                             src="/icon.svg"
                             width="175"
                             height="175"/>

                        <h1>
                            Login to Polar
                        </h1>

                    </div>

                    <div id="firebaseui-auth-container" className="p-1"/>

                </div>

                <MUIButtonBar className="mt-1 p-1"
                              style={{justifyContent: 'flex-end'}}>

                    <Button variant="contained"
                            color="default"
                            onClick={doCancel}>

                        Cancel

                    </Button>

                    {/*<Button variant="contained"*/}
                    {/*        color="default"*/}
                    {/*        onClick={doDownloadDesktop}*/}
                    {/*        hidden={appRuntime === 'browser'}*/}
                    {/*        title="We also have a desktop version of Polar that runs on Windows, MacOS, or Linux.">*/}

                    {/*    <i className="fas fa-download"/>*/}

                    {/*    Download Desktop*/}

                    {/*</Button>*/}

                </MUIButtonBar>

            </Paper>

        </div>
    );
});
