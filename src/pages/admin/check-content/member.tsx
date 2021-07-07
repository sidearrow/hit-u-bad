import React, { useContext, useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MemberPageData } from 'models';
import { MemberPage } from 'components/pages/MemberPage';
import { microCms } from 'microCMS';
import yaml from 'js-yaml';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <>
      <div>エラー</div>
      <div className="text-center">
        <button className="px-2 py-1 border" onClick={resetErrorBoundary}>
          再読み込み
        </button>
      </div>
      <div className="font-mono p-2 mt-2 border">{error!.message}</div>
    </>
  );
};

const Component: React.FC = () => {
  const [memberPageDataRaw, setMemberPageDataRaw] = useState<string>('');
  const [memberPageData, setMemberPageData] = useState<MemberPageData>();

  useEffect(() => {
    (async () => {
      const v = await microCms.getContent('member', true);
      setMemberPageDataRaw(v);
      setMemberPageData(yaml.load(v) as MemberPageData);
    })();
  }, []);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="bg-gray-200 p-2">コンテンツチェック</div>
        <div className="flex flex-1">
          <div className="w-1/2 p-2 border-r h-full">
            <textarea
              className="border w-full h-full font-mono"
              value={memberPageDataRaw}
              onChange={(e) => {
                setMemberPageDataRaw(e.target.value);
                setMemberPageData(yaml.load(e.target.value) as MemberPageData);
              }}
              style={{ resize: 'none' }}
            />
          </div>
          <div className="w-1/2 p-2">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              {memberPageData ? (
                <MemberPage memberPageData={memberPageData} />
              ) : (
                <div>ロード中</div>
              )}
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;

/*
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageId = params?.pageId as string;
  return {
    props: {
      pageId: pageId,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [{ params: { pageId: 'member' } }], fallback: false };
};
*/
