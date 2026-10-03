import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP, MQ, isTouch } from '../../lib/gsap';
import { introDelay } from '../../lib/intro';
import { PHOTOS, photoSrc, photoSrcSet } from '../../content/images';
import Icon from '../ui/Icon';
import { Ref } from '../ui/primitives';

/**
 * Homepage hero. Copy is the current US hero (homepage doc: "Hero Section:
 * Same as the present US website"). Art direction: a quiet editorial split —
 * big serif headline on the left, the official pack photography on a tinted
 * panel on the right with two hairline callouts.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const mm = gsap.matchMedia();
      const base = introDelay();

      mm.add(MQ.motion, () => {
        const intro = gsap.timeline({ delay: base, defaults: { ease: 'expo.out' } });
        intro
          .fromTo('.hero__panel', { clipPath: 'inset(100% 0% 0% 0% round 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 1.5 })
          .fromTo('.hero__bottles', { yPercent: 14, opacity: 0, scale: 0.94 }, { yPercent: 0, opacity: 1, scale: 1, duration: 1.7 }, 0.35)
          .fromTo('.hero__title .hero__line > span', { yPercent: 112 }, { yPercent: 0, duration: 1.25, stagger: 0.09 }, 0.15)
          .fromTo('.hero__fade', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1, stagger: 0.07, ease: 'power3.out' }, 0.65)
          .fromTo('.hero__callout', { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out' }, 1.1)
          .fromTo('.hero__callout i', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: 0.9, stagger: 0.14 }, 1.15)
          .fromTo('.hero__badges img', { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.8, ease: 'power3.out' }, 1.2);

        // Scroll exit: product drifts, panel image settles.
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 0.6 } })
          .to('.hero__bottles-wrap', { yPercent: -7, ease: 'none' }, 0)
          .to('.hero__copy', { y: -40, ease: 'none' }, 0);
      });

      mm.add(MQ.desktop, () => {
        if (isTouch()) return;
        const layers = gsap.utils.toArray<HTMLElement>('[data-depth]');
        const setters = layers.map((el) => ({
          x: gsap.quickTo(el, 'x', { duration: 1.4, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 1.4, ease: 'power3.out' }),
          d: parseFloat(el.dataset.depth || '0'),
        }));
        const onMove = contextSafe!((e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          setters.forEach((s) => {
            s.x(nx * s.d);
            s.y(ny * s.d);
          });
        });
        window.addEventListener('pointermove', onMove);
        return () => window.removeEventListener('pointermove', onMove);
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="hero__kicker hero__fade">
            <span>Urinary tract health</span>
            <i aria-hidden="true" />
            <span>Now in India</span>
          </p>
          <h1 id="hero-title" className="t-hero hero__title">
            <span className="hero__line">
              <span>The UTI struggle</span>
            </span>
            <span className="hero__line">
              <span>is real —</span>
            </span>
            <span className="hero__line">
              <span>
                <em>we hear you.</em>
              </span>
            </span>
          </h1>
          <p className="hero__lead hero__fade">If you’ve ever had a UTI, you know how frustrating, painful, and disruptive it can be.</p>
          <p className="hero__body hero__fade">
            <strong>ellura®</strong> is a scientifically and clinically backed supplement that helps reduce the ability of certain bacteria to adhere to the urinary
            tract, supporting urinary tract health*
            <Ref n={[1, 2]} />. Each capsule delivers 36 mg of soluble, bioactive A-type PACs from 100% concentrated cranberry fruit juice extract
            <Ref n={[3, 4]} />.
          </p>
          <div className="hero__ctas hero__fade">
            <Link to="/ellura/shop" className="btn btn--lg" data-magnetic>
              Buy now <Icon name="arrow" />
            </Link>
            <Link to="/ellura/how-it-works" className="text-link">
              How it works
            </Link>
          </div>
          <div className="hero__badges" aria-label="Recognition">
            <img src="/images/badge-20.webp" alt="20+ years" width={120} height={112} />
            <img src="/images/badge-cgmp.webp" alt="Manufactured in a cGMP compliant facility — cGMP certified" width={112} height={112} />
            <img src="/images/badge-award.webp" alt="2026 Mindful Awards" width={112} height={112} />
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__panel" aria-hidden="true">
            <div className="hero__bottles-wrap" data-depth="22">
              <img
                className="hero__bottles"
                src={photoSrc(PHOTOS.bottlesDuo)}
                srcSet={photoSrcSet(PHOTOS.bottlesDuo)}
                sizes="(max-width: 900px) 80vw, 40vw"
                alt=""
                width={900}
                height={976}
                // @ts-expect-error — valid HTML attribute, not in React 18 types
                fetchpriority="high"
              />
            </div>
            <p className="hero__callout hero__callout--a">
              <i />
              <span>
                <b>36 mg</b> soluble A-type PACs
              </span>
            </p>
            <p className="hero__callout hero__callout--b">
              <i />
              <span>
                <b>1 capsule</b> a day
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
