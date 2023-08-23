import React, { useRef, useState, useEffect } from "react";
import Header from "../../components/Header";
import man from "../../assets/login/man.svg";
import layer2 from "../../assets/login/layer2.svg";
import layer1 from "../../assets/login/layer1.svg";
import line from "../../assets/login/line.svg";
import soical from "../../assets/login/soicalMedia.svg";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import BeatLoader from "react-spinners/PulseLoader";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/city");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <BeatLoader color={"green"} />
      </div>
    );

  return (
    <section className="container mx-auto min-h-screen">
      <Header />
      <div className="flex flex-wrap my-20 mx-16 justify-between">
        <div className="w-[633px] h-auto">
          <img src={man} alt="man" />
        </div>
        <form className="flex flex-col align-start w-[330px] lg:mr-24" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold mb-4 text-start">Login here!</h2>
          <p
            ref={errRef}
            className={`text-red-500 ${errClass}`}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <input
            className="border-1 border-color rounded-md py-4  px-5 mb-3"
            placeholder="Username or Phone"
            type="text"
            id="email"
            ref={userRef}
            value={email}
            onChange={handleUserInput}
            autoComplete="true"
            required
          />
          <input
            className="border-1 border-color rounded-md py-4  px-5 mb-3"
            placeholder="Password"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            autoComplete="current-password"
            required
          />
          <p className="text-lg text-tertiory mb-4 text-end ">
            Forgot Password?
          </p>
          <button
            className="text-2xl font-bold text-white py-3 mb-5 rounded-full"
            style={{
              background:
                "linear-gradient(98.44deg, #F54874 52.42%, #EC008C 107.37%)",
              boxShadow: "0px 4px 4px 0px #00000040",
            }}
            type="submit"
          >
            Login
          </button>
          <img src={line} alt="" className="mb-5" />
          <img src={soical} alt="" className="h-14" />
        </form>
      </div>
      <div className="relative bottom-0 w-full">
        <div className="relative">
          <img
            src={layer1}
            alt="bottom"
            className="w-full absolute bottom-0 left-0"
          />
          <img src={layer2} alt="bottom" className="w-full relative z-40" />
        </div>
      </div>
    </section>
  );
};

export default Login;
