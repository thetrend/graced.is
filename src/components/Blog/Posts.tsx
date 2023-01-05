import request from 'graphql-request';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import RichTextRenderer from './RichTextRenderer';

export interface IPost {
  excerpt: string,
  id: string,
  slug: string,
  title: string,
  tags: string[],
  updatedAt: string,
  content: any,
  publishedAt: string,
};

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>();
  useEffect(() => {
    const fetchPosts = async () => {
      const { posts } = await request(
        import.meta.env.VITE_HYGRAPH_API,
        `
        {
          posts(stage: PUBLISHED, orderBy: updatedAt_DESC) {
            id
            excerpt
            slug
            title
            tags
            updatedAt
            content {
              raw
            }
            publishedAt
          }
        }
        `
      );

      setPosts(posts);
    };

    fetchPosts();
  }, []);
  return (
    <>
      {posts ? posts.map((post: IPost) => (
        <div key={post.id} style={{paddingBottom: '40px'}}>
          <h2>
            <Link style={{fontWeight: 'bold'}} to={`/post/${post.slug}`}>{post.title}</Link>
          </h2>
          <p>{post.excerpt} &raquo;</p>
          <span style={{fontSize: 'small', fontStyle: 'italic', fontWeight: 'normal'}}>Posted on {dayjs(post.publishedAt).format('DD MMM YYYY[ at ]h:mma[ ET]')}</span>
        </div>
      )) : 'Loading...'}
    </>
  );
};

export default Posts;