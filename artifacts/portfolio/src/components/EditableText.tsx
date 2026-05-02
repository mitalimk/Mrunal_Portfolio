import { useRef, useLayoutEffect } from "react";

const PREFIX = "portfolio-edit-";

export function E({
  id,
  children,
  className = "",
  as: Tag = "span",
}: {
  id: string;
  children: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const stored = localStorage.getItem(PREFIX + id);
    if (stored !== null) ref.current.textContent = stored;
  }, [id]);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    localStorage.setItem(PREFIX + id, e.currentTarget.textContent ?? children);
  };

  return (
    <Tag
      ref={ref as never}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      className={`${className} cursor-text focus:outline-none focus:ring-1 focus:ring-primary/50 focus:rounded-sm`}
      onBlur={handleBlur}
    >
      {children}
    </Tag>
  );
}
