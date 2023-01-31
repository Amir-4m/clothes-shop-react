import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import SingUpForm from '../../components/sing-up-form/sign-up-form.component';
import SingInForm from '../../components/sing-in-form/sign-in-form.component';
import Button from '../../components/button/button.component';

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <SingInForm/>
            <Button buttonType='google' onClick={logGoogleUser}>sign in with google</Button>
            <SingUpForm/>
        </div>
    )
}

export default SignIn;