import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useSearchParams } from "react-router-dom";

import logo from "../static/Cal Commit Logo.svg";
import { useForm } from "react-hook-form";
import { fetchApi } from "../utils/fetchApi";
import { useContext, useState } from "react";
import AuthContext from "../store/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

export function SignUp() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const authCtx = useContext(AuthContext);

  const [searchParams] = useSearchParams();

  const submitHandler = async () => {
    setLoading(true);
    const { password, confirmPassword } = getValues();
    if (password !== confirmPassword) {
      setLoading(false);
      return setError("confirmPassword", {
        type: "nomatch",
      });
    }

    const { fullName, email, termsOfUse } = getValues();

    const response = await fetchApi("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
        confirmPassword,
        termsOfUse,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setLoading(false);
      if (data.message === "Email already exists") {
        return setError("email", {
          type: "duplicate",
        });
      } else if (data.type === "validation") {
        const field = data.message.path;
        console.log(field);

        const msg = data.message.msg;
        console.log(msg);
        return setError(field, {
          type: msg,
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

    window.location = `${localStorage.getItem(
      "referrer"
    )}sso-success?durl=${localStorage.getItem("durl")}&token=${
      data.token
    }&role=${data.role}&fullName=${data.fullName}&repPts=${
      data.reputationPoints
    }&since=${new Date(data.created_at).toDateString()}`;
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
            Sign Up
          </Typography>
          <Typography
            variant="h6"
            className="text-xl text-center font-dela-gothic text-gray-900"
          >
            for Cal Commit
          </Typography>
        </div>
        <Typography className="mt-1 font-dm-sans font-bold text-center text-gray-700">
          Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 font-dm-sans font-normal"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="mb-4 flex flex-col gap-6">
            <div>
              <Input
                size="lg"
                label="Full Name"
                className="font-dm-sans text-md caret-calcommit-orange"
                {...register("fullName", { required: true, minLength: 3 })}
                error={
                  errors.fullName?.type === "required"
                    ? true
                    : false || errors.fullName?.type === "minLength"
                    ? true
                    : false
                }
              />
              {errors.fullName?.type === "required" && (
                <p className="font-dm-sans text-red-600 text-sm">
                  <span className="font-semibold">Oops!</span> Please enter your
                  full name.
                </p>
              )}
              {errors.fullName?.type === "minLength" && (
                <p className="font-dm-sans text-red-600 text-sm">
                  <span className="font-semibold">Oops!</span> Please enter a
                  name with at least 3 characters.
                </p>
              )}
            </div>
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
              {errors.email?.type === "duplicate" && (
                <p className="font-dm-sans text-red-600 text-sm">
                  <span className="font-semibold">Oops!</span> Looks like this
                  email address is already in use. Try{" "}
                  <Link
                    to="/signin"
                    className="transition-all duration-300 ease-in-out text-red-600 font-semibold underline hover:text-red-900 hover:decoration-double"
                  >
                    signing in
                  </Link>{" "}
                  instead.
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
            </div>
            <div>
              <Input
                type="password"
                size="lg"
                label="Confirm Password"
                className="font-dm-sans text-md caret-calcommit-orange"
                {...register("confirmPassword", { required: true })}
                error={
                  errors.confirmPassword?.type === "required"
                    ? true
                    : false || errors.confirmPassword?.type === "nomatch"
                    ? true
                    : false
                }
              />
              {errors.confirmPassword?.type === "required" && (
                <p className="font-dm-sans text-red-600 text-sm">
                  <span className="font-semibold">Oops!</span> Please confirm
                  your password.
                </p>
              )}
              {errors.confirmPassword?.type === "nomatch" && (
                <p className="font-dm-sans text-red-600 text-sm">
                  <span className="font-semibold">Oops!</span> Looks like your
                  passwords don't match.
                </p>
              )}
            </div>
          </div>
          <div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-dm-sans font-normal"
                >
                  I agree to the&nbsp;
                  <Link
                    to="/terms-of-use"
                    className="font-dm-sans font-semibold underline transition-all text-light-blue-700 duration-300 ease-in-out hover:text-light-blue-900 hover:decoration-double"
                  >
                    Terms of Use
                  </Link>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
              {...register("termsOfUse", { required: true })}
            />
            {errors.termsOfUse?.type === "required" && (
              <p className="font-dm-sans text-red-600 text-sm">
                <span className="font-semibold">Oops!</span> Please agree to the
                Terms of Use.
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="transition-all duration-300 ease-in-out mt-6 bg-white border-2 border-calcommit-orange text-black font-dm-sans text-lg py-2 capitalize hover:scale-105 hover:shadow-lg hover:-rotate-6 hover:bg-calcommit-orange hover:text-white"
            fullWidth
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : "Sign Up"}
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-dm-sans font-normal"
          >
            Already have an account?{" "}
            <Link
              to="/signin"
              className="transition-all duration-300 ease-in-out font-semibold text-light-blue-700 underline hover:text-light-blue-900 hover:decoration-double"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </div>
    </Card>
  );
}
