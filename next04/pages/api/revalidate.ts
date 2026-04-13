//http://localhost:3000/api/revalidate?path=/&secret=cf7ac0124b1e8ca8629e2ac870c1699d

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const path = req.query.path as string;
  await res.revalidate(path);

  return res.json({ revalidated: true });
}
