/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LoginApi } from '../../redux/actions/authentication';
import { AppState, useAppThunkDispatch } from '../../redux/store';
import './Login.css';
import '../Register/Register.css';

const Login=()=>{
  const [email,setEmailid]=useState('');
  const [password,setPassword]=useState('');
  const dispatch = useAppThunkDispatch();
  const user = useSelector((state: AppState) => state.login);
  // eslint-disable-next-line no-console
  console.log('User ',user);
  const [error, setError] = useState<{ email?: string; password?: string;}>({});
  const validate = () => {
    const newError: { email?: string; name?: string
        password?: string; phone?: string; } = {};
    if (!email) {
        newError.email = 'Email is required';
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = 'Email is not valid';
    }
    if (!password) {
        newError.password = 'Password is required';
    }
    else if (!password.match("^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$")) {
    newError.password = 'Password must contain at least 5 characters and contain at least 1 lowercase letter, 1 number, and 1 special character';
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };
  const submit =(e:any)=>{
     e.preventDefault();
     if (validate()){
    dispatch(LoginApi({
      email,password
    }));
  };
  };
    return (
        <body>
        <div className="body">
        </div>
        <div className="grad"></div>
        <div className="header">
          <div>Parcel<span>Tracker</span></div>
        </div>
        <br />
        {/* <form onSubmit={submit}>
            <div className="login">
            <div className="login-header">
              <h1>Login</h1>
            </div>
            <div className="login-form">
              <h3>Username:</h3>
              <input name="email"
              id="email" type="text" placeholder="Email"
               onChange={e=> setEmailid(e.target.value)}/>
               <br />
               {error.email && <span className="error">{error.email}</span>}
              <h3>Password:</h3>
              <input name="password"
               id="password"type="password" placeholder="Password"
              onChange={e=> setPassword(e.target.value)}/>
              <br />
              {error.password && <span className="error">{error.password}</span>}
              <div >
              <button className="btn mt-3" type="submit">Login</button>
              </div>
              <br />
             <div>
                 Don&apos;t have an account<Link to="/register">Register</Link>
             </div>
              <br />
            </div>
          </div>
          </form> */}
              <div className="container-fluid">
              <div className="login">
            <div className="login-header">
              <h1>Login</h1>
            </div>
        <div className="row">
            <div className="col">
                <div className="wrapper">
                    <form className="p-3 mt-3" onSubmit={submit} >
                        <div className="form-field d-flex align-items-center">
                            <span className="fas fa-key"></span>
                            <input type="email"  id="emailid" placeholder="email" value={email} onChange={(e)=>setEmailid(e.target.value)}></input>
                        </div>
                        {error.email && <span className="error">{error.email}</span>}
                        <div className="form-field d-flex align-items-center">
                            <span className="fas fa-key"></span>
                            <input type="password" id="password"  placeholder="password"value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                        </div>
                        {error.password && <span className="error">{error.password}</span>}
                        <div >
              <button className="btn mt-3" type="submit">Login</button>
              </div>
                    </form>
                    <div className="text-center fs-6">
                    Don&apos;t have an account? <Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>

          </body>

    );
};
export default Login;