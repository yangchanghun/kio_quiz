import axios from "axios";

const BASE_URL = "https://kioquiz.kioedu.co.kr/api";
// const BASE_URL = "http://localhost:8000/api";

export const fetchQuizList = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${BASE_URL}/quizzes/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(res.data)
  return res.data;
};

export const fetchQuizDetail = async (quizId: number) => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${BASE_URL}/quizzes/${quizId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const createQuizApi = async (formData: FormData) => {
  const token = localStorage.getItem("token");
  console.log(token);
  const res = await axios.post(`${BASE_URL}/quizzes/create/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // ⚠️ multipart일 때는 Content-Type 직접 지정 ❌
    },
  });

  return res.data;
};

export const updateQuizApi = async (quizId: number, formData: FormData) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(
    `${BASE_URL}/quizzes/${quizId}/update/`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // ⚠️ multipart/form-data는 직접 Content-Type 지정 ❌
      },
    },
  );

  return res.data;
};
