import { Info } from 'lucide-react';

export default function SaveErrorBanner() {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-tertiary-fixed text-on-tertiary-fixed text-label-md">
      <Info size={16} strokeWidth={2} />
      <span>
        Your changes aren't saving on this device right now. Try enabling storage or leaving private
        browsing mode.
      </span>
    </div>
  );
}
