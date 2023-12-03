import React, { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { AdminAuthContext } from "../../stores/auth";

export default function AdminLogout() {
  const router = useRouter();
  const adminAuthContext = useContext(AdminAuthContext);
  const isMountedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      ["token", "expires_at"].map((key) => window.sessionStorage.removeItem(key));
      if (adminAuthContext.setSession) adminAuthContext.setSession({});
      router.push("/admin/login");
    }
  }, []);

  return <></>;
}
