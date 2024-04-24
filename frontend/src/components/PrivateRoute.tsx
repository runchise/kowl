import { ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Props {
  children: ReactElement | null;
}

interface GoogleUser {
  id: number;
  email: string;
  name: string;
  verified_email: boolean;
}

const PrivateRoute = ({ children }: Props) => {
  const [userDetails, setUserDetails] = useState<GoogleUser>();
  const accessToken = Cookies.get("access_token");

  const handleClick = () => {
    const callbackUrl = `${window.location.origin}`;
    const googleClientId = "226535953472-8gt0c7g0cmtjvmn1ljsbspht92fah8sh.apps.googleusercontent.com";
    const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile`;
    window.location.href = targetUrl;
  };

  useEffect(() => {
    if (!userDetails || !accessToken) {
      const accessTokenRegex = /access_token=([^&]+)/;
      const isMatch = window.location.href.match(accessTokenRegex);

      if (isMatch) {
        const accessToken = isMatch[1];
        Cookies.set("access_token", accessToken);
      }
    }
  }, [userDetails, accessToken]);

  const getUserDetails = async (accessToken?: string) => {
    if (accessToken) {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
      );
      const data = await response.json();
      setUserDetails(data);
    }
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (accessToken) {
      getUserDetails(accessToken);
    }
  }, []);

  if (!!accessToken && !!userDetails?.verified_email) {
    return children;
  }

  return (
    <div>
      <button onClick={handleClick}>Login with Google</button>
    </div>
  );
};

export default PrivateRoute;
