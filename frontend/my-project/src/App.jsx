import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {DashBoard} from "./assets/pages/dashboard";
import {Signin} from "./assets/pages/signin";
import {Signup} from "./assets/pages/signup";
import { SendMoney } from "./assets/pages/sendMoney";


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/dashboard" element={<DashBoard/>}></Route>
          <Route path="/send" element={<SendMoney/>}></Route>
        </Routes>
      </BrowserRouter>
        
    </div>
  )
}

export default App
