import Dashboard from "@/components/admin/Dashboard";
import AdminLayout from "@/layout/AdminLayout";
import AuthLayout from "@/layout/AuthLayout";
import Layout from "@/layout/Layout";
import ListeningLayout from "@/layout/ListeningLayout";
import AuthStart from "@/pages/authPages/AuthStart";
import ForgotPassword from "@/pages/authPages/ForgotPassword";
import LogInPage from "@/pages/authPages/LogInPage";
import ResetPassword from "@/pages/authPages/ResetPassword";
import SignInpage from "@/pages/authPages/SignInpage";
import VerifyOtp from "@/pages/authPages/VerifyOtp";
import Home from "@/pages/home/Home";
import IELTSPage from "@/pages/ieltsPage/IELTSPage";
import IELTSAcademicListening from "@/pages/ListeningAllPages/IELTSAcademicListening";
import ListeningPartFour from "@/pages/ListeningAllPages/ListeningPartFour";
import ListeningPartOne from "@/pages/ListeningAllPages/partOne/ListeningPartOne";
import ListeningPartThree from "@/pages/ListeningAllPages/ListeningPartThree";
import ListeningPartTwo from "@/pages/ListeningAllPages/partTwo/ListeningPartTwo";

import { createBrowserRouter } from "react-router-dom";
import IELTSAcademicWriting from "@/pages/writingPages/IELTSAcademicWriting";
import WritingLayout from "@/layout/WritingLayout";
import WritingPartOne from "@/pages/writingPages/partOne/WritingPartOne";
import WritingPartTwo from "@/pages/writingPages/partTwo/WritingPartTwo";
import SpeakingLayout from "@/layout/SpeakingLayout";
import IELTSAcademicSpeaking from "@/pages/speakingPages/IELTSAcademicSpeaking";
import SpeakingPartOneMain from "@/pages/speakingPages/partOne/SpeakingPartOneMain";
import SpeakingPartTwoMain from "@/pages/speakingPages/partTwo/SpeakingPartTwoMain";

const router = createBrowserRouter([
  // Auth routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <AuthStart /> },
      { path: "signin", element: <SignInpage /> },
      { path: "login", element: <LogInPage /> },
      { path: "verify-otp", element: <VerifyOtp /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },

  // Public routes
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "ielts", element: <IELTSPage /> },

    ],
  },
  
  // Listening routes
  {
    path: "/listening",
    element: <ListeningLayout />,
    children: [
      { index: true, element: <IELTSAcademicListening /> },
      { path: "part1", element: <ListeningPartOne /> },
      { path: "part2", element: <ListeningPartTwo /> },
      { path: "part3", element: <ListeningPartThree /> },
      { path: "part4", element: <ListeningPartFour /> },
    ],
  },
//Writing routes
{
  path: "/writing",
  element: <WritingLayout />,
  children: [
    { index: true, element: <IELTSAcademicWriting /> },
    { path: "part1", element: <WritingPartOne /> },
    { path: "part2", element: <WritingPartTwo/> },

  ],
},
//speaking routes can be added here
{
  path: "/speaking",
  element: <SpeakingLayout />,
  children: [
    { index: true, element: <IELTSAcademicSpeaking /> },
    { path: "part1", element: <SpeakingPartOneMain /> },
    { path: "part2", element: <SpeakingPartTwoMain /> },

  ],
},
  // Admin routes
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
    ],
  },
]);

export default router;
