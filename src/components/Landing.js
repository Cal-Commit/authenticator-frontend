import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import gh from "../static/GithubLogo-light.svg";
import logo from "../static/Cal Commit Logo.svg";

function Landing() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    localStorage.setItem("referrer", document.referrer);
    localStorage.setItem("durl", searchParams.get("durl"));
  }, [searchParams]);

  return (
    <div className="overflow-y-hidden h-full w-full bg-[#5B7C99]">
      <Card
        color="transparent"
        className={`hidden md:flex flex-col justify-center items-center h-full w-full`}
      >
        <div className="flex items-center justify-center mb-11">
          <img
            src={logo}
            alt="Cal Commit"
            className="w-28 border-4 border-calcommit-orange bg-white rounded-full"
          />
          <Typography className="font-dela-gothic text-4xl ml-3 text-white">
            Cal Commit
          </Typography>
        </div>
        <div className="grid">
          <a
            href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_GH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GH_REDIRECT_URI}`}
            className="transition-all duration-300 ease-in-out flex items-center bg-black rounded-xl text-white py-3 px-2 shadow-sm hover:scale-105 hover:shadow-lg"
          >
            <img src={gh} className="h-7 w-7 mr-2" alt="Github" /> Sign in with
            Github
          </a>
        </div>
        <div className="flex items-center justify-center mt-4 w-full">
          <div className="h-px bg-gray-300 w-56"></div>
          <p className="mx-2 text-gray-300">OR</p>
          <div className="h-px bg-gray-300 w-56"></div>
        </div>
        <div className="grid grid-cols-2 gap-x-3 mt-3">
          <Link
            to="/auth/signup"
            className="transition-all text-center shadow-lg duration-300 ease-in-out rounded-xl bg-calcommit-orange text-white font-bold text-lg px-2 py-3 font-dm-sans border-2 border-calcommit-orange hover:scale-105 hover:-rotate-12 hover:bg-white hover:text-black"
          >
            Sign Up with Cal Commit
          </Link>
          <Link
            to="/auth/signin"
            className="transition-all text-center shadow-lg duration-300 ease-in-out rounded-xl bg-white text-black font-bold text-lg px-2 py-3 font-dm-sans border-2 border-calcommit-orange hover:scale-105 hover:rotate-12 hover:bg-calcommit-orange hover:text-white"
          >
            Sign in with Cal Commit
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Landing;
