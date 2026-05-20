import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud } from 'lucide-react';

interface Props {
  formData: any;
  onFieldChange: (field: string, value: string) => void;
}

export default function MediaFields({ formData, onFieldChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="imageUrl" className="text-sm font-medium text-gray-700">ফসলের ছবির URL (ঐচ্ছিক)</Label>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Input
              id="imageUrl"
              placeholder="https://example.com/image.jpg"
              className="h-11 border-gray-200 focus-visible:ring-emerald-600 pl-10"
              value={formData.imageUrl}
              onChange={(e) => onFieldChange('imageUrl', e.target.value)}
            />
            <UploadCloud className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-gray-700">বিস্তারিত বিবরণ (ঐচ্ছিক)</Label>
        <Textarea
          id="description"
          placeholder="আপনার ফসল সম্পর্কে বিস্তারিত লিখুন..."
          className="min-h-[120px] border-gray-200 focus-visible:ring-emerald-600 resize-y"
          value={formData.description}
          onChange={(e) => onFieldChange('description', e.target.value)}
        />
      </div>
    </div>
  );
}