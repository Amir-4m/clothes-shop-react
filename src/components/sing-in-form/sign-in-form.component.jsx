import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    'email': '',
    'password': '',
}

const SingInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password } = formFields;


    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    };

    return (
        <div className="sign-in-container">
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type='email' required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={password}/>
                <Button buttonType='default' type="submit">Sign In</Button>
            </form>
        </div>
    )
}

export default SingInForm;