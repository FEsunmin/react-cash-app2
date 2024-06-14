import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../lib/api/auth";
import Swal from "sweetalert2";

const Container = styled.div`
  width: 500px;
  height: 500px;
  margin: 0 auto;
  margin-top: 50px;
  border: 1px solid;
  display: flex;
  border: 1px solid gray;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 40px;
  }
`;

const InputFrame = styled.div`
  display: flex;
  margin-bottom: 30px;
  flex-direction: column;

  label {
    font-weight: 600;
    margin-bottom: 10px;
  }

  input {
    width: 390px;
    height: 40px;
    border: 1px solid #acc8fd;
    padding-left: 10px;
    border-radius: 50px;
  }
`;

const SignInBtn = styled.button`
  width: 400px;
  height: 40px;
  color: white;
  font-weight: 600;
  margin-top: 20px;
  border-radius: 5px;
  margin-bottom: 30px;
  border: 1px solid #6e9df4;
  background-color: #6e9df4;
`;

const SignUpBtn = styled.button`
  width: 400px;
  height: 40px;
  color: #000000;
  border-radius: 5px;
  font-weight: 600;
  border: 1px solid #6e9df4;
  background-color: #ffffff;
`;

const SignIn = ({ setUser }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { userId, nickname, avatar } = await login({
      id: id,
      password: password,
    });
    Swal.fire({
      icon: "success",
      title: "success",
      text: "로그인이 완료되었습니다!",
    });
    navigate("/");
    setUser({ userId, nickname, avatar });
  };

  return (
    <Container>
      <h1>로그인</h1>
      <InputFrame>
        <label htmlFor="id">아이디</label>
        <input
          type="text"
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력하세요"
        />
      </InputFrame>
      <InputFrame>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
      </InputFrame>
      <SignInBtn onClick={handleSignIn}>로그인</SignInBtn>
      <SignUpBtn
        onClick={() => {
          navigate("/signup");
        }}
      >
        회원가입
      </SignUpBtn>
    </Container>
  );
};

export default SignIn;
