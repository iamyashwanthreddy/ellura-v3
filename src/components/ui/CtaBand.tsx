import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PHOTOS, photoSrc, photoSrcSet } from '../../content/images';
import { useReveals } from '../../lib/useReveals';
import Icon from './Icon';

/** Closing call-to-action used at the end of content pages. */
export default function CtaBand({
  title = (
    <>
      One capsule a day. <em>36 mg of soluble PACs.</em>
    </>
  ),
  body = 'Start with a 30-capsule bottle, or subscribe and save 10% on every delivery with free shipping.',
  primary = { to: '/ellura/shop', label: 'Shop ellura' },
  secondary = { to: '/ellura/subscribe', label: 'Subscribe & Save' },
}: {
  title?: ReactNode;
  body?: ReactNode;
  primary?: { to: string; label: string };
  secondary?: { to: string; label: string } | null;
}) {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  return (
    <section ref={ref} className="ctaband">
      <div className="wrap">
        <div className="ctaband__card">
          <div className="ctaband__copy">
            <h2 className="t-d2" data-split>
              {title}
            </h2>
            <p className="t-lead" data-fade>
              {body}
            </p>
            <div className="ctaband__actions" data-fade>
              <Link to={primary.to} className="btn btn--lilac btn--lg" data-magnetic>
                {primary.label} <Icon name="arrow" />
              </Link>
              {secondary && (
                <Link to={secondary.to} className="btn btn--ghost btn--lg">
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
          <div className="ctaband__visual" aria-hidden="true">
            <div className="ctaband__disc" />
            <img
              src={photoSrc(PHOTOS.bottlesDuo)}
              srcSet={photoSrcSet(PHOTOS.bottlesDuo)}
              sizes="(max-width: 900px) 70vw, 30vw"
              alt=""
              width={900}
              height={976}
              loading="lazy"
              data-parallax="6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
