import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type Visitor } from '@/services/useUser';
import LoadingPage from '../LoadingPage';
import { api } from '@/services/api';

export default function VisitorLog() {
  const ITEMS_PER_PAGE = 10;
  const token = localStorage.getItem('token');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
    setPage(1);
  };
  const [visitor, setVisitor] = useState<Visitor[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchVisit() {
      setLoading(true);
      try {
        const res = await api.post(
          '/visitlog',
          { selectedDate: selectedDate.toISOString() },
          {
            params: {
              page,
              limit: ITEMS_PER_PAGE,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVisitor(res.data.members);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchVisit();
  }, [selectedDate, page]);

  {
    loading && <LoadingPage />;
  }
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Visitor Log</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <input name="selectedDate" type="date" value={selectedDate.toISOString().split('T')[0]} onChange={handleDateChange} className="border rounded-md px-3 py-2" />
        </div>
      </div>

      <div className="space-y-4 mt-6">
        {loading && <LoadingPage />}
        {!loading && visitor.length > 0 ? (
          visitor.map((visit, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="py-4 px-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Visit Time: {new Date(visit.visitedAt).toLocaleTimeString()}</p>
                </div>
                <p className="text-lg font-semibold">{visit.member.name}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No visitors today.</p>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button variant="secondary" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Previous
        </Button>
        <p className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </p>
        <Button variant="secondary" onClick={() => setPage((p) => Math.max(1, p + 1))} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
