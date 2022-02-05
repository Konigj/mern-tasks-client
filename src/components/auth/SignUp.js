import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertContext from "../../context/alerts/alertsContext";
import AuthContext from "../../context/auth/authContext";
const SignUp = props => {

    //contexts values

    let navigate = useNavigate();

    const alertContext = useContext(AlertContext)
    const {alert, showAlert} = alertContext

    const authContext = useContext(AuthContext);
    const { message, auth, userRegistration } = authContext

    //auth + register or duplicated register
    useEffect(() => {
     if(auth) {
         navigate('/projects');
     }
     if(message) {
        showAlert(message.msg, message.category)
     }
    }, [message, auth, navigate]);
    

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

        //validate no empty fields
        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === '') {
            showAlert("All fields are required", 'alert-error')
            return;
        }
        
        //password with 6 characters
        if(password.length < 6) {
            showAlert("Password must have at least 6 characters", 'alert-error')
            return;
        }

        if (password !== confirm) {
            showAlert("Passwords are not identical", 'alert-error')
        } 

        userRegistration({
            name, email, password
        });

        
    }

  return (
      <div className='form-user'>
        {alert ? (
            <div className={`alert ${alert.category}`}>{alert.msg}</div>
        ):null}
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
                    <input type='submit' className='btn btn-primary btn-block' value='Sign up'/>
                   </div>
            </form>
            <Link to={'/'} className="link-account">Log In</Link>
        </div>
      
      </div>
  )
};

export default SignUp;
