import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { firebaseAuthClient } from '../firebaseClient';

const Component: React.FC = () => {
  const router = useRouter();
  const [status, setStatus] = useState<'wait' | 'check' | 'fail'>('wait');
  const [inputPassword, setInputPassword] = useState('');

  const handleLogin = () => {
    setStatus('check');
    setTimeout(() => {}, 1000);
    (async () => {
      try {
        await firebaseAuthClient.login(inputPassword);
        router.push('/mizutori');
      } catch {
        setStatus('fail');
      }
    })();
  };

  return (
    <Layout title="みずとり会 ログイン" description="">
      <div className="section">
        <div className="flex border-b border-gray-500 py-2 items-center">
          <input
            className="appearance-none bg-transparent border-none focus:outline-none flex-1"
            type="password"
            id="inputPassword"
            placeholder="パスワード"
            value={inputPassword}
            onChange={(e) => {
              setInputPassword(e.target.value);
            }}
          />
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded inline-block"
            type="button"
            onClick={handleLogin}
          >
            ログイン
          </button>
        </div>
        <div className="mt-2">
          {status === 'fail' && (
            <span className="text-red-600">ログインに失敗しました</span>
          )}
          {status === 'check' && 'ログイン情報をチェックしています'}
        </div>
      </div>
    </Layout>
  );
};

export default Component;
