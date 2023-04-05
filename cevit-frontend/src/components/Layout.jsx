import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Router from "../routes/Router";
import Sidebar from "../scenes/global/SideBar";
import Topbar from "../scenes/global/TopBar";
import Copyright from "./Copyright";

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          <Outlet />
          <Copyright sx={{ mt: 8, mb: 10 }} />
        </main>
      </div>
    </>
  );
};
export default Layout;
