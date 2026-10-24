import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { Icon } from './Icon';
import { SectionHeading } from './SectionHeading';

export function Reels() {
  const { s, t } = useLang();
  const { reels, agent } = content;
  return (
    <section className="section section-alt" aria-labelledby="reels-title">
      <div className="container">
        <div className="heading-row">
          <SectionHeading id="reels-title" eyebrow={s.reelsEyebrow} title={s.reelsTitle} />
          <a className="btn btn-outline" href={agent.instagram.url} target="_blank" rel="noopener noreferrer">
            <Icon name="instagram" size={18} />
            <span>{s.followInstagram}</span>
          </a>
        </div>
        <div className="reels">
          {reels.map((r) => (
            <a key={r.image} className="reel" href={r.url} target="_blank" rel="noopener noreferrer">
              <img src={r.image} alt="" loading="lazy" decoding="async" width={720} height={1280} />
              {r.video && (
                <span className="reel-play" aria-hidden="true">
                  <Icon name="play" size={16} />
                </span>
              )}
              <span className="reel-caption">{t(r.caption)}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
