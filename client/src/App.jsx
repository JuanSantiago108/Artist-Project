
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Dashboard from "./view/Dashboard";
import UserInfo from "./view/UserInfo";
import './App.css';
import Main from "./view/Main";
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<Dashboard />} />
          <Route path="/userInfo/:id" element={<UserInfo />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
