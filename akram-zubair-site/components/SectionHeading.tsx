import type { ReactNode } from 'react';

export function SectionHeading({ eyebrow, title, lead, id }: { eyebrow: string; title: string; lead?: ReactNode; id?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}
