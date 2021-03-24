import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menuItems = [
  {
    text: '年間スケジュール',
    path: '/annual-schedule',
  },
  {
    text: '練習スケジュール',
    path: '/practice-schedule',
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

type MenuItemProps = {
  isActive: boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({ children }) => {
  return (
    <span className="px-2 py-1 inline-block bg-gray-100 rounded m-1">
      {children}
    </span>
  );
};

export const Menu: React.FC = () => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="pb-4 text-center">
      {menuItems.map((item, i) => (
        <Link href={item.path} key={i}>
          <a>
            <MenuItem isActive={item.path === pathname}>{item.text}</MenuItem>
          </a>
        </Link>
      ))}
    </div>
  );
};
