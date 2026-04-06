import React from "react";

export default async function getUser(userId: string) {
  console.log("fetching user:", userId);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  if (!res.ok) return undefined;
  return res.json();
}
