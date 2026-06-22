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
  registerUser
} from "../services/authService";

const Register = () => {

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(false);

  const [form,
    setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "student",
      leetcode: ""
    });

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await registerUser(
          form
        );

        toast.success(
          "Registration Successful"
        );

        navigate(
          "/login"
        );

      } catch {

        toast.error(
          "Registration Failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join CodeCamp"
    >

      <form
        onSubmit={
          handleSubmit
        }
      >

        <InputField
          label="Full Name"
          value={
            form.name
          }
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target
                  .value
            })
          }
        />

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

        <InputField
          label="LeetCode Username"
          value={
            form.leetcode
          }
          onChange={(e) =>
            setForm({
              ...form,
              leetcode:
                e.target
                  .value
            })
          }
        />

        <div className="mb-4">

          <label className="block text-slate-300 mb-2">
            Role
          </label>

          <select
            value={
              form.role
            }
            onChange={(e) =>
              setForm({
                ...form,
                role:
                  e.target
                    .value
              })
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
          >
            <option value="student">
              Student
            </option>

            <option value="tic">
              TIC
            </option>

          </select>

        </div>

        <button
          className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white"
        >
          {loading ?
            <LoadingSpinner />
            : "Register"}
        </button>

      </form>

      <p className="text-center text-slate-400 mt-6">

        Already have account?

        <Link
          to="/login"
          className="text-blue-500 ml-2"
        >
          Login
        </Link>

      </p>

    </AuthLayout>
  );
};

export default Register;