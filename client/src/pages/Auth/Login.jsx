import { useContext, useState } from "react"
import AuthLayout from "../../components/layouts/AuthLayout"
import Input from "../../components/Inputs/Input";
import { Link, useNavigate} from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/userContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate()


  //handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //login api call

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
        },
      { withCredentials: true });
      const { data } = response;
      const { accessToken, user } = data.data;

      if (accessToken) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        updateUser(user);
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }

  };


  return (
    <AuthLayout>
    <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
      <h1 className="text-xl font-semibold text-black">Welcome Back</h1>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to log in</p>
    

    <form onSubmit={handleLogin}>
      <Input
      value={email}
      onChange={({ target }) => setEmail(target.value)}
      label="Email Address"
      placeholder="john@example.com"
      type="text"
      />
      <Input
      value={password}
      onChange={({ target }) => setPassword(target.value)}
      label="Password"
      placeholder="Min 8 Characters"
      type="password"
      />

      {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

      <button type="submit" className="btn-primary">
        LOGIN
      </button>

      <p className="text-[13px] text-slate-800 mt-3">
        Don't have an account?{" "}
        <Link className="font-medium text-primary underline" to="/signup">
        SignUp
        </Link>
      </p>
    </form>
    
    </div>
    </AuthLayout>
  )
}

export default Login
