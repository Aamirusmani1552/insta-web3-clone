import React from "react";

type UserData = {
  handle: string;
  profileId: number;
};

type TokenData = {
  accessToken: string;
  generatedAt: Date;
};

const useLocalStorage = () => {
  const getUser = (): UserData | null => {
    let data;

    if (typeof window !== "undefined") {
      const ls = window.localStorage;

      if (ls) {
        const dataJson = ls.getItem("user_data");
        if (dataJson) data = JSON.parse(dataJson);

        if (!data) {
          return null;
        }
      }
    }
    return data;
  };

  const getItem = (name: string): string | null => {
    let data;
    if (typeof window != undefined) {
      data = localStorage.getItem(name);
      if (data && data?.length > 0) {
        return data;
      }
    }

    return null;
  };

  const setItem = (name: string, value: string) => {
    if (typeof window != undefined) {
      localStorage.setItem(name, value);
    }
  };

  const setUser = (data: UserData) => {
    if (typeof window != "undefined") {
      const ls = window.localStorage;
      const { handle, profileId } = data;

      if (ls) {
        ls.setItem("user_data", JSON.stringify({ handle, profileId }));
      }
    }
  };

  const removeUser = () => {
    if (typeof window != "undefined") {
      const ls = window.localStorage;
      if (ls) {
        ls.removeItem("user_data");
      }
    }
  };

  const setAccessToken = (token: TokenData) => {
    if (typeof window != "undefined") {
      const ls = window.localStorage;
      ls.setItem("CC_ACCESS_TOKEN", JSON.stringify(token));
    }
  };

  const getAccessToken = (): TokenData | null => {
    let data;
    if (typeof window != "undefined") {
      let dataJson = localStorage.getItem("CC_ACCESS_TOKEN");
      if (!dataJson || dataJson.length == 0) {
        return null;
      }
      let data = JSON.parse(dataJson) as TokenData;
      if (data) {
        return data;
      }
    }
    return null;
  };

  function removeAccessToken() {
    if (typeof window != undefined) {
      const ls = window.localStorage;

      ls.removeItem("CC_ACCESS_TOKEN");
    }
  }

  return {
    removeUser,
    getUser,
    getItem,
    setUser,
    setItem,
    getAccessToken,
    setAccessToken,
    removeAccessToken,
  };
};

export default useLocalStorage;
