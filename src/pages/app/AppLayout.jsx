import Map from "../../components/app_map/Map";
import Sidebar from "../../components/app_sidebar/Sidebar";
import User from "../../components/app_user/User";
import ProtectedRoute from "./ProtectedRoute";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <ProtectedRoute>
      <div className={styles.app}>
        <Sidebar />
        <Map />
        <User />
      </div>
    </ProtectedRoute>
  );
}

export default AppLayout;
