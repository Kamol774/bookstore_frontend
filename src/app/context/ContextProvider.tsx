import React, { Children, ReactNode, useState } from "react"
import Cookies from "universal-cookie"
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies(); // cookies ni tekshiryapmiz
  if (!cookies.get("accesToken")) localStorage.removeItem("memberItem"); // accessToken ni tekshiryapmiz. Agar cookies mavjud bo'lmasa, localStorage ni ham o'chiradi

  const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memeberData") ? JSON.parse(localStorage.getItem("memberData") as string) : null  //agar cookies mavjud bo'lsa storage dan memberData ni olib string ga parse qiladi 
  );
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date())
  console.log("==== verify ====")
  return (<GlobalContext.Provider value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}>{children}</GlobalContext.Provider>)
};

export default ContextProvider; //buni ixtiyoriy joyda ishlatish uchun Redux ichiga wrap qilyapmiz