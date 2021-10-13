import React, { useContext, useState } from 'react';
import firebaseConfig from './firebase.config';
import signIn from "../../images/signIn.jpg";
import signUp from "../../images/signUp.jpg";
import "firebase/auth";
import "./Login.css";
import firebase from "firebase/app";
import { Link, useHistory, useLocation } from 'react-router-dom';
import swal from 'sweetalert'
import { GetContexts } from '../../context/AuthProvider';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const Login = () => {
    const {setIsAdmin,refetcher,setLoading,setUserData} = GetContexts();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [newUser, setNewUser] = useState(false);


    const handleGoogleSignIn = async() => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                fetch(`https://specta-web.herokuapp.com/isAdmin?email=${result.user.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            setIsAdmin(true)
                        }
                        else {
                            setIsAdmin(false)
                        }
                        history.push(from);
                        swal(`Hello 🖐 ,${user.name}`, "You are successfully logged in!", "success");
                    });


            }).catch((error) => {
                const newUserInfo = {}
                newUserInfo.error = error.message;
                sessionStorage.setItem('user', JSON.stringify(newUserInfo));

            });

    }


    // Handaling Value change of Input fields
    const handleChange = (event) => {
        let isFieldValid = true;
        let isPasswordMatched = true;
        if (event.target.name === 'name') {
            isFieldValid = true;
        }

        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }

        if (event.target.name === 'password') {
            user.error = '';
            const isPasswordValid = event.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && isPasswordHasNumber;
            setUser({ ...user, password: event.target.value, error: '' })
        }
        if (newUser && event.target.name === 'confirmPassword') {
            setUser({ ...user, confirmPassword: event.target.value })
        }
        if (user.confirmPassword === user.password) {
            isPasswordMatched = true;
            isFieldValid = isPasswordMatched;
        }
        else {
            isPasswordMatched = false;
            isFieldValid = isPasswordMatched;
        }

        if (isFieldValid) {
            const userInfo = { ...user };
            userInfo[event.target.name] = event.target.value;
            setUser(userInfo);
        }

    }

    // Submiting the input value to the server.
    const handleSubmit = (event) => {
        if (newUser && user.email && user.password && user.name) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

                .then(res => {
                    const { email, displayName } = res.user;
                    fetch(`https://specta-web.herokuapp.com/isAdmin?email=${email}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data) {
                                setIsAdmin(true)
                            }
                            else {
                                setIsAdmin(false)
                            }
                        });
                 
                        history.push(from);
                    swal(`Hello 🖐 ,${displayName}`, "You are successfully logged in!", "success");
                    updateUserName(user.name);
                    

                })
                .catch((error) => {
                    const newUserInfo = {};
                    newUserInfo.error = error.message;
                    sessionStorage.setItem('user', JSON.stringify(newUserInfo));
                    alert(`${error.message}`)

                });
        }
        if (!newUser && user.email && user.password) {
            setLoading(true);
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const { email} = res.user;
                    fetch(`https://specta-web.herokuapp.com/isAdmin?email=${email}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data) {
                                setIsAdmin(true)
                            }
                            else {
                                setIsAdmin(false)
                            }

                        });
                    setUserData(res.user)
                    setLoading(false);
                    swal(`Hello 🖐 ,${res.user.displayName}`, "Your signed in successfully!", "success");
                    history.push(from);
                })
                .catch((error) => {
                    setLoading(false);
                    alert(`${error.message}`)
                });
        }
        if (event) {
            event.preventDefault();
        }
    }

    const updateUserName = name => {
        setLoading(true)
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(function () {
            setLoading(false)
        }).catch(function (error) {
            setLoading(false);
        });
    }

    const demoHandler = () => {
        const demoUser = {
            email: 'admin-demo@specta.com',
            password: '123456'
        };
        swal({
            title: "Are you want to login as a demo admin?",
            text: "By click in okay,you will login as a demo admin and you get a overview of this website.This won't give you the permisson to delete or modify anything.But You can update the order status.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((agree) => {
                setLoading(true);
                if (agree) {
                    firebase.auth().signInWithEmailAndPassword(demoUser.email, demoUser.password)
                        .then(res => {
                            setUserData(res.user);
                            setLoading(false);
                            history.push(from);
                        })
                        .catch(err => {
                            swal("Failed");
                            setLoading(false)
                        });        
                } else {
                    swal("Loggin with an account");
                }
            });
    }



    return (
        <div className="card-container">
            <div className="sign-card">
                <div className="img-div">
                    {
                        newUser ? <img src={signUp} alt="" /> : <img src={signIn} alt="" />

                    }
                    
                    

                </div>
                <form className="input-div" onSubmit={handleSubmit}>
                    <div>
                        {
                            newUser ? <h1>Sign Up</h1> : <h1>Sign In</h1>
                        }
                        {
                            newUser &&
                            <div className="input-group">
                                <span >
                                    <i class="fas fa-user"></i>
                                </span>
                                <input onChange={handleChange} type="text" name="name" placeholder="Name" required minLength="3" />
                            </div>
                        }
                        <div className="input-group">
                            <span>
                                <i class="fas fa-envelope" ></i>
                            </span>
                            <input onChange={handleChange} type="email" name="email" placeholder="Email" required />
                        </div>
                        <div className="input-group">
                            <span >
                                <i class="fas fa-lock"></i>
                            </span>
                            <input onChange={handleChange} type="password" name="password" placeholder="Password" minLength="6" required />
                        </div>
                        {
                            newUser &&
                            <div className="input-group">
                                <span >
                                    <i class="fas fa-lock"></i>
                                </span>
                                <input onChange={handleChange} type="password" name="confirmPassword" placeholder="Confirm Password" minLength="6" required />
                                {
                                    user.confirmPassword && user.confirmPassword !== user.password && <p style={{ color: "red" }}>Passwords are not same</p>
                                }
                            </div>
                        }
                        <input type="checkbox" name="remember-me" id="checkbox" />  <label htmlFor="remember-me">Remember me</label>
                        <p style={{ color: "red" }}>{user?.error}</p>

                        {
                            !newUser && <input className="btn" type="submit" value="Sign In" />
                        }
                        {
                            newUser && user.password === user.confirmPassword && <input className="btn" type="submit" value="Submit" />
                        }

                        <div style={{display:"flex",flexDirection:'column',justifyContent:"center",alignItems:'center',gap:'5px',marginTop:'10px'}}>
                            
                        {newUser ? <Link onClick={() => setNewUser(!newUser)}> Already have an account ? </Link> :
                                <Link onClick={() => setNewUser(!newUser)}> Create an account ? </Link>}
                            {
                        <Link onClick={demoHandler}>
                            Try Out Demo Admin ?
                        </Link>
                    }
</div>
                    
                    </div>

                    {
                        <div className="social-links" onClick={handleGoogleSignIn}>
                            <span>Login with Google</span>    <button > <i class="fab fa-google"></i></button>


                        </div>
                    }
                </form>

            </div>
        </div>
    );
};

export default Login;