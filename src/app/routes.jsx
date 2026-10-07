import Home from "../pages/Home";
import About from "../pages/About";
import Programs from "../pages/Programs";
import Projects from "../pages/Projects";
import News from "../pages/News";
import NewsDetails from "../pages/NewsDetails";
import Contact from "../pages/Contact";
import Donation from "../pages/Donation";

import AdminLayout from "../admin/layouts/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";
import AdminNews from "../admin/pages/AdminNews";
import AdminNewsNew from "../admin/pages/AdminNewsNew";
import AdminNewsEdit from "../admin/pages/AdminNewsEdit";

import AdminPrograms from "../admin/pages/AdminPrograms";
import AdminProgramsNew from "../admin/pages/AdminProgramsNew";
import AdminProgramsEdit from "../admin/pages/AdminProgramsEdit";

import AdminProjects from "../admin/pages/AdminProjects";
import AdminProjectsNew from "../admin/pages/AdminProjectsNew";
import AdminProjectsEdit from "../admin/pages/AdminProjectsEdit";

import AdminMassages from "../admin/pages/AdminMassages";
import AdminMassageDetails from "../admin/pages/AdminMassageDetails";

import AdminDonations from "../admin/pages/AdminDonations";
import AdminDonationDetails from "../admin/pages/AdminDonationDetails";

import Humanitarian from "../pages/programs/Humanitarian";
import CommunitySupport from "../pages/programs/CommunitySupport";
import SustainableDevelopment from "../pages/programs/SustainableDevelopment";
import YouthEmpowerment from "../pages/programs/YouthEmpowerment";

import MainLayout from "../components/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";

 const routes = [
   {
     path: "/",
     element: <MainLayout />,
     children: [
       { index:true, element: <Home /> },
       { path: "about", element: <About /> },
       { path: "programs", element: <Programs /> },
       { path: "programs/humanitarian", element: <Humanitarian /> },
       { path: "programs/community-support", element: <CommunitySupport /> },
       {
         path: "programs/sustainable-development",
         element: <SustainableDevelopment />,
       },
       { path: "programs/youth-empowerment", element: <YouthEmpowerment /> },
       { path: "projects", element: <Projects /> },
       { path: "news", element: <News /> },
       { path: "news/:id", element: <NewsDetails /> },
       { path: "contact", element: <Contact /> },
       { path: "donate", element: <Donation /> },
       { path: "*", element: <h1>Page Not Found</h1> },
     ],
   },
   {
     element: <AdminLayout />,
     children: [
       { path: "admin", element: <AdminDashboard /> },
       { path: "admin/news", element: <AdminNews /> },
       { path: "admin/news/new", element: <AdminNewsNew /> },
       { path: "admin/news/edit/:id", element: <AdminNewsEdit /> },
       { path: "admin/programs", element: <AdminPrograms /> },
       { path: "admin/programs/new", element: <AdminProgramsNew /> },
       { path: "admin/programs/edit/:id", element: <AdminProgramsEdit /> },
       { path: "admin/projects", element: <AdminProjects /> },
       { path: "admin/projects/new", element: <AdminProjectsNew /> },
       { path: "admin/projects/edit/:id", element: <AdminProjectsEdit /> },
       { path: "admin/messages", element: <AdminMassages /> },
       { path: "admin/messages/:id", element: <AdminMassageDetails /> },
       { path: "admin/donations", element: <AdminDonations /> },
       { path: "admin/donations/:id", element: <AdminDonationDetails /> },
     ],
   },
 ];

const AppRoutes = createBrowserRouter(routes, { basename: "/SalamWeb/" });

// eslint-disable-next-line react-refresh/only-export-components
export { routes };

export default AppRoutes;