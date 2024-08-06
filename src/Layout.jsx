import { Outlet } from "react-router-dom";
import BasicMenu from "./Menu.jsx";

const Layout = () => {
  return (
    <div>
      <BasicMenu />
      <Outlet />
    </div>
  );
};

export default Layout;
