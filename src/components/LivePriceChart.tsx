"use client";

import React, { useEffect, useRef } from "react";

// Simulate a heavy charting library (e.g., lightweight-charts)
// In a real app, you would import and use the actual library here
const MOCK_HEavyLibrary = () => {
  // Simulate heavy initialization
  const start = Date.now();
  while (Date.now() - start < 300) {
    // Busy-wait to mimic a large bundle parsing/init
  }
};

export default function LivePriceChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate heavy library initialization
    MOCK_HEavyLibrary();

    // Mock chart rendering (in reality, you'd call the chart library API)
    if (containerRef.current) {
      containerRef.current.innerHTML = `
        <div class="w-full h-full bg-slate-900 rounded-lg border border-slate-700 flex items-center justify-center">
          <div class="text-center">
            <p class="text-slate-400 text-sm mb-2">Live Price Chart (Pro Mode)</p>
            <p class="text-blue-400 font-mono text-xs">BTC/USDC $67,421.35</p>
            <div class="mt-2 text-xs text-slate-500">Mock TradingView Widget</div>
          </div>
        </div>
      `;
    }
  }, []);

  return (
    <div className="w-full h-96 bg-slate-800/50 rounded-xl border border-slate-700/50" ref={containerRef}>
      {/* Chart will be rendered here */}
    </div>
  );
}
