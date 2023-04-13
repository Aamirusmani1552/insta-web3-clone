import React from "react";

type TokenData = {
  accessToken: string;
  generatedAt: Date;
};

const useAccessToken = () => {
  const getAccessToken = (): string | null => {
    if (typeof window != "undefined") {
      const ls = window.localStorage;

      if (ls) {
        const tokenJSON = ls.getItem("CC_ACCESS_TOKEN");
        if (!tokenJSON || tokenJSON.length == 0) {
          return null;
        }

        const tokenData = JSON.parse(tokenJSON) as TokenData;
        const { generatedAt, accessToken } = tokenData;

        if (isDateMoreThanDayOld(generatedAt)) {
          removeAccessToken();
          return null;
        }

        if (accessToken) {
          return accessToken;
        }
      }
    }
    return null;
  };

  const setAccessToken = (accessToken: string) => {
    if (typeof window != "undefined") {
      const ls = window.localStorage;
      if (ls) {
        ls.setItem(
          "LH_STORAGE_KEY",
          JSON.stringify({ accessToken, generatedAt: new Date() })
        );
      }
    }
  };

  const removeAccessToken = () => {
    if (typeof window != "undefined") {
      const ls = window.localStorage;

      if (ls) {
        ls.removeItem("LH_STORAGE_KEY");
      }
    }
  };

  function isDateMoreThanDayOld(date: Date): boolean {
    // Get the current time in milliseconds
    const now = new Date().getTime();

    // Calculate the difference between the current time and the given date in milliseconds
    const diffInMilliseconds = now - new Date(date).getTime();

    // Calculate the difference in hours
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    // Return true if the difference in hours is greater than 4, false otherwise
    return diffInDays > 1;
  }

  return { getAccessToken, setAccessToken, removeAccessToken };
};

export default useAccessToken;
