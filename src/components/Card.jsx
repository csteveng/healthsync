export default function Card({ children, className = '', highlight = false, ...props }) {
  return (
    <div
      className={[
        'bg-surface-container-lowest rounded-xl shadow-card p-5 md:p-6',
        highlight ? 'border border-tertiary/30' : 'border border-transparent',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
