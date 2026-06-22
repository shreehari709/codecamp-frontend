import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import LoadingSpinner from "../components/LoadingSpinner";

import {
  loginUser
} from "../services/authService";

import {
  useAuth
} from "../context/AuthContext";

const Login = () => {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [loading,
    setLoading] =
    useState(false);

  const [form,
    setForm] =
    useState({
      email: "",
      password: ""
    });

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const data =
          await loginUser(form);

        const user = {
          email: form.email,
          role:
            data.role ||
            "student"
        };

        login(
          user,
          data.token
        );

        toast.success(
          "Login Successful"
        );

        navigate("/");

      } catch {

        toast.error(
          "Invalid Credentials"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue"
    >

      <form
        onSubmit={
          handleSubmit
        }
      >

        <InputField
          label="Email"
          value={
            form.email
          }
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target
                  .value
            })
          }
        />

        <InputField
          label="Password"
          type="password"
          value={
            form.password
          }
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target
                  .value
            })
          }
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-4"
        >
          {loading ?
            <LoadingSpinner />
            : "Login"}
        </button>

      </form>

      <p className="text-center text-slate-400 mt-6">

        No account?

        <Link
          to="/register"
          className="text-blue-500 ml-2"
        >
          Register
        </Link>

      </p>

    </AuthLayout>
  );
};

export default Login;