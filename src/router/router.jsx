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
import StudentDashboardLayout from "@/layout/StudentDashboardLayout";
import StudentDashboard from "@/pages/stundetDashboard/StudentDashboard";
import StudentIELTS from "@/pages/stundetDashboard/StudentIELTS";

import StudentIeltsReading from "@/pages/stundetDashboard/allIeltsCourse/StudentIeltsReading";
import StudentIeltsWriting from "@/pages/stundetDashboard/allIeltsCourse/StudentIeltsWriting";
import StudentIeltsSpeaking from "@/pages/stundetDashboard/allIeltsCourse/StudentIeltsSpeaking";
import StudentIeltsListening from "@/pages/stundetDashboard/allIeltsCourse/StudentIeltsListening";
import StudentPteCourse from "@/pages/stundetDashboard/pte/StudentPteCourse";
import StudentClassRoom from "@/pages/stundetDashboard/classroom/StudentClassRoom";
import StudentScoreDashboard from "@/pages/stundetDashboard/score/StudentScoreDashboard";
import ReadingLayout from "@/layout/ReadingLayout";
import IELTSAcademicReading from "@/pages/readingPage/IELTSAcademicReading";
import ReadingPartOneMain from "@/pages/readingPage/partOne/ReadingPartOneMain";
import ReadingPartTwoMain from "@/pages/readingPage/partTwo/ReadingPartTwoMain";
import ClassroomLayout from "@/layout/ClassroomLayout";
import Register from "@/pages/classroomDashboard/register/Register";
import TeacherDashboard from "@/pages/classroomDashboard/teacherClassRoom/TeacherDashboard";
import Exams from "@/pages/classroomDashboard/teacherClassRoom/Exams";
import StudentList from "@/pages/classroomDashboard/teacherClassRoom/StudentList";
import SelectExamType from "@/pages/classroomDashboard/teacherClassRoom/SelectExamType";
import ChooseExamList from "@/pages/classroomDashboard/teacherClassRoom/ChooseExamList";
import ExamStartCountdown from "@/pages/classroomDashboard/teacherClassRoom/ExamStartCountdown";
import ExamSuccessfullyCompleted from "@/pages/classroomDashboard/teacherClassRoom/ExamSuccessfullyCompleted";
import GradingProgess from "@/pages/classroomDashboard/teacherClassRoom/GradingProgess";
import StudentsResults from "@/pages/classroomDashboard/teacherClassRoom/StudentsResults";
import ChooseExamListPTE from "@/pages/classroomDashboard/teacherClassRoom/ChooseExamListPTE";
import StudentClassroomLayout from "@/layout/StudentClassroomLayout";
import ExamTime from "@/pages/classroomDashboard/studentClassRoom/ExamTime";
import Report from "@/pages/classroomDashboard/studentClassRoom/Report";
import ExamHistory from "@/pages/classroomDashboard/studentClassRoom/ExamHistory";
import SpeakingWritingPTELayout from "@/layout/PTE/SpeakingWritingPTELayout";
import PTEHomePage from "@/pages/ptePage/PTEHomePage";
import { pteExaminationListeningRoutes, pteExaminationReadingRoutes, pteExaminationSpeakingWrittingRoutes, pteRoutes } from "./PTErouter";

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
      { path: "pte", element: <PTEHomePage /> },

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
      { path: "part2", element: <WritingPartTwo /> },

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
  //Reading routes
  {
    path: "/reading",
    element: <ReadingLayout />,
    children: [
      { index: true, element: <IELTSAcademicReading /> },
      { path: "part1", element: <ReadingPartOneMain /> },
      { path: "part2", element: <ReadingPartTwoMain /> },

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
  {
    path: "/student-dashboard",
    element: <StudentDashboardLayout />,
    children: [
      { index: true, element: <StudentDashboard /> },
      { path: "ielts", element: <StudentIELTS /> },
      { path: "ielts/reading", element: <StudentIeltsReading /> },
      { path: "ielts/writing", element: <StudentIeltsWriting /> },
      { path: "ielts/speaking", element: <StudentIeltsSpeaking /> },
      { path: "ielts/listening", element: <StudentIeltsListening /> },
      { path: "pte", element: <StudentPteCourse /> },
      { path: "classroom", element: <StudentClassRoom /> },
      { path: "score", element: <StudentScoreDashboard /> },
    ],
  },
  // TeacherDashboard routes
  {
    path: "/classroom",
    element: <Register />,
    children: [
      { index: true, element: <Register /> },


    ],
  },
  {
    path: "/classroom/register-as-teacher",
    element: <ClassroomLayout />,
    children: [
      { index: true, element: <TeacherDashboard /> },
      { path: "exams", element: <Exams /> },
      { path: "student-list", element: <StudentList /> },
      { path: "select-exam", element: <SelectExamType /> },
      { path: "choose-exam-list-ielts", element: <ChooseExamList /> },
      { path: "choose-exam-list-pte", element: <ChooseExamListPTE /> },
      { path: "exam-start", element: <ExamStartCountdown /> },
      { path: "exam-completed", element: <ExamSuccessfullyCompleted /> },
      { path: "grading", element: <GradingProgess /> },
      { path: "results", element: <StudentsResults /> },


    ],
  },
  // StudentDashboard routes
  {
    path: "/classroom/register-as-student",
    element: <StudentClassroomLayout />,
    children: [
      { index: true, element: <ExamTime /> },
      { path: "report", element: <Report /> },
      { path: "exam-history", element: <ExamHistory /> },
    ],
  },

  pteRoutes,
  pteExaminationSpeakingWrittingRoutes,
  pteExaminationReadingRoutes,
  pteExaminationListeningRoutes
]);


// PTE related routes can be added here 



export default router;
