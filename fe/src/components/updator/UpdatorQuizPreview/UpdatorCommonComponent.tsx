import { useState, useRef, useEffect } from "react";
const QUIZ_TYPES = [
  { label: "5지선다 퀴즈", value: "multiple" },
  { label: "O / X 퀴즈", value: "ox" },
  { label: "기억력 카드 맞추기", value: "memory" },
] as const;

type QuizTypeValue = (typeof QUIZ_TYPES)[number]["value"];
type Props = {
  value: QuizTypeValue;
  onChange: (value: QuizTypeValue) => void;
};

export default function UpdatorCommonComponent({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = QUIZ_TYPES.find((t) => t.value === value);

  // 🔹 바깥 클릭 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-[260px]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          w-full h-11 px-3 flex items-center gap-2
          border border-gray-300 rounded bg-white shadow-sm
          font-medium text-blue-700
        "
      >
        <span className="flex-1 truncate text-left">
          {selected?.label ?? "퀴즈 유형 선택"}
        </span>

        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow">
          {QUIZ_TYPES.map((type) => (
            <li
              key={type.value}
              onClick={() => {
                onChange(type.value);
                setOpen(false);
              }}
              className="
                px-3 py-2 cursor-pointer text-sm
                hover:bg-gray-100 truncate
              "
            >
              {type.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
