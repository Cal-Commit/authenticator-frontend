import { Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gradient-to-b from-deep-orange-50 via-deep-orange-100/60 to-deep-orange-50">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
