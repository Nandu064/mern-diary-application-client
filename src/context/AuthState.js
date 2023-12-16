import { useEffect, useState, createContext } from "react";
const AuthState = createContext();

const AuthContext = ({ children }) => {
  const [text, setText] = useState("second");
  const [isLogggedIn, setIsLogggedIn] = useState(false);
  const [editorContent, setEditorContent] = useState();

  return (
    <AuthState.Provider
      value={{
        text,
        setText,
        isLogggedIn,
        setIsLogggedIn,
        editorContent,
        setEditorContent,
      }}
    >
      {children}
    </AuthState.Provider>
  );
};
export { AuthState, AuthContext };
