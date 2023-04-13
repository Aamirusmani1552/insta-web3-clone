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

  return { removeUser, getUser, getItem, setUser, setItem };
};

export default useLocalStorage;
