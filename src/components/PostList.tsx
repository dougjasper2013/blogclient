'use client';
import { useQuery } from '@tanstack/react-query';

import Link from 'next/link';
import {
  getAllPosts,
  getFilteredPosts,
} from '@/data/queries';

export function PostList({
  criteria,
}: {
  criteria: string | string[] | undefined;
}) {
  // const resolvedPosts =
  //   typeof criteria === 'string'
  //     ? await getFilteredPosts(criteria)
  //     : await getAllPosts();

  const { data: resolvedPosts } = useQuery({
    queryKey: ['posts', criteria],
    queryFn: () => {
      if (typeof criteria == 'string') {
        return getFilteredPosts(criteria);
      }
      return getAllPosts();
    },
  });

  return (
    <ul>
      {resolvedPosts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            {post.title}
          </Link>
          <p>{post.description}</p>
        </li>
      ))}
    </ul>
  );
}
