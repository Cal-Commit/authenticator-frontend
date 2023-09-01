import { Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import GithubInitiator from "./components/GithubInitiator";
import GHOauth from "./components/GHOauth";
import GHAdditionalInfo from "./components/GHAdditionalInfo";
import Landing from "./components/Landing";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gradient-to-b from-deep-orange-50 via-deep-orange-100/60 to-deep-orange-50">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/github" element={<GithubInitiator />} />
          <Route path="/oauth-gh" element={<GHOauth />} />
          <Route path="/auth/gh-info" element={<GHAdditionalInfo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
