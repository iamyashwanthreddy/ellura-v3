import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, src, toneOf } from '../../commerce/catalog';
import { formatINR, unitPrice } from '../../commerce/pricing';
import ProductCard from '../../components/commerce/ProductCard';
import Icon from '../../components/ui/Icon';
import PageHero from '../../components/ui/PageHero';
import FaqTeaser from '../../components/home/FaqTeaser';
import { SectionHead, Tbc } from '../../components/ui/primitives';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';

export default function Shop() {
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  useMeta({
    title: 'Shop all ellura® packs',
    description: 'Shop ellura® urinary tract health capsules: 30 capsules, 90 capsules and the 180-capsule bundle. Subscribe & Save 10% with free shipping.',
  });

  return (
    <div ref={ref}>
      <PageHero
        tone="bone"
        crumbs={[{ label: 'Shop' }]}
        eyebrow="Shop all"
        title={
          <>
            One formula. <em>Three ways to stock up.</em>
          </>
        }
        lead="Every ellura capsule delivers 36 mg of soluble, bioactive A-type PACs from 100% concentrated cranberry fruit juice extract. Choose the supply that suits your routine."
        visual={
          <div className="phero__packs">
            {PRODUCTS.map((p, i) => (
              <span key={p.sku} className={`phero__pack pcard--${toneOf(p)}`} style={{ ['--i' as string]: i }}>
                <img src={src(p.images[0])} alt="" width={700} height={700} />
              </span>
            ))}
          </div>
        }
      />

      <section className="section section--tight" aria-labelledby="packs-h">
        <h2 id="packs-h" className="sr-only">
          ellura packs
        </h2>
        <div className="wrap">
          <ul className="shop-grid" role="list" data-stagger>
            {PRODUCTS.map((p, i) => (
              <li key={p.sku}>
                <ProductCard product={p} priority={i === 0} />
              </li>
            ))}
          </ul>
          <aside className="subband" data-fade>
            <div>
              <p className="eyebrow">Subscribe &amp; Save</p>
              <h2 className="t-d2">
                Subscribe once. <em>Save 10% every time.</em>
              </h2>
              <p className="t-lead">Deliveries arrive on your schedule with free shipping. Skip, pause or cancel anytime from your account.</p>
            </div>
            <div className="subband__cta">
              <Link to="/ellura/subscribe" className="btn btn--lg btn--white">
                How it works <Icon name="arrow" />
              </Link>
              <p className="t-xs">The 180-capsule bundle is one-time purchase only.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="compare-h">
        <div className="wrap wrap--narrow stack-lg">
          <SectionHead
            eyebrow="Compare"
            title={
              <span id="compare-h">
                Which pack is <em>right for you?</em>
              </span>
            }
            size="d3"
          />
          <div className="table-scroll" data-fade>
            <table className="compare">
              <caption className="sr-only">Comparison of ellura packs</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  {PRODUCTS.map((p) => (
                    <th key={p.sku} scope="col">
                      {p.packLabel}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Supply at 1 capsule a day</th>
                  {PRODUCTS.map((p) => (
                    <td key={p.sku}>{p.supply}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Bottles</th>
                  {PRODUCTS.map((p) => (
                    <td key={p.sku}>{p.bottles}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">PACs per capsule</th>
                  {PRODUCTS.map((p) => (
                    <td key={p.sku}>36 mg</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">One-time price</th>
                  {PRODUCTS.map((p) => {
                    const u = unitPrice(p, 'one-time');
                    return <td key={p.sku}>{u !== null ? formatINR(u) : <Tbc>India price</Tbc>}</td>;
                  })}
                </tr>
                <tr>
                  <th scope="row">Subscribe &amp; Save</th>
                  {PRODUCTS.map((p) => (
                    <td key={p.sku}>{p.subscription.eligible ? `10% off, every ${p.subscription.intervalMonths === 1 ? 'month' : `${p.subscription.intervalMonths} months`}` : 'Not available for bundles'}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="t-xs muted" data-fade>
            Prices are MRP-inclusive of all taxes. India pricing for the 90-capsule bottle and 180-capsule bundle will be announced at launch.
          </p>
        </div>
      </section>

      <FaqTeaser groupId="how-to-take" title="Before you buy" showIntro={false} />
    </div>
  );
}
