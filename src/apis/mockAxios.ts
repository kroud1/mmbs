// mockAxios 객체 정의
// 실제 서버와의 통신을 모방하기 위한 가짜 Axios 객체

import mockUserData from "../mocks/mockUserData";

// Response 타입 정의
// data 속성 포함
interface Response<T> {
  data: T;
}

const mockAxios = {
  // get 메서드 정의
  // : 주어진 URL에 따라 다른 mock 데이터 또는 메시지를 반환
  get: (
    url: string,
    options?: { headers?: { [key: string]: string } }
  ): Promise<Response<any>> => {
    // 만약 url이 'http://localhost:4040/'이라면, 서버가 온라인 상태임을 나타내는 메시지를 반환
    if (url === "http://localhost:4040/") {
      return Promise.resolve({ data: "Server is online" });
    }
    // url이 'http://localhost:4040/api/user'로 시작하면,
    // 요청 헤더에 올바른 토큰이 있는지 확인하고, mockUserData를 반환
    else if (url.startsWith("http://localhost:4040/api/user")) {
      if (options?.headers?.Authorization === "Bearer mockToken") {
        return Promise.resolve({ data: { data: mockUserData } });
      }
    }

    // 주어진 조건에 해당하지 않는 모든 다른 요청은 에러를 반환
    return Promise.reject(new Error("Unknown URL"));
  },
};

export default mockAxios;
