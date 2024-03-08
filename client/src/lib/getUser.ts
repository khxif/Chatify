import { CookieValueTypes } from "cookies-next";

export async function getUser(token: CookieValueTypes, setUser: any) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user/verify-user`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);

    if (data.username) setUser(data);
    else setUser(null);

  } catch (error) {
    console.log(error);
    return null;
  }
}
