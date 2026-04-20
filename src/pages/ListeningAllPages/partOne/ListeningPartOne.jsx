import TestHeader from "@/components/common/TestHeader";
import React from "react";
import IeltsInterface from "./IeltsInterface";
import PaginationSection from "../PaginationSection";

const ListeningPartOne = () => {
  return (
    <div className="min-h-screen w-full dark:bg-slate-950">
      <TestHeader durationInSeconds={60} onExit={"/listening"} />
      <IeltsInterface part={1} />

      {/* --- Footer Pagination (Imported Component) --- */}
      <PaginationSection />
    </div>
  );
};

export default ListeningPartOne;
