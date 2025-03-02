'use client';

import { usePosts } from '@/hooks/use-post';
import Section from '@/features/main/components/section';
import { LoadingSpinner } from '@/components/common/Loader';

const PostList = ({ page }: { page: number }) => {
  const { data, isLoading, error } = usePosts(page);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <p className='text-center text-red-500'>Failed to load resorts.</p>;
  const groupedPosts = data?.items?.reduce(
    (acc: Record<string, any[]>, post) => {
      const category = post.category_name || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(post);
      return acc;
    },
    {}
  );

  return (
    <>
      {groupedPosts &&
        Object.entries(groupedPosts).map(([category, posts]) => (
          <Section key={category} title={category} data={posts} />
        ))}
    </>
  );
};

export default PostList;
