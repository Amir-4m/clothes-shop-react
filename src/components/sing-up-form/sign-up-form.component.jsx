import { useState } from "react";

const defaultFormFields = {
    'displayName': '',
    'email': '',
    'password': '',
    'confrimPassword': ''
}

const SingUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confrimPassword } = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={() => { }}>
                <label htmlFor="">Display Name</label>
                <input type='text' required onChange={handleChange} name="displayName" value={displayName}></input>

                <label htmlFor="">Email</label>
                <input type='email' required onChange={handleChange} name="email" value={email}></input>

                <label htmlFor="">Password</label>
                <input type='password' required onChange={handleChange} name="password" value={password}></input>

                <label htmlFor="">Confirm Password</label>
                <input type='password' required onChange={handleChange} name="confirmPassword" value={confrimPassword}></input>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SingUpForm;