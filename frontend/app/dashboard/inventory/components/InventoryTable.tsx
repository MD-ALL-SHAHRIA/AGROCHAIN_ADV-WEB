'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDeleteInventoryMutation } from '@/store/slices/inventory.api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const categoryMap: Record<string, string> = {
  rice: 'ধান/চাল',
  wheat: 'গম',
  potato: 'আলু',
  vegetables: 'শাকসবজি',
  fruits: 'ফলমূল',
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Available':
      return <Badge className="bg-emerald-100 text-emerald-700 border-none font-semibold">অ্যাভেইলেবল</Badge>;
    case 'Reserved':
      return <Badge className="bg-amber-100 text-amber-700 border-none font-semibold">রিজার্ভড</Badge>;
    case 'Sold':
      return <Badge className="bg-blue-100 text-blue-700 border-none font-semibold">বিক্রি সম্পন্ন</Badge>;
    case 'Removed':
      return <Badge className="bg-red-100 text-red-700 border-none font-semibold">সরানো হয়েছে</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

interface Props {
  items: any[];
}

export default function InventoryTable({ items }: Props) {
  const [deleteInventory] = useDeleteInventoryMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ডিলিট হ্যান্ডলার
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteInventory(id).unwrap();
      // সফল হলে সুন্দর টোস্ট মেসেজ
      toast.success('সফলভাবে মুছে ফেলা হয়েছে!', {
        description: 'আপনার নির্বাচিত ফসলটি ইনভেন্টরি থেকে ডিলিট করা হয়েছে।'
      });
    } catch (error) {
      // ফেইল করলে এরর টোস্ট
      toast.error('সমস্যা হয়েছে!', {
        description: 'ফসলটি মুছে ফেলতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।'
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow>
            <TableHead className="w-[300px] font-semibold text-gray-700">ফসলের নাম</TableHead>
            <TableHead className="font-semibold text-gray-700">ধরণ</TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">পরিমাণ</TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">মূল্য</TableHead>
            <TableHead className="font-semibold text-gray-700 text-center">স্ট্যাটাস</TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">অ্যাকশন</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item: any) => (
            <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
              <TableCell className="font-medium text-gray-900">
                {item.title}
                <div className="text-xs text-gray-400 mt-1 font-normal">
                  সংগ্রহ: {new Date(item.harvestDate).toLocaleDateString('bn-BD')}
                </div>
              </TableCell>
              <TableCell className="text-gray-600 text-sm">
                {categoryMap[item.cropType] || item.cropType}
              </TableCell>
              <TableCell className="text-right font-medium text-gray-900">
                {Number(item.quantity).toLocaleString('bn-BD')} কেজি
              </TableCell>
              <TableCell className="text-right font-semibold text-emerald-600">
                ৳ {Number(item.price).toLocaleString('bn-BD')}
              </TableCell>
              <TableCell className="text-center">
                {getStatusBadge(item.status)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  
                  {/* Edit Button */}
                  <Link href={`/dashboard/inventory/edit/${item.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>

                  {/* Delete Confirmation Alert Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-600 hover:bg-red-50"
                        disabled={deletingId === item.id}
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
                        <AlertDialogDescription>
                          এই অ্যাকশনটি আর পরিবর্তন করা যাবে না। এটি আপনার ফসলটি ডাটাবেজ থেকে চিরতরে মুছে ফেলবে।
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>বাতিল করুন</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleDelete(item.id)}
                        >
                          হ্যাঁ, মুছে ফেলুন
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}