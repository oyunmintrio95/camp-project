import { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Nav from "./components/Nav";
import Error from "./components/Error";
import AuthContext from "./context/AuthContext";
import Login from "./components/Login";

import { refreshToken, logout } from "./services/authAPI";
import SignUpForm from "./components/Signup";
import SignUp from "./components/Signup";
import SearchCampsite from "./components/campsite/SearchCampsite";
import CampsiteDetail from "./components/campsite/CampsiteDetail";

const TIMEOUT_MILLISECONDS = 14 * 60 * 1000;

function App() {
  const [user, setUser] = useState();
  const [initialized, setInitialized] = useState(false);
  
  const resetUser = useCallback(() => {
    refreshToken()
      .then((user) => {
        setUser(user);
        setTimeout(resetUser, TIMEOUT_MILLISECONDS);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setInitialized(true));
  }, []);

  useEffect(() => {
    resetUser();
  }, [resetUser]);

  const auth = {
    user: user,
    handleLoggedIn(user) {
      setUser(user);
      setTimeout(resetUser, TIMEOUT_MILLISECONDS);
    },
    hasAuthority(authority) {
      return user?.authorities.includes(authority);
    },
    logout() {
      logout();
      setUser(null);
    },
  };

  if (!initialized) {
    return null;
  }

  const renderWithAuthority = (Component, ...authorities) => {
    for (let authority of authorities) {
      if (auth.hasAuthority(authority)) {
        return <Component />;
      }
    }
    return <Error />;
  };
  return (
    <>
      <AuthContext.Provider value={auth}>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />}/>

            <Route path="/campsite" element={<SearchCampsite/>} />
            <Route path="/campsite/detail/:locationId" element={<CampsiteDetail/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
