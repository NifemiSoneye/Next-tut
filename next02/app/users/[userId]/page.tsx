import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import UserPosts from "./components/UserPosts";
import { Suspense } from "react";
import { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";

import { notFound } from "next/navigation";
type Params = {
  params: Promise<{
    userId: string;
  }>;
};

export async function generateMetaData({ params }: Params): Promise<Metadata> {
  const { userId } = await params;
  const userData: Promise<User> = getUser(userId);
  const user: User = await userData;

  return {
    title: user.name,
    description: `This is the page of ${user.name}`,
  };
}

export default async function Userpage({ params }: Params) {
  const { userId } = await params; // ← await params first
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);

  //const [user, userPosts] = await Promise.all([userData, userPostsData]);

  const user = await userData;
  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;

  return users.map((user) => ({ userId: user.id.toString() }));
}
