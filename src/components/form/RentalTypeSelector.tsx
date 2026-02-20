import type { RentalType } from "@/types/calculator";

interface RentalTypeSelectorProps {
  value: RentalType;
  onChange: (type: RentalType) => void;
}

const tabs: { value: RentalType; label: string; description: string }[] = [
  { value: "airbnb", label: "에어비앤비", description: "1일 단위 숙박" },
  { value: "shortTerm", label: "단기임대", description: "7일 단위 임대" },
];

export function RentalTypeSelector({
  value,
  onChange,
}: RentalTypeSelectorProps) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex-1 rounded-lg px-4 py-3 text-center transition-all ${
            value === tab.value
              ? "bg-blue-500 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          <div className="text-sm font-semibold">{tab.label}</div>
          <div
            className={`text-xs ${value === tab.value ? "text-blue-100" : "text-gray-400"}`}
          >
            {tab.description}
          </div>
        </button>
      ))}
    </div>
  );
}
