import React, { useEffect, useState } from "react";
import { useUserStore } from "./stores";
import mockAxios from "./apis/mockAxios";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Navigation from "./layouts/Navigation";


function App() {
  // 서버 연결 상태를 저장하는 state
  const [connection, setConnection] = useState<string>("");
  // 유저 토큰을 저장하는 state
  const [token, setToken] = useState<string | null>(null);
  // 사용자 정보와 그 정보를 설정하는 함수
  const { user, setUser } = useUserStore();

  // 서버 연결 테스트 함수
  const connectionTest = () => {
    mockAxios // mockAxios를 사용하여
      .get("http://localhost:4040/") // 해당 주소를 GET 요청을 보냄.
      .then((response) => {
        setConnection(response.data); // 응답 성공 시 연결 상태를 설정
      })
      .catch((error) => {
        setConnection(error.message); // 에러 발생 시 에러 메시지를 설정
      });
  };

  // 컴포넌트가 마운트 될 때 실행할 훅
  useEffect(() => {
    connectionTest(); // 서버 연결 테스트 함수 호출
  }, []); // 의존성 배열이 빈 배열 : 컴포넌트가 마운트 될 때만 실행

  // token이나 user의 상태가 바뀔 때마다 실행되는 훅
  useEffect(() => {
    if (token && !user) {
      // 토큰이 있고 사용자 정보가 없을 때
      mockAxios
        .get("http://localhost:4040/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const responseData = response.data.data;
          // 응답으로 받은 데이터로 사용자 정보를 설정
          setUser(responseData);
        })
        .catch((error) => {
          // 에러 발생 시 토큰을 null로 지정
          setToken(null);
        });
    }
    if (!token && user) {
      // 토큰이 없고 사용자 정보만 있을 때
      // 사용자 정보를 null로 지정
      setUser(null);
    }
  },[token, user]); // token 또는 user의 상태가 바뀔 때 마다 실행

  return (
  <>
   <Header />
   <Navigation/>
   <Footer />
  </>
  );
}

export default App;
