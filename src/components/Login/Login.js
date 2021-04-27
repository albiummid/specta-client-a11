import React, { useContext, useEffect, useState } from 'react';
import firebaseConfig from './firebase.config';
import signIn from "../../images/signIn.jpg";
import signUp from "../../images/signUp.jpg";
import "firebase/auth";
import "./Login.css";
import firebase from "firebase/app";
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}


const Login = () => {
    const [userData, setUserData] = useContext(UserContext);
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

    const handleGetToken = () => {
        firebase.auth().currentUser.getIdToken(true)
            .then(function (idToken) {
            }).catch(function (error) {
                // Handle error
            });
    }


    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const idToken = result.credential.idToken;
                const { email, displayName,img: photoURL } = result.user;
                const user = { email, name: displayName, img: photoURL };
                sessionStorage.setItem('user', JSON.stringify(user));
                setUserData(user);
                handleGetToken();
                history.push(from);

            }).catch((error) => {
                const newUserInfo = {}
                newUserInfo.error = error.message;
                sessionStorage.setItem('user', JSON.stringify(newUserInfo));

            });

    }


    // Handaling Value change of Input fields
    const handleChange = (event) => {
        let isFieldValid = true;
        let isPasswordMatched = false;


        if (event.target.name === 'name') {
            isFieldValid = true;
        }

        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }

        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(event.target.value)
            isFieldValid = isPasswordValid && isPasswordHasNumber;
        }
        if (newUser && event.target.name === 'confirmPassword') {
            if (event.target.value === user.password) {
                isPasswordMatched = true;
                const isPasswordValid = event.target.value.length > 6;
                const isPasswordHasNumber = /\d{1}/.test(event.target.value)
                isFieldValid = isPasswordMatched && isPasswordValid && isPasswordHasNumber;
            }
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
                    const newUserInfo = { email, name: displayName };
                    newUserInfo.name = user.name;
                    newUserInfo.error = '';
                    sessionStorage.setItem('user', JSON.stringify(newUserInfo));
                    alert('SignUp successfully completed 😍')
                    updateUserName(user.name);
                    history.push(from);

                })
                .catch((error) => {
                    const newUserInfo = {};
                    newUserInfo.error = error.message;
                    sessionStorage.setItem('user', JSON.stringify(newUserInfo));
                    alert(`${error.message}`)

                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {

                    const { email, displayName } = res.user;
                    const newUserInfo = { email, name: displayName };
                    sessionStorage.setItem('user', JSON.stringify(newUserInfo));
                    newUserInfo.error = '';
                    alert("login successful 😍")
                    history.replace(from)

                })
                .catch((error) => {
                    const newUserInfo = {};
                    newUserInfo.error = error.message;
                    sessionStorage.setItem('user', JSON.stringify(newUserInfo));
                    alert(`${error.message}`)
                });
        }
        event.preventDefault();
    }

    const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
        }).catch(function (error) {
        });
    }



    return (
        <div className="card-container">
            <div className="sign-card">
                <div className="img-div">
                    {
                        newUser ? <img src={signUp} alt="" /> : <img src={signIn} alt="" />

                    }
                    {
                        newUser ? <button onClick={() => setNewUser(!newUser)}> Already have an account ? </button> :
                            <button onClick={() => setNewUser(!newUser)}> Create an account ? </button>
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
                                    user.confirmPassword !== user.password && <p style={{ color: "red" }}>Passwords are not same</p>
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


                    </div>

                    {
                        !newUser &&
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