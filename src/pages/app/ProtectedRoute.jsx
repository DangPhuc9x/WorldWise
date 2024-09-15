import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/FakeAuthContext";
import { useEffect } from "react";

ProtectedRoute.propTypes = {
  children: PropTypes.any.isRequired,
};

// Wrap entile application into children prop
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  // useEffect run after the page is loaded
  // If not check condition, the page will return ERROR
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
