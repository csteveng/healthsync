export default function BarSparkline({ values, highlightLast = true }) {
  if (!values || values.length === 0) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-1.5 h-16">
      {values.map((v, i) => {
        const heightPct = 25 + ((v - min) / range) * 75; // keep bars visible even near-flat
        const isLast = highlightLast && i === values.length - 1;
        return (
          <div
            key={i}
            className={['flex-1 rounded-sm', isLast ? 'bg-primary' : 'bg-primary-fixed-dim/70'].join(' ')}
            style={{ height: `${heightPct}%` }}
          />
        );
      })}
    </div>
  );
}
