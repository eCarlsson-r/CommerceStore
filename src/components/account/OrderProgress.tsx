export function OrderProgress({ status }: { status: string }) {
  const steps = ["PENDING", "PROCESSING", "READY", "COMPLETED"];
  const currentStep = steps.indexOf(status);

  return (
    <div className="flex items-center justify-between w-full mt-6">
      {steps.map((step, idx) => (
        <div key={step} className="flex flex-col items-center flex-1 relative">
          {/* Connector Line */}
          {idx !== 0 && (
            <div className={`absolute top-2.5 -left-1/2 w-full h-0.5 ${idx <= currentStep ? 'bg-primary' : 'bg-gray-100'}`} />
          )}
          {/* Step Circle */}
          <div className={`w-5 h-5 rounded-full z-10 border-4 border-white shadow-sm ${idx <= currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
          <span className={`text-[8px] font-black uppercase mt-2 tracking-tighter ${idx <= currentStep ? 'text-gray-900' : 'text-gray-300'}`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}