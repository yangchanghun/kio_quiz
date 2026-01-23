import { useQuizList } from "@/hooks/useQuizList";
import type { QuestionType } from "@/types/QuesionsType";
import { useNavigate } from "react-router-dom";

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

export default function AdminTable() {
  const { data: quizList, isLoading } = useQuizList();

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  console.log(quizList);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded shadow">
      {isLoading && <div className="text-white/70">불러오는 중...</div>}
      <table className="w-full border-collapse">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3">번호</th>
            <th>퀴즈명</th>
            <th>퀴즈유형</th>
            <th>생성일</th>
          </tr>
        </thead>
        <tbody>
          {quizList?.map((quiz: QuestionType, index: number) => (
            <tr
              onClick={() => {
                navigate(`/user/management/update/${quiz.id}`);
              }}
              key={index + 1}
              className="border-b hover:bg-gray-50 text-center"
            >
              <td className="py-3">{index + 1}</td>
              <td>{quiz.title}</td>
              <td>{quiz.type}</td>
              <td>{quiz.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* footer */}
      <div className="flex justify-between items-center p-4 text-sm">
        {/* <div>
          Items per page:
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // ⭐ 페이지 수 바뀌면 1페이지로
            }}
            className="ml-2 border rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div> */}

        {/* <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            &lt;
          </button>

          <span>
            {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            &gt;
          </button>
        </div> */}
      </div>
    </div>
  );
}
