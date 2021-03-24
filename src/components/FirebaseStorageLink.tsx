import React, { useRef, useState } from 'react';
import { firebaseStorageClient } from '../firebaseClient';

type Props = {
  storagePath: string;
};

export const FirebaseStorageLink: React.FC<Props> = ({
  children,
  storagePath,
}) => {
  const [url, setUrl] = useState<string>('#');
  const dummyLinkRef = useRef<HTMLAnchorElement>(null);

  const clickHandler = () => {
    (async () => {
      if (url === '#') {
        const __url = await firebaseStorageClient.getDownloadUrl(storagePath);
        setUrl(__url === null ? '/404' : __url);
      }
      if (dummyLinkRef.current !== null) {
        dummyLinkRef.current.click();
      }
    })();
  };

  return (
    <div onClick={clickHandler}>
      {children}
      <a ref={dummyLinkRef} href={url} target="_blank" rel="noreferrer"></a>
    </div>
  );
};
