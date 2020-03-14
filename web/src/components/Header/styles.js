import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #ddd;
  background: #ffffff;
`;

export const Content = styled.div`
  display: flex;
  max-width: 1440px;
  justify-content: space-between;
  margin: 0 auto;
  height: 64px;
  padding: 0 30px;

  > div {
    display: flex;
    align-items: center;
    height: 100%;

    nav {
      padding-left: 30px;

      a {
        font-weight: bold;
        font-size: 15px;
        margin-right: 20px;
        color: #999;
      }
      a.active {
        color: #444;
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const Logo = styled.div`
  border-right: 1px solid #ddd;
  padding-right: 30px;
`;

export const Profile = styled.div`
  color: #666;
  font-weight: bold;
`;

export const Logout = styled.button`
  font-size: 14px;
  color: #de3b3b;
  margin-top: 3px;
`;
