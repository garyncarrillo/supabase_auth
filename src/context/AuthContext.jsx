import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase.config";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthContextProvider= ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  async function signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error)
        throw new Error("An error happened during authentication");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function signout() {
      const { error } = await supabase.auth.signOut();
      if (error)
        throw new Error("An error happened during logout");
  }
  useEffect(()=>{
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("supabase event: ", event);
        if (session == null) {
          navigate("/login", { replace: true });
        } else {
          setUser(session?.user.user_metadata);
          console.log("User data", session?.user.user_metadata);
          navigate("/", { replace: true });
        }
      });
      return () => {
        authListener.subscription();
      };
  },[]);

    return (
        <AuthContext.Provider value={{signInWithGoogle,signout,user}}>
            {children}
        </AuthContext.Provider>
    )

};


export const UserAuth=()=>{
    return useContext(AuthContext);
}