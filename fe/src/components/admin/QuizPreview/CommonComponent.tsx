import { useState, useRef, useEffect } from "react";

const QUIZ_TYPES = ["5지선다 퀴즈", "O/X 퀴즈", "기억력 카드 맞추기"];
export default function CommonComponent() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(QUIZ_TYPES[0]);
  const ref = useRef<HTMLDivElement>(null);

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
    <div
      ref={ref}
      className="
        relative
        w-full
        max-w-[220px]
        sm:max-w-[260px]
      "
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          w-full
          h-11
          px-3
          flex
          items-center
          gap-2
          border
          border-gray-300
          rounded
          bg-white
          shadow-sm
          font-medium
          text-blue-700
        "
      >
        {/* 텍스트 */}
        <span className="flex-1 truncate text-left">{selected}</span>

        {/* 화살표 */}
        <svg
          className={`w-4 h-4 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
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
              key={type}
              onClick={() => {
                setSelected(type);
                setOpen(false);
              }}
              className="
                px-3
                py-2
                cursor-pointer
                hover:bg-gray-100
                text-sm
                truncate
              "
            >
              {type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
