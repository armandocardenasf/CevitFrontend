import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../scenes/global/SideBar";
import Topbar from "../scenes/global/TopBar";

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          <Box mx="30px" mb="30px">
            <Outlet />
          </Box>
        </main>
      </div>
    </>
  );
};
export default Layout;
