import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from 'components/Layout';
import { AuthGuard } from 'components/AuthGuard';
import { FirebaseStorageLink } from 'components/FirebaseStorageLink';
import { Button } from 'components/Button';
import { firebaseAuthClient } from 'firebaseClient';
import { OBMessage } from 'models';
import { content } from 'content';

const { obMessages } = content;

const ObMessage: React.FC<{ obMessages: OBMessage[] }> = ({ obMessages }) => {
  const years = [...new Set(obMessages.map((v) => v.year))].sort().reverse();
  const [filteredObMessages, setFilteredObMessages] = useState(obMessages);

  const onClickFilterYearButton = (year: number) => {
    const _filteredObMessages = obMessages.filter((v) => v.year === year);
    setFilteredObMessages(_filteredObMessages);
  };

  return (
    <>
      <div className="mt-2">
        {years.map((year, i) => (
          <button
            key={i}
            className="inline-block px-2 py-1 bg-gray-100 rounded mr-1 mb-1"
            onClick={() => {
              onClickFilterYearButton(year);
            }}
          >
            {year}
          </button>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-5 gap-1">
        {filteredObMessages.map((obMessage, i) => (
          <FirebaseStorageLink
            storagePath={`/mizutori/obmessage/${obMessage.year}/${obMessage.fileName}`}
            key={i}
          >
            <Button color="gray">{obMessage.title}</Button>
          </FirebaseStorageLink>
        ))}
      </div>
    </>
  );
};

const Component: React.FC = () => {
  const title = 'みずとり会のページ';
  const description = '';
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
          <div className="mt-2 grid grid-cols-2 md:grid-cols-5 gap-1">
            <FirebaseStorageLink storagePath="/mizutori/mizutorikai-kaisoku.pdf">
              <Button color="gray">みずとり会会則</Button>
            </FirebaseStorageLink>
          </div>
        </section>
        <section className="mt-4">
          <h3 className="text-lg">OB 通信</h3>
          <ObMessage obMessages={obMessages} />
        </section>
      </AuthGuard>
    </Layout>
  );
};

export default Component;
