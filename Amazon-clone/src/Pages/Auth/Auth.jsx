import React, { useContext, useState } from 'react'
import classes from "./Signup.module.css"
import { Link ,useNavigate,useLocation} from "react-router-dom"
import { auth } from "../../Utility/firebase"
import { DataContext } from "../../components/DataProvider/DataProvider"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {BeatLoader, ClipLoader } from "react-spinners"
import { Type } from '../../Utility/action.type'



function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signup: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);

  //  console.log(user)

  const authHandeler = async (e) => {
    e.preventDefault();

    console.log(e.target.name);

    if (e.target.name == "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
        });
    } else {
      setLoading({ ...loading, signup: true });
      createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({ ...loading, signup: false });
      });
    }
  };
  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>
      {/* form */}
      <div className={classes.login__container}>
        <h1>Sign-in</h1>
        {navStateData?.state?.msg && (
          <small style={{
            Padding: "5px,",
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}
          >
          {navStateData?.state?.msg}
          </small>
        )

        }
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            type="submit"
            onClick={authHandeler}
            name="signin"
            className={classes.login_signInbutton}
          >
            {loading.signIn ? (
              <BeatLoader color="#000">size={15}</BeatLoader>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        {/* agrremont */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          type="submit"
          name="signup"
          onClick={authHandeler}
          className={classes.login_registerButton}
        >
          {loading.signup ? (
            <BeatLoader color="#000">size={15}</BeatLoader>
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {Error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{Error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;



