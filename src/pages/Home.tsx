import { useMeta, SITE_URL } from '../lib/useMeta';
import Hero from '../components/home/Hero';
import Reels from '../components/home/Reels';
import UsToIndia from '../components/home/UsToIndia';
import HowItWorksStory from '../components/home/HowItWorksStory';
import Difference from '../components/home/Difference';
import TakeControl from '../components/home/TakeControl';
import PackStack from '../components/home/PackStack';
import Habits from '../components/home/Habits';
import Rewards from '../components/home/Rewards';
import LearnTeaser from '../components/home/LearnTeaser';
import FaqTeaser from '../components/home/FaqTeaser';
import HomeReviews from '../components/home/HomeReviews';
import References from '../components/ui/References';

/**
 * Homepage. Order follows the supplied homepage doc — Hero, UGC loop,
 * US → India + urologist, How ellura works, How it is different, Take
 * control, Rewards — with added sections (marquee, packs, habits, learn,
 * FAQs, references) where the shopping journey needs them.
 */
/** Verified label facts (official carton + site) shown as a quiet four-column rail. */
const FACTS: { big: string; unit?: string; label: string }[] = [
  { big: '36', unit: 'mg', label: 'soluble, bioactive A-type PACs per capsule' },
  { big: '100', unit: '%', label: 'concentrated cranberry fruit juice extract' },
  { big: '1', unit: 'a day', label: 'capsule — vegan, gluten-free, non-GMO, sugar-free' },
  { big: '20', unit: '+ yrs', label: 'of cranberry research, made in a cGMP-compliant facility' },
];

export default function Home() {
  useMeta({
    title: 'ellura® — Urinary tract health, backed by 20+ years of cranberry research',
    description:
      'ellura® delivers 36 mg of soluble, bioactive A-type PACs from 100% concentrated cranberry fruit juice extract in one daily capsule. Trusted in the US for 20+ years, now in India.',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'ellura',
        url: `${SITE_URL}/ellura`,
        logo: `${SITE_URL}/brand/ellura-logo-plum.png`,
        parentOrganization: { '@type': 'Organization', name: 'Pharmatoka' },
        email: 'hello@ellurautihealth.com',
      },
      { '@context': 'https://schema.org', '@type': 'WebSite', name: 'ellura®', url: `${SITE_URL}/ellura` },
    ],
  });

  return (
    <>
      {/* Doc: Hero — same as the present US website */}
      <Hero />
      <section className="glance" aria-label="ellura at a glance">
        <dl className="wrap glance__grid" data-stagger>
          {FACTS.map((f) => (
            <div key={f.label} className="glance__item">
              <dt>
                <span className="glance__big">{f.big}</span>
                {f.unit && <span className="glance__unit">{f.unit}</span>}
              </dt>
              <dd>{f.label}</dd>
            </div>
          ))}
        </dl>
      </section>
      {/* Doc: Section 2 — UGC loop */}
      <Reels />
      {/* Doc: Section 3 — US-based product now available for India + Recommended by urologists */}
      <UsToIndia />
      {/* Doc: Section 4 — How ellura works */}
      <HowItWorksStory />
      {/* Doc: Section 5 — How it is different */}
      <Difference />
      {/* Doc: Section 6 — Take control */}
      <TakeControl />
      {/* Added — shopping: choose your supply */}
      <PackStack />
      {/* Added — daily habits */}
      <Habits />
      {/* Doc: Section 7 — Earn rewards & share the benefits */}
      <Rewards />
      {/* Added — social proof (US store, labelled) */}
      <HomeReviews />
      {/* Added — Learn + FAQs (doc product-page FAQ style) */}
      <LearnTeaser />
      <FaqTeaser />
      <section className="section section--tight" aria-label="References">
        <div className="wrap wrap--narrow">
          <References />
        </div>
      </section>
    </>
  );
}
