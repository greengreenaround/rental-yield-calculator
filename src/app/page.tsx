"use client";

import { useState } from "react";
import { useCalculator } from "@/hooks/useCalculator";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorForm } from "@/components/form/CalculatorForm";
import { ResultsDashboard } from "@/components/results/ResultsDashboard";
import { LeadCapturePopup } from "@/components/LeadCapturePopup";

export default function HomePage() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const {
    input,
    result,
    updateRentalType,
    updateInvestment,
    updateRevenue,
    updatePlatformFees,
    updateOperatingCosts,
  } = useCalculator();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onOpenLeadForm={() => setShowLeadForm(true)} />
      <main className="mx-auto max-w-7xl px-4 py-6 lg:flex lg:gap-6">
        <div className="lg:w-[440px] lg:shrink-0">
          <CalculatorForm
            input={input}
            onUpdateRentalType={updateRentalType}
            onUpdateInvestment={updateInvestment}
            onUpdateRevenue={updateRevenue}
            onUpdatePlatformFees={updatePlatformFees}
            onUpdateOperatingCosts={updateOperatingCosts}
          />
        </div>
        <div className="mt-6 flex-1 lg:mt-0">
          <div className="lg:sticky lg:top-6">
            <ResultsDashboard input={input} result={result} />
          </div>
        </div>
      </main>
      <Footer />
      <LeadCapturePopup
        externalOpen={showLeadForm}
        onExternalClose={() => setShowLeadForm(false)}
      />
    </div>
  );
}
