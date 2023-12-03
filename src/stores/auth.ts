import React, { createContext } from "react";

export type AdminSession = {
  token?: string;
  expiresAt?: number;
};

export type AdminAuthContextType = {
  session: AdminSession;
  setSession?: React.Dispatch<React.SetStateAction<AdminSession>>;
};

export const AdminAuthContext = createContext<AdminAuthContextType>({ session: {} });
