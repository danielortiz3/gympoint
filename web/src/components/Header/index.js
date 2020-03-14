import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Content, Logo, Profile, Logout } from './styles';

import logo from '~/assets/images/logo-horizontal.svg';

import { SingOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispacth = useDispatch();
  const { name } = useSelector(state => state.user.profile);

  function handleLogout() {
    dispacth(SingOut());
  }

  return (
    <Container>
      <Content>
        <div>
          <Link to="/alunos">
            <Logo>
              <img src={logo} alt="GymPoint" />
            </Logo>
          </Link>

          <nav>
            <NavLink to="/alunos">STUDENTS</NavLink>
            <NavLink to="/planos">PLANS</NavLink>
            <NavLink to="/matriculas">REGISTRATIONS</NavLink>
            <NavLink to="/pedidos-de-auxilio">HELP REQUESTS</NavLink>
          </nav>
        </div>

        <aside>
          <Profile>{name}</Profile>
          <Logout onClick={handleLogout}>Logout</Logout>
        </aside>
      </Content>
    </Container>
  );
}
