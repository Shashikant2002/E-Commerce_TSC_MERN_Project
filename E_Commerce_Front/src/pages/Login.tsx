import { useEffect, useState } from "react";
import BreadCrum from "../components/BreadCrum";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../config";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [passEye, setPassEye] = useState<boolean>(false);
  const [loginRegister, setLoginRegister] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const navigateRegister = () => {
    setLoginRegister((prev) => !prev);
  };


  const userData = useSelector((state: RootState) => state.userSlice)
  const navigate = useNavigate()

  useEffect(() => {
    if (userData.auth) {
      navigate("/")
    }
  }, [userData.auth]);


  // Register Start

  const [regData, setRegData] = useState({
    user_name: "",
    email: "",
    gender: "",
    dob: "",
    password: "",
    confPassword: "",
  });

  const regOnchangeHandaler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  const submitRegisterHandaler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log("regData", regData);
    setLoading(true);
    try {

      if (
        !regData.user_name ||
        !regData.dob ||
        !regData.confPassword ||
        !regData.email ||
        !regData.password ||
        !regData.gender
      ) {
        setLoading(false);
        return toast.error("Please Fill All The Required Fields !!");
      }

      if (regData.password !== regData.confPassword) {
        setLoading(false);
        return toast.error("Password And Confirm Password is Not Match !!");
      }

      const url: string = `${baseUrl}/api/v1/user/register`;
      const res = await axios.post(
        url,
        {
          user_name: regData.user_name,
          email: regData.email,
          gender: regData.gender,
          dob: regData.dob,
          password: regData.password,
        },
        { withCredentials: true }
      );

      console.log(res);


      if (res.data.success == true) {
        setLoading(false);
        toast.success(res.data.message)
        setRegData({
          user_name: "",
          email: "",
          gender: "",
          dob: "",
          password: "",
          confPassword: "",
        })

        setLoginRegister(true)

      } else {
        setLoading(false);
        toast.error(res.data.message)
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Register End

  // Login Start
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const loginOnchangeHandaler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submitLoginHandaler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {

      if (

        !loginData.email ||
        !loginData.password
      ) {
        setLoading(false);
        return toast.error("Please Fill All The Required Fields !!");
      }

      const url: string = `${baseUrl}/api/v1/user/login`;
      const res = await axios.post(
        url,
        {
          email: loginData.email,
          password: loginData.password,
        },
        { withCredentials: true }
      );


      if (res.data.success == true) {
        setLoading(false);
        toast.success(res.data.message)
        setLoginData({
          email: "",
          password: "",
        })

        dispatch(loginSuccess(res.data));

      } else {
        setLoading(false);
        toast.error(res.data.message)
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Login End

  return (
    <>


      {
        loading ? <Loading /> : ""
      }

      <BreadCrum title={"Login/Register"} />

      <div className="login commonSection">
        <div className="container">
          <div className="form">
            {loginRegister && (
              <>
                <form className="formLogin" onSubmit={(e) => submitLoginHandaler(e)}>
                  <h4 className="heading">Login Here</h4>
                  <div className="input flex flexDirCol">
                    <label htmlFor="email">Enter your Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your Email..."
                      autoFocus={false}
                      name={"email"}
                      onChange={(e) => loginOnchangeHandaler(e)}
                      value={loginData.email}
                    />
                  </div>
                  <div className="input flex flexDirCol password">
                    <label htmlFor="userName">Enter your Password</label>
                    <input
                      type={passEye ? "text" : "password"}
                      autoFocus={false}
                      id="userName"
                      name={"password"}
                      placeholder="Your Password..."
                      onChange={(e) => loginOnchangeHandaler(e)}
                      value={loginData.password}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setPassEye((prev) => !prev);
                      }}
                      className="iconButton"
                    >
                      {passEye ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                  <button className="globalBtn" type="submit">
                    Login Now
                  </button>
                  <p className="flex para">
                    If You Don't Have Account &nbsp;{" "}
                    <button onClick={navigateRegister} className="globalBtn_3">
                      Register Here
                    </button>
                  </p>
                </form>
              </>
            )}

            {!loginRegister && (
              <>
                <form
                  className="formRegister"
                  onSubmit={(e) => submitRegisterHandaler(e)}
                >
                  <h4 className="heading">Register Here</h4>

                  <div className="input flex flexDirCol">
                    <label htmlFor="userName">Enter your Name</label>
                    <input
                      type="text"
                      id="userName"
                      placeholder="Your Name..."
                      name="user_name"
                      value={regData.user_name}
                      onChange={(e) => regOnchangeHandaler(e)}
                    />
                  </div>

                  <div className="input flex flexDirCol">
                    <label htmlFor="email">Enter your Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your Email..."
                      name="email"
                      value={regData.email}
                      onChange={(e) => regOnchangeHandaler(e)}
                    />
                  </div>

                  <div className="input flex flexDirCol">
                    <label htmlFor="date">Enter your DOB</label>
                    <input
                      type="date"
                      id="date"
                      placeholder="Your Email..."
                      name="dob"
                      value={regData.dob}
                      onChange={(e) => regOnchangeHandaler(e)}
                    />
                  </div>

                  <div className="input flex flexDirCol">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={regData.gender}
                      onChange={(e) => regOnchangeHandaler(e)}
                    >
                      <option
                        selected={regData.gender == "" ? true : false}
                        value=""
                      >
                        Select
                      </option>
                      <option
                        selected={regData.gender == "male" ? true : false}
                        value="male"
                      >
                        Male
                      </option>
                      <option
                        selected={regData.gender == "female" ? true : false}
                        value="female"
                      >
                        Female
                      </option>
                      <option
                        selected={regData.gender == "other" ? true : false}
                        value="other"
                      >
                        Other
                      </option>
                    </select>
                  </div>

                  <div className="input flex flexDirCol">
                    <label htmlFor="date">Password</label>
                    <input
                      type="text"
                      id="date"
                      placeholder="Enter Password..."
                      name="password"
                      value={regData.password}
                      onChange={(e) => regOnchangeHandaler(e)}
                    />
                  </div>

                  <div className="input flex flexDirCol">
                    <label htmlFor="date">Confirm Password</label>
                    <input
                      type="password"
                      id="date"
                      placeholder="Enter Confirm Password..."
                      name="confPassword"
                      value={regData.confPassword}
                      onChange={(e) => regOnchangeHandaler(e)}
                    />
                  </div>

                  <button className="globalBtn" type="submit">
                    Register Now
                  </button>

                  <p className="flex para">
                    If You Have Account &nbsp;{" "}
                    <button onClick={navigateRegister} className="globalBtn_3">
                      Please Login
                    </button>
                  </p>
                </form>
              </>
            )}

            <div className="googleLogin">
              <button className="globalBtn">
                <span>
                  <FcGoogle />
                </span>{" "}
                Login/Register By Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
