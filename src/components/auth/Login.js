import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [user, SetUser] = useState({
        email: '',
        password: '',
    })

    const {email, password} = user;

    const onChangeLogIn = e => {
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
            <h1>Log in</h1>

            <form onSubmit={onSubmit}>
                <div className='field-form'>
                    <label htmlFor='email'>Email</label>
                    <input value={email} type='email' id='email' name='email' onChange={onChangeLogIn}/>
                </div>
                <div className='field-form'>
                    <label htmlFor='password'>Password</label>
                    <input value={password} type='password' id='password' name='password' onChange={onChangeLogIn}/>
                </div>
                   <div className='field-form'>
                    <input type='submit' className='btn btn-primary btn-block' value='Log in'/>
                   </div>
            </form>
            <Link to={'/sign-up'} className="link-account">Sign Up</Link>
        </div>
      
      </div>
  )
};

export default Login;
