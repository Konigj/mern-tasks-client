import {useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext';
const Bar = () => {

  const authContext = useContext(AuthContext)
  const {user, authUser, logOut} = authContext

  useEffect(()=> {
    authUser();
  }, [])

  return (
      <header className='app-header'>
      {user ?<p className='name-user'>Hola <span>{user.name}</span> </p>:null}
        

        <nav className='nav-principal'>
            <button className='btn btn-primary btn-blank log-out' onClick={()=> logOut()}>Log Out</button>
        </nav>

      </header>
  )
};

export default Bar;
