import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { ThirdPartySignIn } from '../services/authentication';


const ThirdPartySignIns = () => {
    const dispatch = useDispatch();

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <GoogleLogin
                    onSuccess={r => ThirdPartySignIn(dispatch, r.tokenId)}
                    onFailure={e => console.log('Error!', e)}
                />
            </div>
        </GoogleOAuthProvider>
    );
}

export default ThirdPartySignIns;