import React from "react";
import PaginationSection from "../PaginationSection";
import TestHeader from "@/components/common/TestHeader";
import PartTwoQuestion from "./PartTwoQuestion";

const ListeningPartTwo = () => {
  return (
    <div className="min-h-screen w-full ">
      <TestHeader durationInSeconds={60} onExit={"/listening"} />
      <PartTwoQuestion />

      {/* --- Footer Pagination (Imported Component) --- */}
      <PaginationSection/>
    </div>
  );
};

export default ListeningPartTwo;
