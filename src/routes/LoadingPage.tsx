import { Loader2 } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
        <p className="text-sm text-gray-600">Loading, please wait...</p>
      </div>
    </div>
  );
}
