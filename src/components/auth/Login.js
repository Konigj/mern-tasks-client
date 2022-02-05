import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertContext from "../../context/alerts/alertsContext";
import AuthContext from "../../context/auth/authContext";
const Login = (props) => {

    const alertContext = useContext(AlertContext)
    const {alert, showAlert} = alertContext

    const authContext = useContext(AuthContext);
    const { message, auth, signIn } = authContext

    let navigate = useNavigate();

    //validation of email and password

    useEffect(() => {
        if(auth) {
            navigate('/projects');
        }
        if(message) {
           showAlert(message.msg, message.category)
        }//eslint-disable-next-line
       }, [message, auth, navigate]);

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

        if(email.trim() === '' || password.trim() === '' ){
            showAlert('All fields are required', 'alert-error')
        }

        signIn({email, password});


    }

  return (
      <div className='form-user'>
        { alert ? (
            <div className={`alert ${alert.category}`}>{alert.msg}</div>
        ):null}
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
