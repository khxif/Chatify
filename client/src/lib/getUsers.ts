import { CookieValueTypes } from "cookies-next";

export const getUsers = async (token: CookieValueTypes) => {
  if (!token) return;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/user/users-for-sidebar`,
    {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  const data = await res.json();
  console.log(data);

  return data;
};
