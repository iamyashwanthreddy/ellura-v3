import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES, formatDate } from '../../content/articles';
import { PHOTOS, photoSrc, photoSrcSet } from '../../content/images';
import { useReveals } from '../../lib/useReveals';
import Icon from '../ui/Icon';
import { ArrowLink } from '../ui/primitives';

/**
 * Learn teaser: one featured article with a large image and three supporting
 * articles as a hairline-separated list with thumbnails.
 */
export default function LearnTeaser() {
  const ref = useRef<HTMLElement>(null);
  const [feature, ...rest] = ARTICLES;
  const side = rest.slice(0, 3);
  useReveals(ref);

  return (
    <section ref={ref} className="learn-t section" aria-labelledby="learn-t-title">
      <div className="wrap">
        <div className="learn-t__head">
          <div>
            <p className="eyebrow" data-fade>
              Urinary Health Hub
            </p>
            <h2 id="learn-t-title" className="t-d2" data-split>
              Know your body. <em>Know the science.</em>
            </h2>
          </div>
          <ArrowLink to="/ellura/learn" className="learn-t__all">
            View all articles
          </ArrowLink>
        </div>
        <div className="bento">
          <Link to={`/ellura/learn/${feature.slug}`} className="bento__feature" data-fade>
            <span className="bento__img">
              <img
                src={photoSrc(PHOTOS[feature.image], true)}
                srcSet={photoSrcSet(PHOTOS[feature.image])}
                sizes="(max-width: 900px) 100vw, 52vw"
                alt=""
                width={1600}
                height={1067}
                loading="lazy"
              />
            </span>
            <span className="chip">Featured · {feature.topic}</span>
            <h3 className="t-d3">{feature.title}</h3>
            <span className="bento__read">
              Read article <Icon name="arrow" size={18} />
            </span>
          </Link>
          <ul className="bento__list" role="list" data-stagger>
            {side.map((a) => (
              <li key={a.slug}>
                <Link to={`/ellura/learn/${a.slug}`} className="bento__item">
                  <span className="bento__thumb">
                    <img src={photoSrc(PHOTOS[a.image])} alt="" width={800} height={600} loading="lazy" />
                  </span>
                  <span className="bento__text">
                    <span className="t-mono">{a.topic}</span>
                    <h3 className="t-h4">{a.title}</h3>
                    <span className="bento__meta">
                      {a.readMins} min read · {formatDate(a.date)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
