import React from 'react';
import { Layout } from '../components/Layout';
import { AuthGuard } from '../components/AuthGuard';
import { FirebaseStorageLink } from '../components/FirebaseStorageLink';
import { Button } from '../components/Button';
import { GetStaticProps } from 'next';
import content from '../../content/mizutori.json';
import { firebaseAuthClient } from '../firebaseClient';
import { useRouter } from 'next/router';

type Content = {
  title: string;
  description: string;
  obmessage: {
    title: string;
    content: {
      year: number;
      files: {
        fileName: string;
        viewName: string;
      }[];
    }[];
  };
};

const ObMessage: React.FC<{ obmessages: Content['obmessage']['content'] }> = ({
  obmessages,
}) => {
  return (
    <>
      {obmessages.map((eachYear, i) => (
        <React.Fragment key={i}>
          <h3 className="h3">{eachYear.year} 年</h3>
          <section>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {eachYear.files.map((f, i) => (
                <FirebaseStorageLink
                  storagePath={`/mizutori/obmessage/${eachYear.year}/${f.fileName}`}
                  key={i}
                >
                  <Button color="gray">{f.viewName}</Button>
                </FirebaseStorageLink>
              ))}
            </div>
          </section>
        </React.Fragment>
      ))}
    </>
  );
};

const MainComponent: React.FC<{ content: Content }> = ({ content }) => {
  const title = content.title;
  const description = content.description;
  const obmessage = content.obmessage;
  const router = useRouter();

  const logoutHandler = () => {
    (async () => {
      await firebaseAuthClient.logout();
      router.push('/mizutori-login');
    })();
  };

  return (
    <Layout title={title} description={description}>
      <AuthGuard>
        <div className="text-right">
          <button onClick={logoutHandler}>ログアウト</button>
        </div>
        <section className="mt-4">
          <FirebaseStorageLink storagePath="/mizutori/mizutorikai-kaisoku.pdf">
            <Button color="gray">みずとり会会則</Button>
          </FirebaseStorageLink>
        </section>
        <h2 className="h2">{obmessage.title}</h2>
        <ObMessage obmessages={obmessage.content} />
      </AuthGuard>
    </Layout>
  );
};

const PageComponent: React.FC<{ content: Content }> = ({ content }) => {
  return <MainComponent content={content} />;
};

export const getStaticProps: GetStaticProps<{
  content: Content;
}> = async () => {
  return { props: { content: content } };
};

export default PageComponent;
