import React, { useEffect } from 'react';

function GoogleAuthButton({ onLoginWithGoogle }) {
    const handleCallbackResponse = (response) => {
        onLoginWithGoogle(response.credential);
    };

    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse,
        });

        google.accounts.id.renderButton(document.getElementById('signInDiv'), {
            type: 'icon',
            theme: 'outline',
            size: 'large',
            shape: 'circle',
        });
    }, []);

    return <div id="signInDiv"></div>;
}

export default GoogleAuthButton;
