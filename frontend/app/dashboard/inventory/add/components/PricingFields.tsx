import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  formData: any;
  onFieldChange: (field: string, value: string) => void;
}

export default function PricingFields({ formData, onFieldChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <Label htmlFor="price" className="text-sm font-medium text-gray-700">একক মূল্য (৳ প্রতি কেজি) *</Label>
        <Input
          id="price"
          type="number"
          min="1"
          step="0.01"
          placeholder="উদাঃ ৬৫.৫০"
          className="h-11 border-gray-200 focus-visible:ring-emerald-600"
          value={formData.price}
          onChange={(e) => onFieldChange('price', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">মজুদের পরিমাণ (কেজি) *</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          placeholder="উদাঃ ১২০০"
          className="h-11 border-gray-200 focus-visible:ring-emerald-600"
          value={formData.quantity}
          onChange={(e) => onFieldChange('quantity', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="harvestDate" className="text-sm font-medium text-gray-700">সংগ্রহের তারিখ *</Label>
        <Input
          id="harvestDate"
          type="date"
          className="h-11 border-gray-200 focus-visible:ring-emerald-600 text-gray-700"
          value={formData.harvestDate}
          onChange={(e) => onFieldChange('harvestDate', e.target.value)}
          required
        />
      </div>
    </div>
  );
}