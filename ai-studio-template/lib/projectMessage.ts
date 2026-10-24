import type { UI } from '../data/ui';
import type { L, Project } from '../types';
import { content } from '../data/content';
import { firstName } from './utils';

/** WhatsApp label + prefilled message for a project: ready units ask for a viewing, launches for the brochure. */
export function projectCta(s: UI, t: (v: L) => string, p: Project) {
  const args = [firstName(t(content.agent.name)), t(p.name), t(p.location)] as const;
  return p.category === 'ready'
    ? { label: s.requestViewing, message: s.msgReady(...args) }
    : { label: s.requestBrochure, message: s.msgProject(...args) };
}
