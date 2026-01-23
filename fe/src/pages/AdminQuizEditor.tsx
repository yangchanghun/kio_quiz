import QuizFormPanel from "@/components/admin/QuizFormPanel";
import QuizPreviewPanel from "@/components/admin/QuizPreviewPanel";
import { useState } from "react";
export default function AdminQuizEditor() {
  const [quiztitle, setQuizTitle] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  return (
    <div className="mx-auto max-w-6xl bg-white rounded-xl shadow-lg p-6 h-screen">
      <div className="grid grid-cols-2 gap-6 h-full">
        {/* 왼쪽: 미리보기 (스크롤 ❌) */}
        <QuizPreviewPanel
          quiztitle={quiztitle}
          setThumbnailFile={setThumbnailFile}
        />

        {/* 오른쪽: 폼 (스크롤 ⭕) */}
        <div className="h-full overflow-y-auto pr-2">
          <QuizFormPanel
            quiztitle={quiztitle}
            thumbnailFile={thumbnailFile}
            setQuizTitle={setQuizTitle}
          />
        </div>
      </div>
    </div>
  );
}
