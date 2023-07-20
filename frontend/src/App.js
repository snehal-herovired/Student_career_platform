import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useRoutes } from 'react-router-dom';
import StudentLayout from './components/Layouts/StudentLayout';
import NormalLayout from './components/Layouts/NormalLayout';
import LandingPage from './components/Pages/LandingPage';
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
function App() {
  // enabling the QueryCLient here..
  const client = new QueryClient();
  
  
  // Define your conditional routes here
  const router = createBrowserRouter([
    {
      path: '/student',
      element: <StudentLayout />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: 'home', element: <Home /> },
        {
          path:'template',element:<Template/>
        },
        {path:'uploadresume',element:<ResumeUploader/>},
        {path:'myresume',element:<ResumeViewer/>},
        {
          path: 'resume',
          element: <ResumeLayout />,
          children: [
            { index:true, element: <Personalinfo /> },
            { path: 'experience', element: <Experience /> },
            { path: 'education', element: <Education /> },
            { path: 'skills', element: <Skillpage /> },
            { path: 'projects', element: <Projectpage /> },
            
          ],
        },
      ],
    },
    // Add more conditional routes if needed
    {
      path: '/',
      element: <NormalLayout />,
      children: [
        { index: true, element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'batches', element: <BatchPage /> },
        {
          path: 'students',
          element: <StudentPage />,
          
        },
        {path:':id', element: <StudentLandingPage/>}
      ],
    },
  ]);

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
