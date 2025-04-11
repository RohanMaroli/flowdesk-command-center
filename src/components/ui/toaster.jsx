
import React from 'react';
import { useToast } from '../../hooks/use-toast';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Toaster() {
  const { toasts, setToasts } = useToast();

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-0 right-0 z-50 flex flex-col items-end gap-2 p-4 max-h-screen overflow-hidden">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex w-full max-w-md overflow-hidden rounded-lg shadow-lg pointer-events-auto transition-all duration-300 ease-in-out",
            toast.variant === 'destructive' ? 'bg-red-600 text-white' : 'bg-white text-gray-900'
          )}
        >
          <div className="flex-1 p-4">
            <div className="flex items-start">
              <div className="ml-3 w-0 flex-1">
                {toast.title && (
                  <p className="text-sm font-medium">{toast.title}</p>
                )}
                {toast.description && (
                  <p className="mt-1 text-sm opacity-90">{toast.description}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => removeToast(toast.id)}
              className="flex items-center justify-center w-10 h-10 rounded-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
