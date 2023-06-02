
import SignUpForm from '../../components/Sign-up-form/sign-up-form.component';
import SignInForm from '../../components/Sign-in-form/sign-in-form.component';

import './authentication.style.scss'

const Authentication = () => {


    return (
        <div className='authentication-container'>
            <SignInForm></SignInForm>
            <SignUpForm></SignUpForm>
        </div>
    );
};

export default Authentication;