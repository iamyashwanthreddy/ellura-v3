import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { PhotoKey } from '../../content/images';
import { useReveals } from '../../lib/useReveals';
import { Clover, Img } from './primitives';

export interface Crumb {
  label: string;
  to?: string;
}

export function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="crumbs">
        {items.map((c, i) => (
          <li key={i}>{c.to && i < items.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current={i === items.length - 1 ? 'page' : undefined}>{c.label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  photo,
  visual,
  tone = 'light',
  children,
  className = '',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  photo?: PhotoKey;
  /** Custom media (e.g. a product composition) used instead of a photo. */
  visual?: ReactNode;
  tone?: 'light' | 'dark' | 'bone' | 'lilac';
  children?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  const toneClass = `phero--${tone}`;
  const hasMedia = !!(photo || visual);
  return (
    <section ref={ref} className={`phero ${toneClass} ${className}`}>
      <div className="wrap">
      <div className={`phero__card phero__grid ${hasMedia ? '' : 'phero__grid--single'}`}>
        <div className="phero__copy">
          {crumbs && (
            <div data-fade="load">
              <Crumbs items={[{ label: 'ellura', to: '/ellura' }, ...crumbs]} />
            </div>
          )}
          {eyebrow && (
            <p className="eyebrow" data-fade="load">
              {eyebrow}
            </p>
          )}
          <h1 className="t-d1 accent-em" data-split="load">
            {title}
          </h1>
          {lead && (
            <p className="t-lead" data-fade="load" data-delay="0.1">
              {lead}
            </p>
          )}
          {children && (
            <div className="phero__actions" data-fade="load" data-delay="0.2">
              {children}
            </div>
          )}
        </div>
        {visual && <div className="phero__visual">{visual}</div>}
        {photo && !visual && (
          <div className="phero__media" data-arch="load">
            <Img photo={photo} priority sizes="(max-width: 900px) 100vw, 42vw" width={1200} height={1500} />
          </div>
        )}
        <Clover className="phero__clover" />
      </div>
      </div>
    </section>
  );
}
