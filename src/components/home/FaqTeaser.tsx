import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FAQ_GROUPS } from '../../content/faqs';
import { useReveals } from '../../lib/useReveals';
import Accordion, { AccordionItem } from '../ui/Accordion';
import { Rich } from '../ui/primitives';

/** FAQ block: sticky title column on the left, hairline accordion on the right. */
export default function FaqTeaser({ groupId = 'about', title = 'FAQs', showIntro = true }: { groupId?: string; title?: string; showIntro?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  const group = FAQ_GROUPS.find((g) => g.id === groupId)!;
  return (
    <section ref={ref} className="faq-t section" aria-labelledby="faq-t-title">
      <div className="wrap faq-t__grid">
        <header className="faq-t__head">
          <p className="eyebrow" data-fade>
            {group.title.replace('ellura', '').trim() || 'About'}
            {group.title.includes('ellura') && (
              <>
                {' '}
                <span className="brand-word">ellura</span>
              </>
            )}
          </p>
          <h2 id="faq-t-title" className="t-d2" data-split>
            {title}
          </h2>
          {showIntro && (
            <p className="t-lead" data-fade>
              We’re here to help! Below you’ll find answers to some of our most frequently asked questions. If you need further assistance, feel free to reach out — our
              team will be in touch shortly.
            </p>
          )}
          <div className="faq-t__actions" data-fade>
            <Link to="/ellura/support" className="btn">
              Contact us
            </Link>
            <Link to="/ellura/faq" className="text-link">
              See all FAQs
            </Link>
          </div>
        </header>
        <Accordion className="faq-grid">
          {group.items.map((f) => (
            <AccordionItem key={f.id} title={f.q} variant="line" headingLevel="h3">
              {f.a.map((p, i) => (
                <p key={i}>
                  <Rich text={p} />
                </p>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
