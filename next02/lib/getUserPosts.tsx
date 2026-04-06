export default async function getUserPosts(userId: string): Promise<Post[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) throw new Error("Falied to fetch user");
  return res.json();
}
