'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateInventoryMutation } from '@/store/slices/inventory.api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Loader2, Leaf } from 'lucide-react';

import FormHeader from './FormHeader';
import BasicInfoFields from './BasicInfoFields';
import PricingFields from './PricingFields';
import MediaFields from './MediaFields';

export default function AddInventoryWrapper() {
  const router = useRouter();
  const [createInventory, { isLoading }] = useCreateInventoryMutation();
  const [errorMsg, setErrorMsg] = useState('');


  const [formData, setFormData] = useState({
    title: '',
    cropType: 'rice',
    price: '',
    quantity: '',
    harvestDate: '',
    imageUrl: '',
    description: ''
  });

 
  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const payload = {
        title: formData.title,
        cropType: formData.cropType,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        harvestDate: new Date(formData.harvestDate).toISOString(),
        images: formData.imageUrl ? [formData.imageUrl] : [],
        description: formData.description,
      };

      await createInventory(payload).unwrap();
      router.push('/dashboard/inventory'); 
    } catch (err: any) {
      const errorResponse = err?.data?.message;
      if (Array.isArray(errorResponse)) {
        setErrorMsg(errorResponse.join(', '));
      } else {
        setErrorMsg(errorResponse || 'ফসল যোগ করতে সমস্যা হয়েছে।');
      }
    }
  };

  return (
    <>
      <FormHeader />

      <Card className="border-gray-100 shadow-sm bg-white">
        <CardHeader className="border-b border-gray-50 bg-gray-50/50">
          <CardTitle className="text-lg flex items-center gap-2">
            <Leaf className="h-5 w-5 text-emerald-600" />
            ফসলের বিস্তারিত তথ্য
          </CardTitle>
          <CardDescription>ফর্মের ফিল্ডগুলো সঠিকভাবে পূরণ করুন। (* চিহ্নিত ফিল্ডগুলো বাধ্যতামূলক)</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Modular Form Sections */}
            <BasicInfoFields formData={formData} onFieldChange={handleFieldChange} />
            <PricingFields formData={formData} onFieldChange={handleFieldChange} />
            <MediaFields formData={formData} onFieldChange={handleFieldChange} />

            {/* Error Message */}
            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-medium flex items-start gap-3">
                <span className="text-lg">⚠️</span>
                {errorMsg}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <Button 
                type="submit" 
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 shadow-sm hover:shadow-md transition-all" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" /> সেভ করা হচ্ছে...
                  </span>
                ) : (
                  'ফসল যুক্ত করুন'
                )}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </>
  );
}