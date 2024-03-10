import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useRoutes } from 'react-router-dom';
import StudentLayout from './components/Layouts/StudentLayout';
import NormalLayout from './components/Layouts/NormalLayout';
import LandingPage from './components/Pages/LandingPage';
import './style.css'
import Home from './components/Pages/Home';
import ResumeLayout from './components/Layouts/ResumeLayout';
import Personalinfo from './components/Pages/resumepages/Personalinfo';
import Experience from './components/Pages/resumepages/Experience';
import Education from './components/Pages/resumepages/Education';
import Skillpage from './components/Pages/resumepages/Skillpage';
import Projectpage from './components/Pages/resumepages/Projectpage';
import Login from './components/Pages/LoginPage';
import Register from './components/Pages/Registerpage';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Template from './components/templates/Template';
import ResumeUploader from './components/Pages/UploadResume';
import ResumeViewer from './components/Pages/ViewResumePage';
import BatchPage from './components/Pages/adminpages/BatchPage';
import StudentPage from './components/Pages/adminpages/StudentPage';
import StudentLandingPage from './components/Pages/adminpages/StudentLandingPage';
import { useEffect, useState } from 'react';
import LoginFallback from './components/Pages/LoginFallback';
import Error from './components/Pages/ErrorPage';
import StudentResumeTemplate from './components/Pages/adminpages/StudentResumeTemplate';
import BatchLandingPage from './components/Pages/adminpages/BatchLadingPage';
import MainControlPanel from './components/Pages/controlPanel/MainControlPanel';
import AdminDashboardPage from './components/Pages/adminpages/AdminDashboardPage';
import Projects from './components/Pages/adminpages/Projects';
import AdminHome from './views/AdminHome';
import AllHeader from './views/AllHeader';
function App() {
  // enabling the QueryCLient here..
  const client = new QueryClient();
  const [studentlogin, setStudentLogin] = useState(localStorage.getItem('studentlogin') === 'true');
  const [login, setLogin] = useState(localStorage.getItem('login') === 'true');
  useEffect(() => {
    if (login) {
      // If logged in, set 'login' to 'true' in localStorage
      localStorage.setItem('login', 'true');
    } else {
      localStorage.removeItem('login');
    }
    if (studentlogin) {
      // If not logged in, remove 'login' from localStorage
      localStorage.setItem('studentlogin', 'true');
    } else {
      localStorage.removeItem('studentlogin');

    }

  }, [login, studentlogin]);
  // Define your conditional routes here

  const router = createBrowserRouter([
    { path: '/', element: <Login setLogin={setLogin} login={login} setStudentLogin={setStudentLogin} studentlogin={studentlogin} /> },

    login && {
      path: '/admin',
      element: <NormalLayout setLogin={setLogin} login={login} />,
      children: [
        { index: true, element: <AdminHome /> },
        {
          path: 'students',
          element: <StudentPage />,

        },
        
        { path :'batches',element:<BatchPage/>},
        { path: ':id', element: <StudentLandingPage /> },
        {path:'projects',element:<Projects/>},
        { path: 'resume/:id', element: <StudentResumeTemplate /> },
        { path: 'batch/:id', element: <BatchLandingPage /> },
        { path :'controls',element:<MainControlPanel/>},
        ,

      ],
    },

    studentlogin && {
      path: '/student',
      element: <StudentLayout setLogin={setLogin} setStudentLogin={setStudentLogin} />,


      children: [
        { index: true, element: <LandingPage /> },
        { path: 'home', element: <Home /> },
        {
          path: 'template', element: <Template />
        },
        { path: 'uploadresume', element: <ResumeUploader /> },
        { path: 'myresume', element: <ResumeViewer /> },
        // {
        //   path: 'resume',
        //   element: <ResumeLayout />,
        //   children: [
        //     { index:true, element: <Personalinfo /> },
        //     { path: 'experience', element: <Experience /> },
        //     { path: 'education', element: <Education /> },
        //     { path: 'skills', element: <Skillpage /> },
        //     { path: 'projects', element: <Projectpage /> },
        //     {path:'*',element:<Error/>}

        //   ],
        // },
      ],
    },


    { path: '*', element: <Error /> },
  ]);

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;




