import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/app/AppLayout";
import Login from "./pages/login/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

import "./index.css";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <p>WorldWise</p>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              {/* cities/:id : Whenever the URL is .../app/cities/1234, it will run the city component */}
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            {/* Catch all the route not matched above list */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}

export default App;
