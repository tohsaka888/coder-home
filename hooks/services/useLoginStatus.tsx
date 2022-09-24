import { loginUrl } from "config/baseUrl";
import React, { useCallback } from "react";
import useSWR from "swr";

function useLoginStatus() {
  const getLoginStatus = useCallback(async (url: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }, []);

  const { data, error } = useSWR(
    `${loginUrl}/api/login/status`,
    getLoginStatus
  );

  return <div>useLoginStatus</div>;
}

export default useLoginStatus;
