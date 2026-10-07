
import {  RouterProvider } from "react-router-dom";
import AppRoutes from "./app/routes";



function App() {
  return (
    <>
      <RouterProvider router={AppRoutes} />
    </>
  );
}

export default App;
