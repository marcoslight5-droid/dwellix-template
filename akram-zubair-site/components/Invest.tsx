import { useState, type FormEvent } from 'react';
import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { firstName, formatNumber, whatsappLink } from '../lib/utils';
import { Icon } from './Icon';
import { SectionHeading } from './SectionHeading';

function YieldCalculator() {
  const { s, lang } = useLang();
  const [price, setPrice] = useState(2000000);
  const [rent, setRent] = useState(140000);
  const [costs, setCosts] = useState(20000);

  const gross = price > 0 ? (rent / price) * 100 : 0;
  const net = price > 0 ? ((rent - costs) / price) * 100 : 0;

  const field = (label: string, value: number, set: (n: number) => void, step: number) => (
    <label className="field">
      <span>{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        step={step}
        value={value}
        onChange={(e) => set(Math.max(0, Number(e.target.value) || 0))}
        dir="ltr"
      />
    </label>
  );

  return (
    <div className="panel">
      <h3>{s.calcTitle}</h3>
      <p className="muted">{s.calcLead}</p>
      <div className="calc-fields">
        {field(s.calcPrice, price, setPrice, 50000)}
        {field(s.calcRent, rent, setRent, 5000)}
        {field(s.calcCosts, costs, setCosts, 1000)}
      </div>
      <dl className="calc-results" aria-live="polite">
        <div>
          <dt>{s.calcGross}</dt>
          <dd>
            <bdi>{formatNumber(gross, 1)}%</bdi>
          </dd>
        </div>
        <div>
          <dt>{s.calcNet}</dt>
          <dd>
            <bdi>{formatNumber(net, 1)}%</bdi>
          </dd>
        </div>
        <div>
          <dt>{s.calcNetIncome}</dt>
          <dd>
            <bdi>{lang === 'ar' ? `${formatNumber(rent - costs)} درهم` : `AED ${formatNumber(rent - costs)}`}</bdi>
          </dd>
        </div>
      </dl>
      <p className="fine">{s.calcNote}</p>
    </div>
  );
}

function ConsultationForm() {
  const { s, t } = useLang();
  const goals = Object.values(s.form.goals);
  const [form, setForm] = useState({ name: '', goal: 0, budget: 1, timeline: 1 });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = s.msgConsult(firstName(t(content.agent.name)), {
      name: form.name.trim(),
      goal: goals[form.goal],
      budget: s.form.budgets[form.budget],
      timeline: s.form.timelines[form.timeline],
    });
    window.open(whatsappLink(content.agent.whatsapp, text), '_blank', 'noopener');
  };

  const select = (label: string, options: readonly string[], key: 'goal' | 'budget' | 'timeline') => (
    <label className="field">
      <span>{label}</span>
      <select value={form[key]} onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })}>
        {options.map((o, i) => (
          <option key={o} value={i}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <form className="panel panel-accent" onSubmit={submit}>
      <h3>{s.consultTitle}</h3>
      <p className="muted">{s.consultLead}</p>
      <label className="field">
        <span>{s.form.name}</span>
        <input type="text" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </label>
      {select(s.form.goal, goals, 'goal')}
      <div className="field-row">
        {select(s.form.budget, s.form.budgets, 'budget')}
        {select(s.form.timeline, s.form.timelines, 'timeline')}
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        <Icon name="whatsapp" />
        <span>{s.form.submit}</span>
      </button>
    </form>
  );
}

export function Invest() {
  const { s, t } = useLang();
  return (
    <section className="section section-alt" id="invest" aria-labelledby="invest-title">
      <div className="container">
        <SectionHeading id="invest-title" eyebrow={s.investEyebrow} title={s.investTitle} />
        <div className="reasons">
          {content.investReasons.map((r) => (
            <article key={r.title.en} className="reason">
              <Icon name={r.icon} size={22} />
              <div>
                <h3>{t(r.title)}</h3>
                <p>{t(r.text)}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="invest-tools">
          <YieldCalculator />
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
