import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

const DefaultLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="background no-scrollbar tw:w-full tw:h-[calc(100dvh-56px)] tw:text-white tw:overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
