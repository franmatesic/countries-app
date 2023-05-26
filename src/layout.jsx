import React from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {breakpoint, Container} from './lib/styles.js';
import styled from 'styled-components';

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 4rem;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(0.5rem);
`;

const Nav = styled(Container)`
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem 1rem 1rem;
`;

const Title = styled.a`
  font-size: 1.5rem;
  color: ${p => p.theme.neutral['200']};
  font-weight: 600;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: ${p => p.theme.neutral['300']};
  }
`;

const Link = styled.a`
  font-size: 1.125rem;
  color: ${p => p.theme.neutral['400']};
  cursor: pointer;
  user-select: none;
  display: none;

  &:hover {
    color: ${p => p.theme.neutral['300']};
  }

  @media (min-width: ${breakpoint}) {
    display: block;
  }
`;

const Content = styled.div`
  margin-top: 4rem;
`;

const BottomTab = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  background-color: ${p => p.theme.neutral['900']};
  z-index: 50;

  @media (min-width: ${breakpoint}) {
    display: none;
  }
`;

const Tab = styled.div`
  flex-basis: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  padding: 1rem;
`;

const TabLink = styled.a`
  color: ${p => p.$active ? p.theme.primaryLight : p.theme.neutral['300']};
  user-select: none;
`;

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <Navbar>
                <Nav>
                    <Title onClick={() => navigate('/')}>
                        CountriesApp
                    </Title>
                    <Link onClick={() => navigate('/info')}>
                        Info
                    </Link>
                </Nav>
            </Navbar>

            <Content>
                <Outlet/>
            </Content>

            <BottomTab>
                <Tab>
                    <TabLink $active={location.pathname !== '/info'} onClick={() => navigate('/')}>
                        Home
                    </TabLink>
                </Tab>
                <Tab>
                    <TabLink $active={location.pathname === '/info'} onClick={() => navigate('/info')}>
                        Info
                    </TabLink>
                </Tab>
            </BottomTab>
        </>
    );
}
