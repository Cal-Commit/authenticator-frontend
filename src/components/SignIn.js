import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../static/Cal Commit Logo.svg";
import { useForm } from "react-hook-form";
import { fetchApi } from "../utils/fetchApi";
import { useContext, useState } from "react";
import AuthContext from "../store/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import { manageSuccess } from "../utils/manageSuccess";

export function SignIn() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const submitHandler = async () => {
    setLoading(true);
    const { email, password } = getValues();

    const response = await fetchApi("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setLoading(false);
      if (data.message === "Email doesn't exist") {
        return setError("email", {
          type: "notfound",
        });
      } else if (data.type === "validation") {
        const field = data.message.path;
        const msg = data.message.msg;
        return setError(field, {
          type: msg,
        });
      }
    }
    if (data.type === "err") {
      if (data.message === "invcred") {
        setLoading(false);
        setError("email", {
          type: "invcred",
        });
        return setError("password", {
          type: "invcred",
        });
      }
    }
    const expirationTime = new Date(new Date().setHours(23, 59, 59, 999));
    authCtx.login(
      data.token,
      expirationTime.toISOString(),
      data.role,
      data.fullName
    );
    setLoading(false);

    return manageSuccess(window, localStorage, data, navigate);
  };

  return (
    <Card
      color="transparent"
      className="hidden md:flex justify-center items-center h-full"
    >
      <div className="flex-col items-center justify-center bg-white p-6 py-9 rounded-lg shadow-lg">
        <div className="flex-col items-center">
          <div className="flex justify-center mb-3">
            <img
              src={logo}
              alt="Cal Commit"
              className="w-28 border-4 border-calcommit-orange rounded-full"
            />
          </div>
          <Typography
            variant="h4"
            className="font-dela-gothic text-3xl text-black text-center"
          >
            Sign In
          </Typography>
        </div>
        <Typography className="mt-1 font-dm-sans font-bold text-center text-gray-700">
          Enter your details to sign into Cal Commit.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 font-dm-sans font-normal"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="mb-4 flex flex-col gap-6">
            <div>
              <Input
                size="lg"
                label="Email"
                className="font-dm-sans text-md caret-calcommit-orange"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                error={
                  errors.email?.type === "required"
                    ? true
                    : false || errors.email?.type === "pattern"
                    ? true
                    : false
                }
              />
              {errors.email?.type === "required" && (
                <p className="font-dm-sans text-red-600 text-sm">
                  <span className="font-semibold">Oops!</span> Please enter an
                  email address.
                </p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="font-dm-sans text-red-600 text-sm">
                  <span className="font-semibold">Oops!</span> Please enter a
                  valid email address.
                </p>
              )}
              {errors.email?.type === "notfound" && (
                <p className="font-dm-sans text-red-600 text-sm">
                  <span className="font-semibold">Oops!</span> We couldn't find
                  an account with this email address. Try{" "}
                  <Link
                    to="/signup"
                    className="transition-all duration-300 ease-in-out text-red-600 font-semibold underline hover:text-red-900 hover:decoration-double"
                  >
                    signing up
                  </Link>{" "}
                  instead.
                </p>
              )}
              {errors.email?.type === "invcred" && (
                <p className="font-dm-sans text-red-600 text-sm">
                  <span className="font-semibold">Oops!</span> Your email or
                  password is incorrect. Please try again.
                </p>
              )}
            </div>
            <div>
              <Input
                type="password"
                size="lg"
                label="Password"
                className="font-dm-sans text-md caret-calcommit-orange"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 12,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                error={
                  errors.password?.type === "required"
                    ? true
                    : false || errors.password?.type === "minLength"
                    ? true
                    : false || errors.password?.type === "maxLength"
                    ? true
                    : false || errors.password?.type === "pattern"
                    ? true
                    : false
                }
              />
              {errors.password?.type === "required" && (
                <p className="font-dm-sans text-red-600 text-sm">
                  <span className="font-semibold">Oops!</span> Please enter a
                  password.
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="font-dm-sans text-red-600 text-sm">
                  <span className="font-semibold">Oops!</span> Please enter a
                  password with at least 8 characters.
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="font-dm-sans text-red-600 text-sm">
                  <span className="font-semibold">Oops!</span> Please enter a
                  password with at most 12 characters.
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="font-dm-sans text-red-600 text-sm">
                  <span className="font-semibold">Oops!</span> Please enter a
                  password with at least one uppercase letter, one lowercase
                  letter, one number, and one special character.
                </p>
              )}
              {errors.password?.type === "invcred" && (
                <p className="font-dm-sans text-red-600 text-sm">
                  <span className="font-semibold">Oops!</span> Your email or
                  password is incorrect. Please try again.
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="transition-all duration-300 ease-in-out mt-6 bg-white border-2 border-calcommit-orange text-black font-dm-sans text-lg py-2 capitalize hover:scale-105 hover:shadow-lg hover:-rotate-6 hover:bg-calcommit-orange hover:text-white"
            fullWidth
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : "Sign In"}
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-dm-sans font-normal"
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="transition-all duration-300 ease-in-out font-semibold text-light-blue-700 underline hover:text-light-blue-900 hover:decoration-double"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </div>
    </Card>
  );
}
