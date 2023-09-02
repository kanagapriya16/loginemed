import "./App.css";
import SignUp from "./Sign-Up";
import SignIn from "./SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Emed from "./emed";
function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn/>} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/get" element={<Emed />} />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
