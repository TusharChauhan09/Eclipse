export type SectionId = 'install' | 'commands' | 'pricing' | 'support';

const items: { id: SectionId; label: string; num: string }[] = [
  { id: 'install', num: '01', label: 'INSTALL' },
  { id: 'commands', num: '02', label: 'COMMANDS' },
  { id: 'pricing', num: '03', label: 'PRICING' },
  { id: 'support', num: '04', label: 'HELP & SUPPORT' },
];

interface Props {
  active: SectionId | null;
  onSelect: (id: SectionId) => void;
}

export default function IndexNav({ active, onSelect }: Props) {
  return (
    <nav className="index-nav">
      <span className="meta-label">CLI_DOCS</span>
      <ul className="index-list">
        {items.map(({ id, num, label }) => (
          <li key={id}>
            <a
              href="#"
              className={active === id ? 'nav-active' : ''}
              onClick={(e) => {
                e.preventDefault();
                onSelect(id);
              }}
            >
              <span>{num}. {label}</span>
              <span className="nav-indicator">›</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
