import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserInfo } from "../lib/api/auth";
import { useEffect } from "react";

const Navbar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: skyblue;
`;

const NavItems = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`;

const NavItem = styled(Link)`
  width: 60px;
  height: 50px;
  color: white;
  margin: 0 auto;
  margin-left: 20px;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  height: 50px;
  color: white;
  margin-right: 20px;
  display: flex;
  align-items: center;
`;

const UserInfoFrame = styled.div`
  width: 220px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoutButton = styled.button`
  padding: 8px 12px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    background-color: #cc0000;
  }
`;

const PageContainer = styled.div`
  padding: 6rem 2rem;
`;

const Layout = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setUser({
          userId: res.id,
          nickname: res.nickname,
          avatar: res.avatar,
        });
      } else {
        setUser(null);
        navigate("/signin");
        localStorage.clear();
      }
    });
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate("/signin");
    localStorage.clear();
  };

  return (
    <>
      <Navbar>
        <NavItems>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/profile">내 프로필</NavItem>
        </NavItems>
        <UserInfoFrame>
          {user && (
            <>
              <>
                <UserAvatar src={user.avatar} alt="avatar" />
                <UserName>{user.nickname}</UserName>
              </>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          )}
        </UserInfoFrame>
      </Navbar>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
};

export default Layout;
