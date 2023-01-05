import React, { useEffect, useState } from "react";
import { User } from "@firebase/auth";
import firebaseAppInstance from ".";

const useSession = () => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isLoggedIn = (u = user): boolean => {
    return u !== null && u !== undefined;
  };

  useEffect(() => {
    setIsLoading(true);
    firebaseAppInstance.auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, [user]);

  return { user, isLoading, isLoggedIn };
};

export default useSession;
