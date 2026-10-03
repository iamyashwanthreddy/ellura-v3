import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { US_REVIEWS, US_REVIEW_STATS, usAverage } from '../../content/reviews';
import { useReveals } from '../../lib/useReveals';
import Rail from '../ui/Rail';
import { ArrowLink, SectionHead, Stars } from '../ui/primitives';

/**
 * Social proof rail. Only real material is shown: the published totals and
 * three verbatim reviews from the US store, always labelled as such.
 * No Indian reviews exist yet and none are invented.
 */
export default function HomeReviews() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  const avg = usAverage();
  const tones = ['blush', 'butter', 'sage'];

  return (
    <section ref={ref} className="hrev section" aria-labelledby="hrev-title">
      <div className="wrap">
        <SectionHead
          eyebrow="Reviews from the US store"
          title={
            <span id="hrev-title">
              Loved in the US. <em>Arriving in India.</em>
            </span>
          }
        />
        <Rail label="Customer reviews">
          <article className="hrev__card hrev__card--score">
            <Stars value={avg} size={22} />
            <p className="hrev__big">{avg.toFixed(1)}</p>
            <p>
              average from <strong>{US_REVIEW_STATS.total} reviews</strong> on our US store
            </p>
            <ArrowLink to="/ellura/reviews">All reviews</ArrowLink>
          </article>
          {US_REVIEWS.map((r, i) => (
            <article key={i} className={`hrev__card hrev__card--${tones[i % tones.length]}`}>
              {r.title && <h3 className="t-h4">{r.title}</h3>}
              <p className="hrev__quote">“{r.body}”</p>
              <p className="hrev__by">
                <strong>{r.name}</strong>
                <span>US store · verbatim</span>
              </p>
            </article>
          ))}
          <article className="hrev__card hrev__card--cta">
            <h3 className="t-d3">
              Tried <em>ellura?</em>
            </h3>
            <p>India reviews will appear here as verified buyers share them.</p>
            <Link to="/ellura/reviews" className="btn btn--white">
              Share your experience
            </Link>
          </article>
        </Rail>
        <p className="claim hrev__note">Totals as published on ellurautihealth.com, checked {US_REVIEW_STATS.checked}. Individual experiences vary.</p>
      </div>
    </section>
  );
}
