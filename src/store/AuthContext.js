import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  role: "",
  fullName: "",
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  // const storedAccountType = localStorage.getItem("accountType");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.clear();
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const retrieveStoredUsername = () => {
  const storedUsername = localStorage.getItem("fullName");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.clear();
    return null;
  }

  return storedUsername;
};

const retrieveStoredLoggedIn = () => {
  const storedLoggedIn = localStorage.getItem("loggedIn");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.clear();
    return false;
  }
  return storedLoggedIn;
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  const usernameData = retrieveStoredUsername();
  const loggedInData = retrieveStoredLoggedIn();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  let initialUsername;
  let loggedIn;
  if (usernameData) {
    initialUsername = usernameData;
  }

  if (loggedInData) {
    loggedIn = loggedInData;
  }

  const [username, setUsername] = useState(initialUsername);
  const [isLoggedIn, setLoggedIn] = useState(loggedIn);

  const logoutHandler = useCallback(() => {
    setToken(null);
    setLoggedIn(false);
    setUsername(null);
    localStorage.clear();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, role, usernameParam) => {
    setToken(token);
    setLoggedIn(true);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("role", role);
    localStorage.setItem("fullName", usernameParam);
    localStorage.setItem("loggedIn", true);
    setUsername(usernameParam);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const updateUsername = (usernameParam) => {
    setUsername(usernameParam);
    localStorage.setItem("fullName", usernameParam);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    updateUsername: updateUsername,
    login: loginHandler,
    logout: logoutHandler,
    role: localStorage.getItem("role"),
    username: username,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
