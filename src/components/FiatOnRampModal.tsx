"use client";

import React, { useState } from "react";
import { X, CreditCard, TrendingUp } from "lucide-react";
import Button from "./ui/Button";
import useTransactionToast from "../lib/useTransactionToast";

interface FiatOnRampModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FiatOnRampModal({ isOpen, onClose }: FiatOnRampModalProps) {
  const [usdAmount, setUsdAmount] = useState<string>("");
  const toast = useTransactionToast();

  // Mock XLM price - in real implementation this would come from an API
  const mockXlmPrice = 0.084; // $0.084 per XLM
  const estimatedXlm = usdAmount && !isNaN(parseFloat(usdAmount)) 
    ? (parseFloat(usdAmount) / mockXlmPrice).toFixed(2)
    : "0.00";

  const handleContinue = () => {
    if (!usdAmount || parseFloat(usdAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    // Mock success - in real implementation this would integrate with MoonPay/Stripe
    toast.success(`Successfully initiated purchase of ${estimatedXlm} XLM for $${usdAmount}`);
    onClose();
    setUsdAmount("");
  };

  const handleClose = () => {
    onClose();
    setUsdAmount("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Buy Crypto</h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* USD Input */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              How much USD do you want to spend?
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                $
              </span>
              <input
                type="number"
                value={usdAmount}
                onChange={(e) => setUsdAmount(e.target.value)}
                placeholder="0.00"
                min="1"
                step="0.01"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-8 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-lg"
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Minimum: $10.00
            </p>
          </div>

          {/* Estimated XLM Output */}
          {usdAmount && parseFloat(usdAmount) > 0 && (
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-300">Estimated XLM you'll receive</span>
                </div>
                <span className="text-lg font-semibold text-white">
                  {estimatedXlm} XLM
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Based on current price: ${mockXlmPrice}/XLM
              </p>
            </div>
          )}

          {/* Provider Info */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-xs text-blue-400 text-center">
              Powered by MoonPay • Secure & instant crypto purchases
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!usdAmount || parseFloat(usdAmount) <= 0}
              className={`flex-1 ${
                !usdAmount || parseFloat(usdAmount) <= 0
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : ""
              }`}
            >
              Continue with Credit Card
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-xs text-slate-400">
              By continuing, you agree to MoonPay's Terms of Service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
