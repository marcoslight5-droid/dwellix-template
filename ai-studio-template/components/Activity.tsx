import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { Icon } from './Icon';

/** Recognition & activity list, plus a strip of his real Instagram posts. */
export function Activity() {
  const { s, t } = useLang();
  const { milestones, reels, agent } = content;
  return (
    <section className="section" aria-labelledby="activity-title">
      <div className="container">
        <div className="section-head">
          <h2 id="activity-title">{s.milestonesTitle}</h2>
        </div>
        <ul className="ledger">
          {milestones.map((m) => {
            const body = (
              <>
                <span className="ledger-when">{t(m.when)}</span>
                <span className="ledger-main">
                  <span className="ledger-title">{t(m.title)}</span>
                  {m.detail && <span className="ledger-detail">{t(m.detail)}</span>}
                </span>
                {m.url && (
                  <span className="ledger-go" aria-hidden="true">
                    <Icon name="arrow" size={18} />
                  </span>
                )}
              </>
            );
            return (
              <li key={m.title.en}>
                {m.url ? (
                  <a className="ledger-row" href={m.url} target="_blank" rel="noopener noreferrer">
                    {body}
                  </a>
                ) : (
                  <div className="ledger-row">{body}</div>
                )}
              </li>
            );
          })}
        </ul>

        {reels.length > 0 && (
          <>
            <div className="strip-head">
              <h3 className="label">{s.instagramTitle}</h3>
              <a className="link" href={agent.instagram.url} target="_blank" rel="noopener noreferrer">
                <bdi>{agent.instagram.handle}</bdi>
                <Icon name="arrow" size={16} />
              </a>
            </div>
            <div className="strip">
              {reels.map((r) => (
                <a key={r.image} className="strip-item" href={r.url} target="_blank" rel="noopener noreferrer">
                  <img src={r.image} alt="" loading="lazy" decoding="async" width={534} height={710} />
                  <span>{t(r.caption)}</span>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
