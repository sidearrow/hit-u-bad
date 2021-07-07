import React from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'components/Layout';
import { content } from 'content';
import { MemberPageData } from 'models';
import { microCms } from 'microCMS';
import { MemberPage } from 'components/pages/MemberPage';

type PageProps = {
  data: MemberPageData;
};

const PageComponent: React.FC<PageProps> = ({ data }) => {
  const title = content.pages.member.title;
  const description = content.pages.member.description;

  return (
    <Layout title={title} description={description}>
      <MemberPage memberPageData={data} />
    </Layout>
  );
};

export default PageComponent;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const memberPageData = (await microCms.getContent(
    'member'
  )) as PageProps['data'];
  return { props: { data: memberPageData } };
};
