import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import { useForm } from "react-hook-form";
import { fetchApi } from "../utils/fetchApi";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";

import logo from "../static/Cal Commit Logo.svg";
import LoadingSpinner from "./LoadingSpinner";

function GHAdditionalInfo() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const location = useLocation();

  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const email = location?.state?.email;

    email && setEmail(email);
  }, [location]);

  const submitHandler = async () => {
    setLoading(true);
    const fullName = getValues("fullName");
    const termsOfUse = getValues("termsOfUse");

    if (!fullName || !termsOfUse) {
      return;
    }

    const response = await fetchApi("/auth/authenticate-gh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setLoading(false);
      return console.log(data.message);
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
            Just one more step...
          </Typography>
        </div>
        <Typography className="mt-1 font-dm-sans font-bold text-center text-gray-700">
          Enter your details to complete signing up.
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
            {loading ? <LoadingSpinner /> : "Let's Go"}
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-dm-sans font-normal"
          >
            Already have an account with Cal Commit?{" "}
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

export default GHAdditionalInfo;
