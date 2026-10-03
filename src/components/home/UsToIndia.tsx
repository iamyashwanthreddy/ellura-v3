import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { DOCTOR, BRAND } from '../../content/brand';
import { MAP } from '../../content/worldMap';
import { gsap, SplitText, useGSAP, MQ } from '../../lib/gsap';
import { useReveals } from '../../lib/useReveals';
import Icon from '../ui/Icon';
import { ArrowLink, Img } from '../ui/primitives';

/**
 * Homepage doc, Section 3: say it is a US-based product now available for
 * India, then "Recommended by Urologists" with Dr. Chughtai’s quote (and his
 * compensated-advisor disclosure, exactly as on the US site).
 */
export default function UsToIndia() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Route draws between the two countries while a marker travels along it.
        const path = ref.current!.querySelector<SVGPathElement>('.usroute__path')!;
        const marker = ref.current!.querySelector<SVGGElement>('.usroute__marker')!;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: `${len} ${len}`, strokeDashoffset: len });
        gsap.set(marker, { opacity: 0 });
        const move = (p: number) => {
          const pt = path.getPointAtLength(len * p);
          marker.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
        };
        const prog = { p: 0 };
        const tl = gsap.timeline({ scrollTrigger: { trigger: '.usroute', start: 'top 85%', end: 'bottom 45%', scrub: 0.8 } });
        tl.fromTo('.usroute__country--us', { opacity: 0.35 }, { opacity: 1, duration: 0.1 }, 0)
          .to(marker, { opacity: 1, duration: 0.05 }, 0.02)
          .to(path, { strokeDashoffset: 0, ease: 'none', duration: 0.8 }, 0.05)
          .to(prog, { p: 1, ease: 'none', duration: 0.8, onUpdate: () => move(prog.p) }, 0.05)
          .fromTo('.usroute__country--in', { opacity: 0.35 }, { opacity: 1, duration: 0.1 }, 0.85)
          .fromTo('.usroute__label--in', { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.1 }, 0.88);
        move(0);

        // Quote words brighten with scroll.
        const split = SplitText.create('.doctor__quote', { type: 'words' });
        gsap.fromTo(
          split.words,
          { opacity: 0.18 },
          { opacity: 1, stagger: 0.04, ease: 'none', scrollTrigger: { trigger: '.doctor__quote', start: 'top 80%', end: 'bottom 55%', scrub: 0.5 } },
        );

        gsap.fromTo('.doctor__portrait img', { yPercent: -4, scale: 1.08 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: '.doctor', start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.fromTo('.doctor__plate', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.doctor', start: 'top 60%', once: true } });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="usin section" aria-labelledby="usin-title">
      <div className="wrap">
        <div className="usin__grid">
          <div className="usin__story">
            <p className="eyebrow" data-fade>
              From the US, for India
            </p>
            <h2 id="usin-title" className="t-d1" data-split>
              Trusted in the US for 20+ years. <em>Now in India.</em>
            </h2>
            <p className="t-lead" data-fade>
              Developed by Pharmatoka and trusted in the United States for more than two decades, ellura® now arrives in India — the same research-led approach to
              urinary tract health, in one capsule a day.
            </p>
            <Link to="/ellura/our-story" className="text-link" data-fade>
              Our story <Icon name="arrow" />
            </Link>
          </div>
          <div className="usroute" data-fade role="img" aria-label="World map showing the route from the United States to India">
            <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} className="usroute__svg" aria-hidden="true">
              <path className="usroute__land" d={MAP.land} />
              <path className="usroute__country usroute__country--us" d={MAP.usa} />
              <path className="usroute__country usroute__country--in" d={MAP.india} />
              <path className="usroute__base" d={MAP.route} />
              <path className="usroute__path" d={MAP.route} />
              <circle className="usroute__dot" cx={MAP.from[0]} cy={MAP.from[1]} r="6" />
              <circle className="usroute__dot usroute__dot--in" cx={MAP.to[0]} cy={MAP.to[1]} r="6" />
              <g className="usroute__marker">
                <circle r="11" className="usroute__halo" />
                <circle r="5" />
              </g>
              <text className="usroute__pin" x={MAP.from[0] - 92} y={MAP.from[1] + 48} textAnchor="end">
                USA
              </text>
              <text className="usroute__pin usroute__label--in" x={MAP.to[0] + 30} y={MAP.to[1] + 62} textAnchor="start">
                India
              </text>
            </svg>
          </div>
        </div>

        <dl className="usin__stats" data-stagger>
          <div className="stat">
            <dt>Years of cranberry research</dt>
            <dd>
              <span data-count="20">20</span>+
            </dd>
          </div>
          <div className="stat">
            <dt>Clinical &amp; scientific studies</dt>
            <dd>
              <span data-count={BRAND.studies}>{BRAND.studies}</span>
            </dd>
          </div>
          <div className="stat">
            <dt>International herbal-medicine approvals**</dt>
            <dd>
              <span data-count={BRAND.approvals}>{BRAND.approvals}</span>
            </dd>
          </div>
          <div className="stat">
            <dt>Soluble A-type PACs per capsule</dt>
            <dd>
              <span data-count="36">36</span>
              <small>mg</small>
            </dd>
          </div>
        </dl>

        <div className="doctor">
          <figure className="doctor__portrait">
            <Img photo="doctor" sizes="(max-width: 900px) 90vw, 36vw" width={1200} height={977} />
            <figcaption className="doctor__plate">
              <strong>{DOCTOR.name}</strong>
              <span>
                {DOCTOR.role}
                <br />
                {DOCTOR.org}
              </span>
              <em>{DOCTOR.disclosure}</em>
            </figcaption>
          </figure>
          <div className="doctor__body">
            <p className="eyebrow" data-fade>
              Recommended by urologists
            </p>
            <blockquote className="doctor__quote">
              <p>“{DOCTOR.quote.join(' ')}”</p>
            </blockquote>
            <ArrowLink to="/ellura/science" className="doctor__link">
              Learn more about the science
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
