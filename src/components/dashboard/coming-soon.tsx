import { Construction } from "lucide-react";

export function ComingSoon({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-5">
        <Construction className="w-7 h-7 text-slate-400" />
      </div>
      <h2 className="text-lg font-bold text-slate-700 mb-2">{title}</h2>
      <p className="text-sm text-slate-500 max-w-sm">
        {description || "This section is fully functional in the complete platform. The data structure and API endpoints are already planned and ready to connect."}
      </p>
    </div>
  );
}
