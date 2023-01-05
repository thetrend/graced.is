import request from 'graphql-request';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IPost } from './Posts';
import NotFound from '../NotFound';
import RichTextRenderer from './RichTextRenderer';
import dayjs from 'dayjs';

export interface IPage {
  content: string,
  publishedAt: string,
  updatedAt: string,
  title: string,
  slug: string,
  id: string,
};

const POST_QUERY = `
query getPost($slug: String!) {
  post(where: {slug: $slug}, stage: PUBLISHED) {
    id
    content {
      raw
    }
    title
    publishedAt
    updatedAt
    title
    slug
  }
}
`;

const PAGE_QUERY = `
query getPage($slug: String!) {
  page(where: {slug: $slug}, stage: PUBLISHED) {
    id
    content {
      raw
    }
    publishedAt
    updatedAt
    title
    slug
  }
}
`;

const PostOrPage = () => {
  const location = useLocation();
  const { slug } = useParams();
  const path: string = location.pathname.split('/').filter(pageType => pageType !== slug)[1];

  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<IPost | IPage>();

  const QUERY = path === 'post' ? POST_QUERY : PAGE_QUERY;
  useEffect(() => {
    const fetchContent = async () => {
      const data = await request(
        import.meta.env.VITE_HYGRAPH_API,
        QUERY,
        { slug }
      );
      setContent(data.page ?? data.post);
      setLoading(!loading);
    };
    fetchContent();
  }, []);

  if (!content && !loading) {
    return <NotFound />;
  }

  return (
    <>
      {loading && 'Loading...'}
      <h2>{!loading && content && content.title}</h2>
      {content && <RichTextRenderer content={content.content.raw} />}
      {path === 'post' && content && 
        <div style={{marginTop: '60px', fontSize: 'small', fontStyle: 'italic', fontWeight: 'normal'}}>
          Posted on {
            dayjs(content.publishedAt).format('DD MMM YYYY[ at ]h:mma[ ET]')
          }.
        </div>
      }
    </>
  );
};

export default PostOrPage;