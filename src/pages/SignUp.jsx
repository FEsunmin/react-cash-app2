import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "../lib/api/auth";
import Swal from "sweetalert2";

const Container = styled.div`
  width: 500px;
  height: 600px;
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

const SignUpBtn = styled.button`
  width: 400px;
  height: 40px;
  color: white;
  font-weight: 600;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 30px;
  border: 1px solid #6e9df4;
  background-color: #6e9df4;
`;

const BackBtn = styled.button`
  width: 400px;
  height: 40px;
  color: #000000;
  border-radius: 5px;
  font-weight: 600;
  border: 1px solid #6e9df4;
  background-color: #ffffff;
`;

const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (id.length < 4 || id.length > 10) {
      Swal.fire("아이디는 4글자에서 10글자 이내로만 가능합니다");
      return;
    }

    if (password.length < 4 || password.length > 15) {
      Swal.fire("패스워드는 4글자에서 10글자 이내로만 가능합니다");
      return;
    }

    if (nickname.length < 1 || nickname.length > 10) {
      Swal.fire("닉네임은 1글자에서 10글자 이내로만 가능합니다");
      return;
    }

    const response = await register({
      id: id,
      password: password,
      nickname: nickname,
    });

    if (response) {
      Swal.fire({
        icon: "success",
        title: "success",
        text: "회원가입이 완료되었습니다!",
      });
      navigate("/signin");
    }
  };

  return (
    <Container>
      <h1>회원가입</h1>
      <InputFrame>
        <label htmlFor="id">아이디</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력하세요"
        />
      </InputFrame>
      <InputFrame>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
      </InputFrame>
      <InputFrame>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력하세요"
        />
      </InputFrame>
      <SignUpBtn onClick={handleSignUp}>회원가입</SignUpBtn>
      <BackBtn
        onClick={() => {
          navigate("/signIn");
        }}
      >
        돌아가기
      </BackBtn>
    </Container>
  );
};

export default SignUp;
