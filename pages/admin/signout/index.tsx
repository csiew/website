import { useRouter } from "next/router";
import React, { useEffect } from "react";
import handleSignout from "../../../firebase/signout";

const Signout = () => {
  const router = useRouter();

  const handleSignoutWrapper = async () => {
    await handleSignout();
    router.push("/admin/login");
  };

  useEffect(() => {
    handleSignoutWrapper();
  }, []);

  return <p>Signing out...</p>;
};

export default Signout;
