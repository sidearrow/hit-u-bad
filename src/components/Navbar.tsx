import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Container } from './Container';
import { Menu } from './Menu';

export const Navbar: React.FC = () => {
  const [isMenuShow, setIsMenuShow] = React.useState(false);
  const toggleMenuShow = () => {
    setIsMenuShow(!isMenuShow);
  };
  return (
    <nav className="shadow">
      <Container>
        <div className="flex flex-row justify-between items-center p-4">
          <Link href="/">
            <a className="navbar-item">一橋大学バドミントン部</a>
          </Link>
          <button
            className="text-lg px-1"
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
