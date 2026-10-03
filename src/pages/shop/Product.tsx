import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../commerce/cart';
import { getProduct, PRICING_VERIFIED, PRODUCTS, productUrl, src, toneOf } from '../../commerce/catalog';
import { canSubscribe, formatINR, isPurchasable, unitPrice } from '../../commerce/pricing';
import BuyBox from '../../components/product/BuyBox';
import Gallery from '../../components/product/Gallery';
import ProductDetails from '../../components/product/ProductDetails';
import ReviewsWidget from '../../components/product/ReviewsWidget';
import FaqTeaser from '../../components/home/FaqTeaser';
import HowItWorksStory from '../../components/home/HowItWorksStory';
import { Crumbs } from '../../components/ui/PageHero';
import Icon from '../../components/ui/Icon';
import ProductCard from '../../components/commerce/ProductCard';
import { SITE_URL, useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import { ScrollTrigger } from '../../lib/gsap';
import NotFound from '../NotFound';

function BuyBar({ sku }: { sku: string }) {
  const p = getProduct(sku)!;
  const { add } = useCart();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const target = document.getElementById('buy');
    if (!target) return;
    const st = ScrollTrigger.create({
      trigger: target,
      start: 'bottom top+=80',
      endTrigger: '#reviews',
      end: 'bottom bottom',
      onToggle: (self) => setVisible(self.isActive),
    });
    return () => st.kill();
  }, [sku]);
  const purchase = canSubscribe(p) ? 'subscription' : 'one-time';
  const price = unitPrice(p, purchase);
  return (
    <div className={`buybar ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <div className="wrap buybar__inner">
        <img className="buybar__img" src={src(p.images[0])} alt="" width={48} height={48} />
        <div className="buybar__info">
          <strong>
            {p.shortName} · {p.packLabel}
          </strong>
          <span>{price !== null ? `${formatINR(price)}${purchase === 'subscription' ? ' with Subscribe & Save' : ''}` : 'Price at launch'}</span>
        </div>
        {isPurchasable(p) ? (
          <button className="btn" tabIndex={visible ? 0 : -1} onClick={() => add(p.sku, 1, purchase)}>
            <Icon name="bag" /> Add to cart
          </button>
        ) : (
          <a href="#buy" className="btn btn--ghost" tabIndex={visible ? 0 : -1}>
            Notify me
          </a>
        )}
      </div>
    </div>
  );
}

export default function Product() {
  const { handle } = useParams();
  const product = getProduct(handle);
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref, [handle]);

  useMeta({
    title: product ? `${product.shortName} — ${product.packLabel}` : 'Product not found',
    description: product
      ? `ellura® ${product.packLabel} (${product.supply}): 36 mg of soluble, bioactive A-type PACs from 100% concentrated cranberry fruit juice extract per capsule.`
      : 'This product could not be found.',
    type: 'product',
    image: product ? `${product.images[0].base}-1400.webp` : undefined,
    noindex: !product,
    jsonLd: product
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          sku: product.sku,
          image: product.images.slice(0, 3).map((i) => `${SITE_URL}${i.base}-1400.webp`),
          description:
            'Dietary supplement delivering 36 mg of soluble, bioactive A-type proanthocyanidins (PACs) from 206 mg concentrated cranberry fruit juice extract powder (Gikacran®) per capsule.',
          brand: { '@type': 'Brand', name: 'ellura' },
          manufacturer: { '@type': 'Organization', name: 'Pharmatoka' },
          // Offers are emitted only once India pricing is verified (catalog.PRICING_VERIFIED).
          ...(PRICING_VERIFIED && product.price !== null
            ? { offers: { '@type': 'Offer', priceCurrency: 'INR', price: product.price, availability: 'https://schema.org/InStock', url: SITE_URL + productUrl(product) } }
            : {}),
        }
      : undefined,
  });

  if (!product) return <NotFound />;
  const others = PRODUCTS.filter((p) => p.sku !== product.sku);

  return (
    <div ref={ref}>
      <section className="pdp">
        <div className="wrap">
          <div className="pdp__crumbs">
            <Crumbs items={[{ label: 'ellura', to: '/ellura' }, { label: 'Shop', to: '/ellura/shop' }, { label: product.packLabel }]} />
          </div>
          <div className="pdp__top">
            <Gallery images={product.images} productKey={product.sku} tone={toneOf(product)} />
            <BuyBox product={product} />
          </div>
        </div>
      </section>

      <ProductDetails product={product} />
      <HowItWorksStory headingId="pdp-hiw" compact />

      <section className="pdp-section">
        <div className="wrap">
          <ReviewsWidget sku={product.sku} />
        </div>
      </section>

      <FaqTeaser />

      <section className="pdp-section" aria-labelledby="other-packs">
        <div className="wrap">
          <h2 id="other-packs" className="t-d2" data-split style={{ marginBottom: 28 }}>
            Other ways <em>to buy</em>
          </h2>
          <ul className="shop-grid shop-grid--2" role="list" data-stagger>
            {others.map((p) => (
              <li key={p.sku}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <BuyBar sku={product.sku} />
    </div>
  );
}
