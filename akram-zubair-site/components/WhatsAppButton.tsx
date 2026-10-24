import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { whatsappLink } from '../lib/utils';
import { Icon } from './Icon';

interface Props {
  message: string;
  label?: string;
  variant?: 'primary' | 'outline' | 'small';
  className?: string;
}

export function WhatsAppButton({ message, label, variant = 'primary', className = '' }: Props) {
  const { s } = useLang();
  return (
    <a
      className={`btn btn-${variant} ${className}`}
      href={whatsappLink(content.agent.whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="whatsapp" size={variant === 'small' ? 18 : 20} />
      <span>{label ?? s.chatWhatsapp}</span>
    </a>
  );
}
