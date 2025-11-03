'use client';

import { useState, useEffect } from 'react';
import { getAllPosts } from '@/lib/posts';

export function usePosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 在客户端获取文章数据
    try {
      const fetchedPosts = getAllPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { posts, loading };
}