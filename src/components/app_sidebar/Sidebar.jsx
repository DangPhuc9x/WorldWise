import styles from "./Sidebar.module.css";
import Logo from "../shared/Logo";
import AppNav from "./AppNav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* Source: App/AppLayout/Sidebar */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
