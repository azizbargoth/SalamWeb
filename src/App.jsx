
import {  RouterProvider } from "react-router-dom";
import { AuthProvider } from "./app/AuthContext";
import AppRoutes from "./app/routes";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" newestOnTop />
      <RouterProvider router={AppRoutes} />
    </AuthProvider>
  );
}

export default App;
