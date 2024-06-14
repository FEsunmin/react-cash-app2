import React, { useState } from "react";
import { updateProfile } from "../lib/api/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 500px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid skyblue;
`;

const FlexFrame = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const InputFrame = styled.input`
  width: 280px;
  height: 25px;
`;

const Button = styled.button`
  width: 350px;
  height: 30px;
  margin-top: 20px;
  border: none;
  border-radius: 50px;
  background-color: skyblue;
`;

const FormFrame = styled.div`
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Profile = ({ user, setUser }) => {
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("avatar", avatar);
    const response = await updateProfile(formData);

    if (response.success) {
      setUser({
        ...user,
        nickname: response.nickname,
        avatar: response.avatar,
      });
      navigate("/");
    }
  };

  return (
    <Container>
      <FlexFrame>
        <Title>프로필 수정</Title>
        <FormFrame>
          <label htmlFor="nickname">닉네임</label>
          <InputFrame
            type="text"
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
            minLength="1"
            maxLength="10"
          />
        </FormFrame>

        <FormFrame>
          <label htmlFor="nickname">아바타 이미지</label>
          <input
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            accept="image/*"
          />
        </FormFrame>
        <Button onClick={handleUpdateProfile}>프로필 업데이트</Button>
      </FlexFrame>
    </Container>
  );
};

export default Profile;
