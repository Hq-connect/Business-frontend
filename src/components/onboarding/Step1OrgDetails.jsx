import { Building2, Sliders } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CardContent } from "@/components/ui/card";

export default function Step1OrgDetails({
  formData,
  errors,
  autoSlug,
  onNameChange,
  onSlugChange,
  onSettingsChange,
}) {
  return (
    <CardContent className="space-y-6 pt-6 w-full">

      {/* Organization Information */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider">
          <Building2 size={15} className="text-zinc-500" />
          1. Organization Details
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Organization Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Organization Name *</Label>
            <Input
              id="name"
              placeholder="Acme Corp"
              value={formData.name}
              onChange={onNameChange}
              className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.name && <p className="text-[11px] font-medium text-red-500">{errors.name}</p>}
          </div>

          {/* Tenant Slug */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="slug">Workspace Subdomain *</Label>
              {autoSlug && formData.slug && (
                <span className="text-[10px] text-emerald-600 font-medium">auto-generated</span>
              )}
            </div>
            <div className="relative">
              <Input
                id="slug"
                placeholder="acme-corp"
                value={formData.slug}
                onChange={onSlugChange}
                className={`pr-16 ${errors.slug ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              <span className="absolute right-3 top-2.5 text-xs font-mono text-zinc-400 pointer-events-none">
                .hq.com
              </span>
            </div>
            {errors.slug && <p className="text-[11px] font-medium text-red-500">{errors.slug}</p>}
          </div>
        </div>
      </div>

      <div className="h-px bg-zinc-100" />

      {/* Settings (Timezone & Language) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider">
          <Sliders size={15} className="text-zinc-500" />
          Tenant Preferences
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Timezone */}
          <div className="space-y-1.5">
            <Label htmlFor="timezone">Default Timezone</Label>
            <Select
              value={formData.settings.timezone}
              onValueChange={(val) => onSettingsChange("timezone", val)}
            >
              <SelectTrigger className="w-full h-10 bg-white">
                <SelectValue placeholder="Select Timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC (Universal Coordinated Time)</SelectItem>
                <SelectItem value="America/New_York">EST (Eastern Standard Time)</SelectItem>
                <SelectItem value="America/Los_Angeles">PST (Pacific Standard Time)</SelectItem>
                <SelectItem value="Europe/London">GMT (Greenwich Mean Time)</SelectItem>
                <SelectItem value="Asia/Kolkata">IST (Indian Standard Time)</SelectItem>
                <SelectItem value="Asia/Tokyo">JST (Japan Standard Time)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language */}
          <div className="space-y-1.5">
            <Label htmlFor="language">Primary Language</Label>
            <Select
              value={formData.settings.language}
              onValueChange={(val) => onSettingsChange("language", val)}
            >
              <SelectTrigger className="w-full h-10 bg-white">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (en)</SelectItem>
                <SelectItem value="es">Spanish (es)</SelectItem>
                <SelectItem value="fr">French (fr)</SelectItem>
                <SelectItem value="de">German (de)</SelectItem>
                <SelectItem value="ja">Japanese (ja)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </CardContent>
  );
}
