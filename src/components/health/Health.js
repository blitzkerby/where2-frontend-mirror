import React from "react";
import HealthArticleList from "./HealthArticleList";
import { Outlet } from 'react-router-dom';

const Health = () => {
  return (
    <div className="w-full py-[64px] min-h-screen bg-slate-950 font-light tracking-[-0.08em] text-white">
      <HealthArticleList />
      <Outlet />
    </div>
  );
};

export default Health;

