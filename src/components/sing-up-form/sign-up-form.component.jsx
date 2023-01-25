import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
    'displayName': '',
    'email': '',
    'password': '',
    'confirmPassword': ''
}

const SingUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;


    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formFields.password != formFields.confirmPassword) return alert('wrong password')
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(
                user,
                {
                    displayName: displayName
                }
            )
            resetFormField();
        } catch (error) {
            console.log(error)
        }

    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    };

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Display Name</label>
                <input type='text' required onChange={handleChange} name="displayName" value={displayName}></input>

                <label htmlFor="">Email</label>
                <input type='email' required onChange={handleChange} name="email" value={email}></input>

                <label htmlFor="">Password</label>
                <input type='password' required onChange={handleChange} name="password" value={password}></input>

                <label htmlFor="">Confirm Password</label>
                <input type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword}></input>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SingUpForm;