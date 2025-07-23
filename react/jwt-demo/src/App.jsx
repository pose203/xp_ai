import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/views/Home/index.jsx";
import Pay from "@/views/Pay/index.jsx";
import Login from "@/views/Login/index.jsx";
import RequireAuth from "@/components/RequireAuth/index.jsx";
import NavBar from "@/components/NavBar";

function App() {
  return (
    <>
      <NavBar/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/pay" 
            element={
              <RequireAuth>
                <Pay />
              </RequireAuth>
            } 
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
