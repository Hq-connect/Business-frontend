import { User, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";

export default function Step2OwnerCredentials({
  formData,
  errors,
  onChange,
}) {
  return (
    <CardContent className="space-y-6 pt-6 w-full">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider">
          <User size={15} className="text-zinc-500" />
          2. Owner Account & Security
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Owner First Name */}
          <div className="space-y-1.5">
            <Label htmlFor="ownerFirstName">First Name *</Label>
            <Input
              id="ownerFirstName"
              placeholder="Alex"
              value={formData.ownerFirstName}
              onChange={(e) => onChange("ownerFirstName", e.target.value)}
              className={errors.ownerFirstName ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.ownerFirstName && (
              <p className="text-[11px] font-medium text-red-500">{errors.ownerFirstName}</p>
            )}
          </div>

          {/* Owner Last Name */}
          <div className="space-y-1.5">
            <Label htmlFor="ownerLastName">Last Name (Optional)</Label>
            <Input
              id="ownerLastName"
              placeholder="Morgan"
              value={formData.ownerLastName}
              onChange={(e) => onChange("ownerLastName", e.target.value)}
              className={errors.ownerLastName ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.ownerLastName && (
              <p className="text-[11px] font-medium text-red-500">{errors.ownerLastName}</p>
            )}
          </div>
        </div>

        {/* Owner Email */}
        <div className="space-y-1.5">
          <Label htmlFor="ownerEmail">Work Email *</Label>
          <div className="relative">
            <Input
              id="ownerEmail"
              type="email"
              placeholder="alex@acme.com"
              value={formData.ownerEmail}
              onChange={(e) => onChange("ownerEmail", e.target.value)}
              className={`pl-9 ${errors.ownerEmail ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            <Mail size={15} className="absolute left-3 top-2.5 text-zinc-400" />
          </div>
          {errors.ownerEmail && <p className="text-[11px] font-medium text-red-500">{errors.ownerEmail}</p>}
        </div>

        {/* Owner Password */}
        <div className="space-y-1.5">
          <Label htmlFor="ownerPassword">Password *</Label>
          <div className="relative">
            <Input
              id="ownerPassword"
              type="password"
              placeholder="••••••••••••"
              value={formData.ownerPassword}
              onChange={(e) => onChange("ownerPassword", e.target.value)}
              className={`pl-9 ${errors.ownerPassword ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            <Lock size={15} className="absolute left-3 top-2.5 text-zinc-400" />
          </div>
          {errors.ownerPassword ? (
            <p className="text-[11px] font-medium text-red-500">{errors.ownerPassword}</p>
          ) : (
            <p className="text-[11px] text-zinc-400">Must be between 8 and 128 characters</p>
          )}
        </div>
      </div>
    </CardContent>
  );
}
