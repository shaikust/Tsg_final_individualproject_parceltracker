/* eslint-disable max-len */

import { Console } from 'console';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RegisterApi } from '../../redux/actions/authentication';
import { AppState, useAppThunkDispatch } from '../../redux/store';
import './Register.css';

/* eslint-disable react/react-in-jsx-scope */
const Register=()=>{
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [phone,setPhoneno]=useState('');
    const dispatch = useAppThunkDispatch();
    const user = useSelector((state: AppState) => state.user);
    const [error, setError] = useState<{ email?: string; name?: string
                 password?: string; phone?: string; }>({});
                 const validate = () => {
                    const newError: { email?: string; name?: string
                        password?: string; phone?: string; } = {};
                    if (!name) {
                        newError.name = 'name is required';
                    }
                    if (!email) {
                        newError.email = 'Email is required';
                    }
                    else if (!email.match("^[a-zA-Z0-9_+&-]+(?:\\.[a-zA-Z0-9_+&-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{1,7}$")) {
                        newError.email = 'Email must contain a valid username followed by @ symbol, a domain name after @ symbol, and a top-level domain (TLD) such as .com, .net, .org, etc.';
                    }
                    if (!password) {
                        newError.password = 'Password is required';
                    }
                    else if (!password.match("^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$")) {
                        newError.password = 'Password must contain at least 5 characters and contain at least 1 lowercase letter, 1 number, and 1 special character';
                    }
                    if (!phone) {
                        newError.phone = 'phone number is required';
                    }
                    setError(newError);
                    return Object.keys(newError).length === 0;
                  };
            
    const handleClick=(e:any)=>{
        e.preventDefault();
        if (validate()){
        dispatch(RegisterApi({
            email,name,password,phone
        }));
    };
    };
    return(
        <body>
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <div className="wrapper">
                    <div className="logo">
                        <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-login-web-development-flaticons-flat-flat-icons.png" />
                    </div>
                    <div className="text-center mt-4 name">
                        Register here
                    </div>
                    <form className="p-3 mt-3" >
                        <div className="form-field d-flex align-items-center">
                            <span className="fas fa-key"></span>
                            <input type="email"  id="emailid" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                        </div>
                        {error.email && <span className="error">{error.email}</span>}
                        <div className="form-field d-flex align-items-center">
                            <span className="far fa-user"></span>
                            <input type="text"  id="name" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                        </div>
                        {error.name && <span className="error">{error.name}</span>}
                        <div className="form-field d-flex align-items-center">
                            <span className="fas fa-key"></span>
                            <input type="password"id="password"  placeholder="password"value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                        </div>
                        {error.password && <span className="error">{error.password}</span>}
                        <div className="form-field d-flex align-items-center">
                            <span className="fas fa-key"></span>
                            <input type="number"  id="phone" placeholder="PhNo" value={phone} onChange={(e)=>setPhoneno(e.target.value)}></input>
                        </div>
                        {error.phone && <span className="error">{error.phone}</span>}
                        <button className="btn mt-3" onClick={handleClick}>register</button>
                    </form>
                    <div className="text-center fs-6">
                        Already registerd ?<Link to='/login'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

    );

};
export default Register;