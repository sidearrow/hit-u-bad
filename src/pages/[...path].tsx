import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { parseMarkdown, MarkdownParseResponse } from '../markdownParser';
import { Layout } from '../components/Layout';
import { Container } from '../components/Container';
import { AuthGuard } from '../components/AuthGuard';
import { SantamaPageTemplate } from '../templates/SantamaPageTemplate';
import { MizutoriPageTemplate } from '../templates/MizutoriPageTemplate';

const PATHS = [
  'about',
  'member',
  'schedule',
  'santama',
  'mizutori',
  'tournaments',
  'result/league',
  'result/tosho',
  'result/sansho',
];

type Props = MarkdownParseResponse & { path: string; isAuth: boolean };

const TemplateDispatcher: React.FC<{ path: string; html: string }> = ({
  path,
  html,
}) => {
  if (path === 'santama') {
    return (
      <SantamaPageTemplate>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </SantamaPageTemplate>
    );
  }

  if (path === 'mizutori') {
    return <MizutoriPageTemplate />;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

const Component: React.FC<Props> = ({
  title,
  description,
  html,
  breadcrumbs,
  path,
  isAuth,
}) => {
  return (
    <Layout title={title} description={description} breadcrumbs={breadcrumbs}>
      <Container>
        <div className="pt-8 pb-16">
          <AuthGuard isAuthRequired={isAuth}>
            <div className="main-content">
              <TemplateDispatcher html={html} path={path} />
            </div>
          </AuthGuard>
        </div>
      </Container>
    </Layout>
  );
};

export default Component;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: PATHS.map((v) => ({ params: { path: v.split('/') } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  if (ctx.params === undefined || !(ctx.params.path instanceof Array)) {
    throw new Error();
  }
  const path = ctx.params.path.join('/');
  const res = parseMarkdown(`${path}.md`);

  return {
    props: { ...res, ...{ path: path, isAuth: path === 'mizutori' } },
  };
};
