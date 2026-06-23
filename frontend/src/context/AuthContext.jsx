import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("currentUser");

    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // REGISTER USER
  const registerUser = async (name, email, password) => {
    try {
      const res = await fetch(
        "http://localhost:5001/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        return {
          success: true,
          message: "User registered successfully",
        };
      }

      return {
        success: false,
        message: data.message || "Registration failed",
      };
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message: "Server error",
      };
    }
  };

  // LOGIN USER
  const loginUser = async (email, password) => {
    try {
      const res = await fetch(
        "http://localhost:5001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      console.log("LOGIN DATA:", data);

      if (res.ok) {
        localStorage.setItem("token", data.token);

        const user = {
          name: data.name || "User",
          email: data.email || email,
          role: data.role || "user",
        };

        localStorage.setItem(
          "currentUser",
          JSON.stringify(user)
        );

        setCurrentUser(user);

        return {
          success: true,
          message: "User signed in successfully",
          token: data.token,
        };
      }

      return {
        success: false,
        message:
          data.message || "Invalid email or password",
      };
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message: "Server error",
      };
    }
  };

  // LOGOUT
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// CUSTOM HOOK
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};