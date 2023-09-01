import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Landing() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    localStorage.setItem("referrer", document.referrer);
    localStorage.setItem("durl", searchParams.get("durl"));
  }, []);

  return (
    <div>
      <Link to="/signup">Sign Up with Cal Commit</Link>
      <Link to="/signin">Sign in with Cal Commit</Link>
      <Link to="/github">Sign in with Github</Link>
    </div>
  );
}

export default Landing;
