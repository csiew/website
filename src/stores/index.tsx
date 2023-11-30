import React, { ComponentPropsWithRef, createContext, useEffect, useState } from "react";

export type AdminSession = {
  token?: string;
  expiresAt?: number;
};

export type AdminAuthContextType = {
  session: AdminSession;
  setSession?: React.Dispatch<React.SetStateAction<AdminSession>>;
};

export const AdminAuthContext = createContext<AdminAuthContextType>({ session: {} });

export default function AppContext(props: ComponentPropsWithRef<any>) {
  const [session, setSession] = useState<AdminSession>({});

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    const expiresAt = Number(window.sessionStorage.getItem("expires_at") ?? -1);

    if (token && Date.now() < expiresAt) {
      setSession({ token, expiresAt });
    } else {
      setSession({});
    }
  }, []);

  return (
    <AdminAuthContext.Provider value={{ session, setSession }}>
      {props.children}
    </AdminAuthContext.Provider>
  );
}
