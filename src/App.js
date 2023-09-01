import { Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import GHOauth from "./components/GHOauth";
import GHAdditionalInfo from "./components/GHAdditionalInfo";
import Landing from "./components/Landing";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gradient-to-b from-deep-orange-50 via-deep-orange-100/60 to-deep-orange-50">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/oauth/github" element={<GHOauth />} />
          <Route path="/oauth/github/step-2" element={<GHAdditionalInfo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
