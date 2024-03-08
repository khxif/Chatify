import { CookieValueTypes } from "cookies-next";

export async function getMessages(token: CookieValueTypes, id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/message/get/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}
