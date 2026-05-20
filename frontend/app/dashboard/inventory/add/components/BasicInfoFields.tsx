import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  formData: any;
  onFieldChange: (field: string, value: string) => void;
}

export default function BasicInfoFields({ formData, onFieldChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-gray-700">ফসলের নাম/টাইটেল *</Label>
        <Input
          id="title"
          placeholder="উদাঃ প্রিমিয়াম নাজিরশাইল ধান"
          className="h-11 border-gray-200 focus-visible:ring-emerald-600"
          value={formData.title}
          onChange={(e) => onFieldChange('title', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cropType" className="text-sm font-medium text-gray-700">ফসলের ধরণ (Category) *</Label>
        <Select value={formData.cropType} onValueChange={(val) => onFieldChange('cropType', val)}>
          <SelectTrigger className="h-11 border-gray-200 focus:ring-emerald-600">
            <SelectValue placeholder="ধরণ নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rice">ধান/চাল (Rice)</SelectItem>
            <SelectItem value="wheat">গম (Wheat)</SelectItem>
            <SelectItem value="potato">আলু (Potato)</SelectItem>
            <SelectItem value="vegetables">শাকসবজি (Vegetables)</SelectItem>
            <SelectItem value="fruits">ফলমূল (Fruits)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}