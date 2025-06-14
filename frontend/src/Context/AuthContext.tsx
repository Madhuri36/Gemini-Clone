import {createContext, type ReactNode, useEffect, useState, useContext} from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from '../helpers/api-communicator';

type User ={
    name: string,
    email: string,
};

type UserAuth ={
    isLoggedIn : boolean;
        user: User | null;
    login:(email: string, password: string)=>Promise<void>;
    signup:(name: string, email: string, password: string)=>Promise<void>;
    logout: ()=>Promise<void>;
};


const AuthContext = createContext<UserAuth | null> (null);
export const AuthProvider = ({children}: {children: ReactNode}) =>{
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect (()=>{
       // Fetch if the user's cookies are valid tehn skip login 
       async function checkStatus() {
        const data = await checkAuthStatus();
        if(data){
            setUser({email: data.email, name: data.name, });
            setIsLoggedIn(true);
        }
       }
       checkStatus();
    },[]);
    const login = async (email: string, password: string) => {
        try {
          const data = await loginUser(email, password);
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        } catch (err) {
          setUser(null);
          setIsLoggedIn(false);
          throw err;
        }
      };
      
      const signup = async (name: string, email: string, password: string) => {
        try {
          const data = await signupUser(name, email, password);
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        } catch (err) {
          setUser(null);
          setIsLoggedIn(false);
          throw err;
        }
      };
      
      const logout = async () => {
        try {
          await logoutUser();
        } finally {
          setUser(null);
          setIsLoggedIn(false);
        }
      };
      


    const value = {
        user, 
        isLoggedIn, login, logout, signup,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const userAuth = () => useContext(AuthContext);