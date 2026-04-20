import StudentDashboardInfo from "@/components/studentDashboard/StudentDashboardInfo";
import StudentDashboardSlide from "@/components/studentDashboard/StudentDashboardSlide";
import TestSection from "@/components/studentDashboard/TestSection";
import VideosSection from "@/components/studentDashboard/VideosSection";
import React from "react";

const StudentDashboard = () => {
  return (
    <div className=" flex flex-col gap-8 w-full">
      <StudentDashboardSlide />
      <StudentDashboardInfo />
      <TestSection/>
      <VideosSection/>
    </div>
  );
};

export default StudentDashboard;
