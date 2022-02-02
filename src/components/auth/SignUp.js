import { useState } from "react";
import { Link } from "react-router-dom";
const SignUp = () => {

    const [user, SetUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    })

    const {name, email, password, confirm} = user;

    const onChangeSignUp = e => {
        SetUser({
            ...user, 
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

    }

  return (
      <div className='form-user'>
        <div className='container-form shadow-dark'>
            <h1>Create Account</h1>

            <form onSubmit={onSubmit}>
                <div className='field-form'>
                    <label htmlFor='name'>Name</label>
                    <input value={name} type='text' id='name' name='name' onChange={onChangeSignUp}/>
                </div>
                <div className='field-form'>
                    <label htmlFor='email'>Email</label>
                    <input value={email} type='email' id='email' name='email' onChange={onChangeSignUp}/>
                </div>
                <div className='field-form'>
                    <label htmlFor='password'>Password</label>
                    <input value={password} type='password' id='password' name='password' onChange={onChangeSignUp}/>
                </div>
                <div className='field-form'>
                    <label htmlFor='confirm'>Confirm password</label>
                    <input value={confirm} type='password' id='confirm' name='confirm' onChange={onChangeSignUp}/>
                </div>
                   <div className='field-form'>
                    <input type='submit' className='btn btn-primary btn-block' value='Sign in'/>
                   </div>
            </form>
            <Link to={'/'} className="link-account">Log In</Link>
        </div>
      
      </div>
  )
};

export default SignUp;
