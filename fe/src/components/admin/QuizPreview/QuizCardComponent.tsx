// import { useRef, useState } from "react";

// type QuizCardProps = {
//   quiztitle: string;
//   setThumbnailFile: (file: File | null) => void;
// };

// export function QuizCardComponent({
//   setThumbnailFile,
//   quiztitle,
// }: QuizCardProps) {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [imgSrc, setImgSrc] = useState<string | null>(null);

//   const handleClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // ❌ 이미지 파일 아님
//     if (!file.type.startsWith("image/")) {
//       alert("이미지 파일만 업로드할 수 있습니다.");
//       e.target.value = "";
//       return;
//     }

//     // ✅ 미리보기
//     const previewUrl = URL.createObjectURL(file);
//     setImgSrc(previewUrl);
//   };

//   return (
//     <>
//       {/* 숨겨진 파일 인풋 */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={handleFileChange}
//       />

//       {/* 카드 */}
//       <button
//         type="button"
//         onClick={handleClick}
//         className="
//           w-[130px]
//           h-[140px]
//           bg-white
//           rounded-2xl
//           shadow-lg
//           flex
//           flex-col
//           items-center
//           justify-between
//           p-3
//           active:scale-95
//           transition-transform
//           mb-4
//           mr-4
//         "
//       >
//         {/* 이미지 영역 */}
//         <div
//           className="
//             w-full
//             h-[100px]
//             bg-gray-200
//             rounded-xl
//             flex
//             items-center
//             justify-center
//             text-gray-500
//             text-sm
//             font-semibold
//             overflow-hidden
//           "
//         >
//           {imgSrc ? (
//             <img
//               src={imgSrc}
//               alt={quiztitle}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             "IMG"
//           )}
//         </div>

//         {/* 제목 */}
//         <div
//           className="
//             text-black
//             font-semibold
//             text-sm
//             mt-2
//             text-center
//             leading-tight
//           "
//         >
//           {quiztitle}
//         </div>
//       </button>
//     </>
//   );
// }
import { useEffect, useRef, useState } from "react";

type QuizCardProps = {
  quiztitle: string;
  setThumbnailFile: (file: File | null) => void;
};

export function QuizCardComponent({
  setThumbnailFile,
  quiztitle,
}: QuizCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      e.target.value = "";
      return;
    }

    // ✅ 부모 상태에 파일 저장 (이게 setThumbnailFile임)
    setThumbnailFile(file);

    // ✅ 미리보기 URL
    const previewUrl = URL.createObjectURL(file);
    setImgSrc(previewUrl);
  };

  // ✅ URL 메모리 누수 방지 (선택이지만 강추)
  useEffect(() => {
    return () => {
      if (imgSrc) URL.revokeObjectURL(imgSrc);
    };
  }, [imgSrc]);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={handleClick}
        className="
w-[130px]
h-[140px]
bg-white
rounded-2xl
drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]
flex
flex-col
items-center
justify-between
p-3
active:scale-95
transition-transform
mb-4"
      >
        <div
          className="
             w-full
             h-[100px]
             bg-gray-200
             rounded-xl
             flex
             items-center
             justify-center
             text-gray-500
             text-sm
             font-semibold
             overflow-hidden"
        >
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={quiztitle}
              className="w-full h-full object-cover"
            />
          ) : (
            "클릭해서 이미지입력"
          )}
        </div>

        <div className="text-black font-semibold text-sm mt-2 text-center leading-tight">
          {quiztitle || "퀴즈제목입력"}
        </div>
      </button>
    </>
  );
}
