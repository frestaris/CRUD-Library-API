// import React, { useState, useEffect } from "react";
// import Login from "../Login/Login";
// import Dashboard from "../Dashboard";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     setIsAuthenticated(JSON.parse(localStorage.getItem("is_authenticated")));
//   }, []);

//   return (
//     <>
//       {isAuthenticated ? (
//         <Dashboard setIsAuthenticated={setIsAuthenticated}
//          />
//       ) : (
//         <Login onLogin={setIsAuthenticated} />
//       )}
//     </>
//   );
// };

// export default App;
import React, { useState } from "react";
import Login from "../Login/Login";
import Dashboard from "../Dashboard";

const App = () => {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State to hold the current user's data
  const [currentUser, setCurrentUser] = useState(null);

  // Handle login by setting the authenticated state and current user data
  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard
          setIsAuthenticated={setIsAuthenticated}
          currentUser={currentUser}
        />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
