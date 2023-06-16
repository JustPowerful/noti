import React, { useState, useEffect } from "react";
import { axiosPrivate } from "../../apis/AxiosPrivate";
import { Redirect } from "react-router-dom";

interface auth_params {
  element: React.ReactElement;
  enableRedirect?: boolean;
  redirectLink?: string;
  noAuth?: boolean; // this is to check if there's no auth
}

export default function RequireAuth({
  element,
  enableRedirect,
  redirectLink,
  noAuth,
}: auth_params) {
  const [isLogged, setIsLogged] = useState<boolean | string>("unknown");
  async function checkAuth() {
    try {
      const { data } = await axiosPrivate.post("/auth/check");
      data && setIsLogged(data.success);
    } catch (error) {
      error && setIsLogged(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  if (noAuth) {
    if (isLogged !== "nothing") {
      if (isLogged === false) {
        return element;
      }
    }
  } else {
    if (isLogged !== "nothing") {
      if (isLogged === true) {
        return element;
      } else {
        // if redirect is enabled
        if (enableRedirect) {
          return redirectLink && <Redirect to={redirectLink} />;
        }
      }
    }
  }
}
