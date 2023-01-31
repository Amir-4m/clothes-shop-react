import SingUpForm from '../../components/sing-up-form/sign-up-form.component';
import SingInForm from '../../components/sing-in-form/sign-in-form.component';
import './authentiaction.styles.scss'
const Authentication = () => {
    return (
        <div className='authentication-container'>
            <SingInForm/>
            <SingUpForm/>
        </div>
    )
}

export default Authentication;