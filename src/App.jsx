
import {  RouterProvider } from "react-router-dom";
import { AuthProvider } from "./app/AuthContext";
import AppRoutes from "./app/routes";



function App() {
  return (
    <AuthProvider>
      <RouterProvider router={AppRoutes} />
    </AuthProvider>
  );
}

export default App;
