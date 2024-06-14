import React, { useState } from "react";
import { updateProfile } from "../lib/api/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    <div>
      <h2>프로필 수정</h2>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
          minLength="1"
          maxLength="10"
        />
      </div>

      <div>
        <label htmlFor="nickname">아바타 이미지</label>
        <input
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
          accept="image/*"
        />
      </div>
      <button onClick={handleUpdateProfile}>프로필 업데이트</button>
    </div>
  );
};

export default Profile;
