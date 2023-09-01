import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function GithubInitiator() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const durl = searchParams.get("durl");

    if (durl) {
      localStorage.setItem("durl", durl);
    }
  }, [searchParams]);

  return (
    <div>
      <a
        href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_GH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GH_REDIRECT_URI}`}
      >
        Sign in with Github
      </a>
    </div>
  );
}

export default GithubInitiator;
