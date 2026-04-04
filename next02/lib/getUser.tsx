import React from "react";

export default async function getUser(userId: string): Promise<User> {
  console.log("fetching user:", userId);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  if (!res.ok) throw new Error("Falied to fetch user");
  return res.json();
}
