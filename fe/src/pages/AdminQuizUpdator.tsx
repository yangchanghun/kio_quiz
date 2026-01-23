// src/pages/AdminQuizUpdator.tsx

import { useQuizDetail } from "@/hooks/useQuizDetail";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { QuestionsType } from "@/types/QuesionsType";
import type { ChoicesType } from "@/types/ChoicesType";
import UpdatorQuizPreviewPanel from "@/components/updator/UpdatorQuizPreviewPanel";
import UpdatorQuizFormPanel from "@/components/updator/UpdatorQuizFormPanel";

export default function AdminQuizUpdator() {
  const { quizId } = useParams<{ quizId: string }>();
  const { data, isLoading, isError } = useQuizDetail(Number(quizId));

  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionsType[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  useEffect(() => {
    if (!data) return;

    setQuizTitle(data.title);
    setQuestions(
      data.questions.map((q: QuestionsType) => ({
        id: q.id,
        question: q.question,
        description: q.description,
        img: q.image,
        answers: q.answers,
        choices: q.choices.map((c: ChoicesType) => ({
          id: c.id,
          label: c.label,
          img: c.image,
          order: c.order,
        })),
      })),
    );
    setThumbnailUrl(data.thumbnail ?? null);
  }, [data]);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError || !data) return <div>에러 발생</div>;

  return (
    <div className="mx-auto max-w-6xl bg-white rounded-xl shadow-lg p-6 h-screen">
      <div className="grid grid-cols-2 gap-6 h-full">
        <UpdatorQuizPreviewPanel
          thumbnailUrl={thumbnailUrl}
          quiztitle={quizTitle}
          setThumbnailFile={setThumbnailFile}
        />

        <div className="h-full overflow-y-auto pr-2">
          <UpdatorQuizFormPanel
            quizId={Number(quizId)}
            quiztitle={quizTitle}
            setQuizTitle={setQuizTitle}
            thumbnailFile={thumbnailFile}
            questions={questions}
            setQuestions={setQuestions}
          />
        </div>
      </div>
    </div>
  );
}
