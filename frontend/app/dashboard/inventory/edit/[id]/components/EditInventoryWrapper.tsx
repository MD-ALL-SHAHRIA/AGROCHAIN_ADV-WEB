'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGetInventoryByIdQuery, useUpdateInventoryMutation } from '@/store/slices/inventory.api';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

// UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, ArrowLeft, Leaf, Save } from 'lucide-react';
import Link from 'next/link';

// Shadcn Form Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// 🛡️ Zod Validation Schema Spec
const editInventorySchema = z.object({
  title: z.string().min(3, { message: 'টাইটেল অন্তত ৩ অক্ষরের হতে হবে' }).max(150),
  cropType: z.string().min(1, { message: 'ফসলের ধরণ নির্বাচন করুন' }),
  price: z.coerce.number().min(1, { message: 'মূল্য সর্বনিম্ন ১ টাকা হতে হবে' }),
  quantity: z.coerce.number().min(1, { message: 'পরিমাণ সর্বনিম্ন ১ কেজি হতে হবে' }),
  harvestDate: z.string().min(1, { message: 'ফসল সংগ্রহের তারিখ আবশ্যক' }),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
});

type EditFormValues = z.infer<typeof editInventorySchema>;

export default function EditInventoryWrapper() {
  const router = useRouter();
  
  // ✅ Next.js এর useParams থেকে সরাসরি ID নেওয়া হলো
  const params = useParams();
  const id = params?.id as string;
  
  // 🔄 Fetching data (✅ ID না পাওয়া পর্যন্ত API কল বন্ধ রাখতে 'skip' যুক্ত করা হলো)
  const { 
    data: inventory, 
    isLoading: isFetching, 
    isError 
  } = useGetInventoryByIdQuery(id, {
    skip: !id || id === 'undefined', 
  });
  
  const [updateInventory, { isLoading: isUpdating }] = useUpdateInventoryMutation();

  // 📝 React Hook Form initialized with Zod Resolver
  const form = useForm<EditFormValues>({
    resolver: zodResolver(editInventorySchema),
    defaultValues: {
      title: '',
      cropType: '',
      price: 0,
      quantity: 0,
      harvestDate: '',
      imageUrl: '',
      description: '',
    },
  });

  // 🔄 Pre-fill form values when data arrives from Backend
  useEffect(() => {
    if (inventory) {
      form.reset({
        title: inventory.title || '',
        cropType: inventory.cropType || '',
        price: Number(inventory.price) || 0,
        quantity: Number(inventory.quantity) || 0,
        harvestDate: inventory.harvestDate ? inventory.harvestDate.split('T')[0] : '',
        imageUrl: inventory.images && inventory.images.length > 0 ? inventory.images[0] : '',
        description: inventory.description || '',
      });
    }
  }, [inventory, form]);

  // 🚀 Form Submit Handler
  const onSubmit: SubmitHandler<EditFormValues> = async (values) => {
    try {
      await updateInventory({
        id,
        title: values.title,
        cropType: values.cropType,
        price: Number(values.price),
        quantity: Number(values.quantity),
        harvestDate: new Date(values.harvestDate).toISOString(),
        images: values.imageUrl ? [values.imageUrl] : [],
        description: values.description,
      }).unwrap();

      toast.success('সফলভাবে সংশোধন করা হয়েছে!', {
        description: 'আপনার ফসলের তথ্য আপডেট করা সম্পন্ন হয়েছে।',
      });
      router.push('/dashboard/inventory');
    } catch (err: any) {
      toast.error('সংশোধন ব্যর্থ হয়েছে!', {
        description: err?.data?.message || 'অনুগ্রহ করে পুনরায় চেষ্টা করুন।',
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-emerald-600">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-medium text-gray-500 text-sm">ফসলের তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (isError || !inventory) {
    return (
      <div className="text-center py-24 bg-white rounded-2xl border border-red-100 p-6">
        <p className="text-red-500 font-semibold">⚠️ ফসলের তথ্য খুঁজে পাওয়া যায়নি বা কোনো সমস্যা হয়েছে!</p>
        <Link href="/dashboard/inventory" className="mt-4 inline-block">
          <Button variant="outline">ইনভেন্টরিতে ফিরে যান</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Header UI */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/inventory">
          <Button variant="outline" size="icon" className="h-10 w-10 bg-white border-gray-200">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">ফসল সংশোধন করুন</h1>
          <p className="text-sm text-gray-500 mt-1">মজুদকৃত ফসলটির বর্তমান প্যারামিটারসমূহ আপডেট করুন</p>
        </div>
      </div>

      <Card className="border-gray-100 shadow-sm bg-white">
        <CardHeader className="border-b border-gray-50 bg-gray-50/50">
          <CardTitle className="text-lg flex items-center gap-2">
            <Leaf className="h-5 w-5 text-emerald-600" />
            ফসল ডেটা এডিটর
          </CardTitle>
          <CardDescription>Zod দ্বারা সুরক্ষিত রিয়েল-টাইম ডাটা ভ্যালিডেশন মোড একটিভ আছে</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">ফসলের নাম/টাইটেল *</FormLabel>
                      <FormControl>
                        <Input placeholder="উদাঃ প্রিমিয়াম নাজিরশাইল ধান" className="border-gray-200 focus-visible:ring-emerald-600 h-11" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Crop Type Select */}
                <FormField
                  control={form.control}
                  name="cropType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">ফসলের ধরণ (Category) *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-gray-200 focus:ring-emerald-600 h-11">
                            <SelectValue placeholder="ধরণ নির্বাচন করুন" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="rice">ধান/চাল (Rice)</SelectItem>
                          <SelectItem value="wheat">গম (Wheat)</SelectItem>
                          <SelectItem value="potato">আলু (Potato)</SelectItem>
                          <SelectItem value="vegetables">শাকসবজি (Vegetables)</SelectItem>
                          <SelectItem value="fruits">ফলমূল (Fruits)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">একক মূল্য (৳ প্রতি কেজি) *</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" className="border-gray-200 focus-visible:ring-emerald-600 h-11" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Quantity */}
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">মজুদের পরিমাণ (কেজি) *</FormLabel>
                      <FormControl>
                        <Input type="number" className="border-gray-200 focus-visible:ring-emerald-600 h-11" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Harvest Date */}
                <FormField
                  control={form.control}
                  name="harvestDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">সংগ্রহের তারিখ *</FormLabel>
                      <FormControl>
                        <Input type="date" className="border-gray-200 focus-visible:ring-emerald-600 h-11" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Image URL */}
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">ফসলের ছবির URL (ঐচ্ছিক)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" className="border-gray-200 focus-visible:ring-emerald-600 h-11" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">বিস্তারিত বিবরণ (ঐচ্ছিক)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="আপনার ফসল সম্পর্কে বিস্তারিত লিখুন..." className="min-h-[120px] border-gray-200 focus-visible:ring-emerald-600 resize-y" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Submit Control */}
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 shadow-sm flex items-center gap-2" 
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> আপডেট হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" /> পরিবর্তনগুলো সংরক্ষণ করুন
                    </>
                  )}
                </Button>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}