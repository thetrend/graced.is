import { RichText } from '@graphcms/rich-text-react-renderer';

const RichTextRenderer = (props: any) => {
  return <RichText content={props.content} />;
};

export default RichTextRenderer;