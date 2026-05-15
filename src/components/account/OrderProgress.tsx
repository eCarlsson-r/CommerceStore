import { OrderWithRelations } from "@/lib/types";
import { useTranslations } from "next-intl";

export function OrderProgress({ order }: { order: OrderWithRelations }) {
  const t = useTranslations('account');
  const steps = order.delivery_details 
    ? [
        { id: 'pending', label: t('orderPlaced'), icon: 'Check' },
        { id: 'processing', label: t('preparing'), icon: 'Package' },
        { id: 'shipped', label: t('shipped'), icon: 'Truck' },
        { id: 'completed', label: t('delivered'), icon: 'Home' }
    ] : [
        { id: 'pending', label: t('orderPlaced'), icon: 'Check' },
        { id: 'processing', label: t('boutiquePreparing'), icon: 'Sparkles' },
        { id: 'shipped', label: t('readyAtBoutique'), icon: 'MapPin' },
        { id: 'completed', label: t('collected'), icon: 'Gift' }
    ];

  const currentStep = steps.findIndex(s => s.id === order.status);

  if (order.status === 'cancelled') {
    return (
      <div className="bg-red-50 border border-red-100 p-6 rounded-[2rem] flex items-center gap-4">
        <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shrink-0">
          <span className="font-black text-xl">!</span>
        </div>
        <div>
          <h4 className="text-xs font-black uppercase text-red-600">{t('orderCancelledTitle')}</h4>
          <p className="text-[10px] text-red-400 font-bold uppercase mt-1">
            {t('orderCancelledDescription')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full mt-3">
      <p className="text-[10px] text-gray-400 uppercase mt-1">
        {t('status')}
      </p>
      {steps.map((step, idx) => (
        <div key={step.id} className="flex flex-col items-center flex-1 relative">
          {/* Connector Line */}
          {idx !== 0 && (
            <div className={`absolute top-2.5 -left-1/2 w-full h-0.5 ${idx <= currentStep ? 'bg-primary' : 'bg-gray-100'}`} />
          )}
          {/* Step Circle */}
          <div className={`w-5 h-5 rounded-full z-10 border-4 border-white shadow-sm ${idx <= currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
          <span className={`text-[8px] font-black uppercase mt-2 tracking-tighter ${idx <= currentStep ? 'text-gray-900' : 'text-gray-300'}`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}