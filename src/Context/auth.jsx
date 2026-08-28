import { createContext, useContext, useState,useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify'; 

const AuthContext =createContext();

const fakeUsers = [
  { username: "hiba", password: "67890" },
  { username: "aysha", password: "1234" },
  { username: "user2", password: "abcd" },
];


export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);

 useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login=(username,password)=>{
    const founduser=fakeUsers.find(
        (user)=>user.username===username && user.password===password
    );


    if(founduser){
        const userdata={username:founduser.username}
        setUser(userdata);
        localStorage.setItem('loggedInUser',JSON.stringify(userdata));
        toast.success("Login successful ");

    }
    else{
        toast.error("Invalid Credentials!")
    }
  };
  const logout=()=>{
    setUser(null)
    localStorage.removeItem('loggedInUser');
    toast.info("logged out successfully!");
  };

  return(
    <>

<ToastContainer
  position="top-right"
  autoClose={3000}
  theme="colored"
/><AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>


    </>
  );
};




  export const useAuth = () => useContext(AuthContext);
