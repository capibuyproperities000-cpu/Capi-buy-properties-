import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BRAND } from '../data/constants';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Pop-up bubble */}
      {showTooltip && (
        <div className="mb-2 bg-neutral-900 text-white text-xs px-3.5 py-2 rounded-lg shadow-xl border border-neutral-700 max-w-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span>Need quick property assistance in Islamabad? Chat with us on WhatsApp.</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-white p-0.5 rounded-sm"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        id="floating-whatsapp-btn"
        href={`https://wa.me/923360566035?text=${encodeURIComponent(BRAND.defaultWhatsAppMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
        aria-label="Chat on WhatsApp with Capi Buy Properties"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="font-semibold text-sm tracking-wide pr-1 hidden sm:inline-block">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
};
