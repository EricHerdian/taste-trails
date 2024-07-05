import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-black ">
      <Skeleton />
    </div>
  );
};

export default Loading;
