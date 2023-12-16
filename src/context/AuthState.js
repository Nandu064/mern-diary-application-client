import { useEffect, useState, createContext } from "react";
const AuthState = createContext();

const AuthContext = ({ children }) => {
  const [text, setText] = useState("second");
  const [isLogggedIn, setIsLogggedIn] = useState(false);
  const [editorContent, setEditorContent] = useState();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLogggedIn(isLoggedIn);
    setUserDetails(user);
  }, []);

  return (
    <AuthState.Provider
      value={{
        text,
        setText,
        isLogggedIn,
        setIsLogggedIn,
        editorContent,
        setEditorContent,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </AuthState.Provider>
  );
};
export { AuthState, AuthContext };
