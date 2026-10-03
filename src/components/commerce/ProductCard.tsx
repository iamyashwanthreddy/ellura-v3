import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../commerce/cart';
import { PACK_TAG, productUrl, src, srcSet, toneOf } from '../../commerce/catalog';
import { formatINR, isPurchasable, mrpSaving, unitPrice } from '../../commerce/pricing';
import type { Product } from '../../commerce/types';
import Icon from '../ui/Icon';

/**
 * Product tile used by the shop grid, carousels and the mega menu.
 * Tinted stage + pack shot (multiply blend lets the cream photo background
 * take the tone), badges, price, and a quick-add that never blocks the link.
 */
export default function ProductCard({ product, priority = false, className = '' }: { product: Product; priority?: boolean; className?: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const price = unitPrice(product, 'one-time');
  const saving = mrpSaving(product);
  const purchasable = isPurchasable(product);

  const quickAdd = () => {
    add(product.sku, 1, 'one-time');
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className={`pcard pcard--${toneOf(product)} ${className}`}>
      <Link to={productUrl(product)} className="pcard__media" aria-label={`${product.shortName}, ${product.packLabel}`}>
        <span className="pcard__badges">
          <span className="chip chip--solid">{PACK_TAG[product.sku]}</span>
          {saving ? <span className="chip chip--save">Save {formatINR(saving)}</span> : null}
        </span>
        <img
          src={src(product.images[0], true)}
          srcSet={srcSet(product.images[0])}
          sizes="(max-width: 700px) 80vw, (max-width: 1100px) 40vw, 28vw"
          alt=""
          width={1400}
          height={1400}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className="pcard__capsules" aria-hidden="true">
          {product.capsules}
          <small>caps</small>
        </span>
      </Link>
      <div className="pcard__body">
        <h3 className="pcard__name">
          <Link to={productUrl(product)}>
            <span className="brand-word">ellura®</span> {product.packLabel}
          </Link>
        </h3>
        <p className="pcard__desc">{product.summary}</p>
        <div className="pcard__buy">
          {purchasable ? (
            <button className={`btn btn--ghost btn--block ${added ? 'is-added' : ''}`} onClick={quickAdd} aria-live="polite">
              {added ? (
                <>
                  <Icon name="check" size={18} /> Added
                </>
              ) : (
                <>
                  Add to cart <span aria-hidden="true">·</span> {formatINR(price!)}
                </>
              )}
            </button>
          ) : (
            <Link to={productUrl(product)} className="btn btn--ghost btn--block">
              Price at launch <Icon name="arrow" size={18} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
