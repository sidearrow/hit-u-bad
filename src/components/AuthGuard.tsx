import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { firebaseAuthClient } from '../firebaseClient';

export const AuthGuard: React.FC = ({ children }) => {
  const router = useRouter();
  const [isNowLoading, setIsNowLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const isLogin = await firebaseAuthClient.check();
      if (!isLogin) {
        router.push('/mizutori-login');
      }
      setIsNowLoading(false);
    })();
  }, []);

  if (isNowLoading) {
    return (
      <div className="text-center">
        <span className="ml-2">ログイン情報取得中......</span>
      </div>
    );
  }

  return <>{children}</>;
};
