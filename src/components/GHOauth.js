import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchApi } from "../utils/fetchApi";
import AuthContext from "../store/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import { manageSuccess } from "../utils/manageSuccess";

function GHOauth() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const code = searchParams.get("code");

      const response = await fetchApi("/oauth/oauth-github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return;
      }
      localStorage.setItem("token", data.access_token);
    };

    fetchAccessToken().then(async () => {
      const response = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return;
      }
      const email = data[0].email;

      const response2 = await fetchApi("/oauth/oauth-gh-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data2 = await response2.json();

      if (!response2.ok) {
        return;
      }

      if (!data2.userExists) {
        return navigate(`/oauth/github/step-2`, {
          state: { email },
        });
      }

      const response3 = await fetchApi("/oauth/authenticate-gh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data3 = await response3.json();

      if (!response3.ok) {
        return;
      }

      const expirationTime = new Date(new Date().setHours(23, 59, 59, 999));
      authCtx.login(
        data3.token,
        expirationTime.toISOString(),
        data3.role,
        data3.fullName
      );

      return manageSuccess(window, localStorage, data3, navigate);
    });
  }, [authCtx, navigate, searchParams]);
  return (
    <div className="flex w-full h-full justify-center items-center bg-[#CFE8EF]">
      <LoadingSpinner textSize="text-xl" textWeight="font-bold" />
    </div>
  );
}

export default GHOauth;
