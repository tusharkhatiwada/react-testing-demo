import React from "react";
import axios from "axios";

import AppRouter from "./routes";
import "./App.css";

axios.defaults.baseURL = "http://18.189.31.30:5000";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

function App() {
  return (
    <div className='App'>
      <AppRouter></AppRouter>
    </div>
  );
}

export default App;
