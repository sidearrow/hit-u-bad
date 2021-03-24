import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Container } from './Container';

const menuItems = [
  {
    text: '部活情報',
    path: '/about',
  },
  {
    text: '部員紹介',
    path: '/member',
  },
  {
    text: 'リーグ戦結果',
    path: '/league-result',
  },
  {
    text: '三多摩大会',
    path: '/santama',
  },
  {
    text: 'みずとり会',
    path: '/mizutori',
  },
];

export const Menu: React.FC = () => {
  return (
    <div className="pb-4 text-center">
      {menuItems.map((item, i) => (
        <Link href={item.path} key={i}>
          <a className="px-2 py-1 inline-block bg-gray-100 rounded m-1">
            {item.text}
          </a>
        </Link>
      ))}
    </div>
  );
};

export const Navbar: React.FC = () => {
  const [isMenuShow, setIsMenuShow] = React.useState(false);
  const toggleMenuShow = () => {
    setIsMenuShow(!isMenuShow);
  };
  return (
    <nav className="shadow">
      <Container>
        <div className="flex flex-row justify-between items-center py-4">
          <Link href="/">
            <a className="text-lg">一橋大学 バドミントン部</a>
          </Link>
          <button
            className="text-xl px-1"
            onClick={() => {
              toggleMenuShow();
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </Container>
      <div className="relative">
        {isMenuShow && (
          <div className="absolute w-full bg-white shadow">
            <Container>
              <Menu />
            </Container>
          </div>
        )}
      </div>
    </nav>
  );
};
