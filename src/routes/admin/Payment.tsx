import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import type { Payment } from '@/services/useUser';
import axios from 'axios';
import LoadingPage from '../LoadingPage';

const ITEMS_PER_PAGE = 10;

export default function PaymentPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [payment, setPayment] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [dailyIncome, setDailyIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  useEffect(() => {
    async function fetchPayment() {
      setLoading(true);
      try {
        const res = await axios.post(
          'https://bodymaster-backend.vercel.app/member/getpayment',
          { selectedDate: selectedDate.toISOString() },
          {
            params: {
              page,
              limit: ITEMS_PER_PAGE,
            },
          }
        );
        console.log(res);
        setPayment(res.data.members);
        setTotalPages(res.data.totalPages);
        setDailyIncome(res.data.dailySum._sum.amount);
        setMonthlyIncome(res.data.monthlySum._sum.amount);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPayment();
  }, [selectedDate, page]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
    setPage(1); // reset to first page when date changes
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Payments</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={handleDateChange} className="border rounded-md px-3 py-2" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Daily Income</p>
              <p className="text-xl font-semibold">Rp {dailyIncome.toLocaleString('id-ID')}</p>
            </div>
            <DollarSign className="h-6 w-6 text-green-500" />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Monthly Income</p>
              <p className="text-xl font-semibold">Rp {monthlyIncome.toLocaleString('id-ID')}</p>
            </div>
            <DollarSign className="h-6 w-6 text-green-500" />
          </CardContent>
        </Card>
      </div>

      {/* Add Payment Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">+ Add Payment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              // TODO: Add to state or send to backend
              form.reset();
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="member" className="mb-2">
                  Member
                </Label>
                <Input name="member" required />
              </div>
              <div>
                <Label htmlFor="amount" className="mb-2">
                  Amount
                </Label>
                <Input name="amount" type="number" required />
              </div>
              <div>
                <Label htmlFor="method" className="mb-2">
                  Method
                </Label>
                <Select name="method" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="QR">QR Code</SelectItem>
                    <SelectItem value="ATM">ATM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="submit">Save Payment</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Payment Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {loading && <LoadingPage />}
        {!loading && payment.length > 0 ? (
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-200 text-left text-xs uppercase font-semibold text-gray-600">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Keterangan</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Method</th>
              </tr>
            </thead>
            <tbody>
              {payment.map((p) => (
                <tr key={p.id} className="border-b">
                  {/* <td className="px-4 py-2">{p.member.split(' ')[1]}</td> */}
                  <td className="px-4 py-2">{p.memberId}</td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.amount.toLocaleString()}</td>
                  <td className="px-4 py-2">{p.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-6 text-gray-500">No payments on this date.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <Button variant="secondary" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <Button variant="secondary" onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
