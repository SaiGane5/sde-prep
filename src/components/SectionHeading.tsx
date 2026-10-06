export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="section-heading">{title}</h2>
      {description && (
        <p className="body-text max-w-3xl text-[var(--text-muted)]">{description}</p>
      )}
    </div>
  );
}
