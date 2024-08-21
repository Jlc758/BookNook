import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

const Layout = () => {
  return (
    <div>
      <Navigation />

      <Outlet style={{ display: "flex" }} />
    </div>
  );
};

export default Layout;
