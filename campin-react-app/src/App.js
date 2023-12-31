import { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import UserprofileForm from "./components/userProfile/UserprofileForm";
import ReviewForm from "./components/review/ReviewForm";
import ReviewDetail from "./components/review/ReviewDetail";
import ReviewDeleteConfirm from "./components/review/ReviewDeleteConfirm";
import Home from "./Home";
import MypageMain from "./components/mypage/MypageMain";
import UserprofileDetail from "./components/userProfile/UserprofileDetail";

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
            {/* home, user login/registration */}
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />}/>

            {/* userProfile */}
            <Route path="/userprofile/add" element={user ? <UserprofileForm /> : <Navigate to="/login" replace={true} />} />
            <Route path="/userprofile/:userId" element={user ? <UserprofileDetail/>: <Navigate to="/login" replace={true} />}/>
            <Route path="/userprofile/edit/:userProfileId" element={user? <UserprofileForm />:<Navigate to="/login" replace={true} />}/>

            {/* campsites */}
            <Route path="/campsite" element={<SearchCampsite/>} />
            <Route path="/campsite/detail/:locationId" element={<CampsiteDetail/>}/>

            {/* review */}
            <Route path="/review/add" element={user? <ReviewForm/> : <Navigate to="/login" replace={true} />} />
            <Route path="/review/detail/:reviewId" element = {<ReviewDetail/>}/>
            <Route path="/review/edit/:reviewId" element={user? <ReviewForm/> : <Navigate to="/login" replace={true} />}/>
            <Route path="/review/delete/:reviewId" element={user? <ReviewDeleteConfirm/> : <Navigate to="/login" replace={true} />}/>

            {/* mypage */}
            <Route path="/mypage" element={user? <MypageMain/>: <Navigate to="/login" replace={true} />}/>

            <Route path="*" element={<Error />}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
