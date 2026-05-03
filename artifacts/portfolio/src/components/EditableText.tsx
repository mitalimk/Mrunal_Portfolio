export function E({
  children,
  className = "",
  as: Tag = "span",
}: {
  id: string;
  children: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return <Tag className={className}>{children}</Tag>;
}
