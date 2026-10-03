import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Icon from './Icon';

/**
 * Horizontal product / content carousel. Native scroll-snap (so touch swipe
 * feels right), plus arrow buttons and a progress bar that tracks scroll.
 */
export default function Rail({ children, label, className = '' }: { children: ReactNode; label: string; className?: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState({ start: 0, size: 1 });
  const [edge, setEdge] = useState({ atStart: true, atEnd: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const size = el.scrollWidth ? el.clientWidth / el.scrollWidth : 1;
    const start = max > 0 ? (el.scrollLeft / max) * (1 - size) : 0;
    setProgress({ start, size: Math.min(1, size) });
    setEdge({ atStart: el.scrollLeft <= 2, atEnd: el.scrollLeft >= max - 2 });
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('li');
    const w = (first?.offsetWidth ?? el.clientWidth * 0.8) + 16;
    el.scrollBy({ left: dir * w, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const items = Children.toArray(children);
  const noControls = progress.size >= 0.999;

  return (
    <div className={`rail ${className}`} role="group" aria-roledescription="carousel" aria-label={label}>
      <ul ref={track} className="rail__track" role="list" onScroll={measure} tabIndex={0} aria-label={`${label} — scroll horizontally`} data-lenis-prevent-touch>
        {items.map((c, i) => (
          <li key={i} className="rail__item">
            {c}
          </li>
        ))}
      </ul>
      {!noControls && (
        <div className="rail__controls">
          <div className="rail__bar" aria-hidden="true">
            <i style={{ width: `${progress.size * 100}%`, transform: `translateX(${(progress.start / progress.size) * 100}%)` }} />
          </div>
          <button className="rail__btn" onClick={() => step(-1)} disabled={edge.atStart} aria-label="Previous">
            <Icon name="chevronLeft" size={20} />
          </button>
          <button className="rail__btn" onClick={() => step(1)} disabled={edge.atEnd} aria-label="Next">
            <Icon name="chevronRight" size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
