// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Calendar } from 'lucide-react';
// import { useState } from 'react';

// // Tipe untuk data pengunjung
// type Visitor = {
//   name: string;
//   time: string;
// };

// // Format tanggal jadi YYYY-MM-DD
// const formatDate = (date: Date): string => {
//   return date.toISOString().split('T')[0];
// };

// export default function VisitorLog() {
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedDate(new Date(e.target.value));
//   };

//   // Data visitor statis untuk contoh
//   const visitorData: Record<string, Visitor[]> = {
//     '2025-05-12': [
//       { name: 'John Doe', time: '10:00 AM' },
//       { name: 'Jane Smith', time: '11:30 AM' },
//     ],
//     '2025-05-11': [
//       { name: 'Alice Cooper', time: '02:00 PM' },
//       { name: 'Bob Marley', time: '03:15 PM' },
//     ],
//     // Tambahkan data lainnya di sini
//   };

//   const visitorsToday: Visitor[] = visitorData[formatDate(selectedDate)] || [];

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-6 space-y-4">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-xl font-bold">Visitor Log</h1>
//         <div className="flex items-center space-x-2">
//           <Calendar className="h-5 w-5 text-gray-400" />
//           <input type="date" value={formatDate(selectedDate)} onChange={handleDateChange} className="border rounded-md px-3 py-2" />
//         </div>
//       </div>

//       {/* Visitor List */}
//       <div className="space-y-4 mt-6">
//         {visitorsToday.length > 0 ? (
//           visitorsToday.map((visitor, index) => (
//             <Card key={index} className="bg-white">
//               <CardContent className="py-4 px-4 flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Visit Time: {visitor.time}</p>
//                 </div>
//                 <p className="text-lg font-semibold">{visitor.name}</p>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No visitors today.</p>
//         )}
//       </div>
//     </div>
//   );
// }

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import type { Visitor } from '@/services/useUser';
import { useOutletContext } from 'react-router-dom';

// type Visitor = {
//   id: number;
//   member: Member;
//   memberId: number;
//   visitedAt: Date;
// };
// type Visit = {
//   name: string;
//   time: string;
// };

// function formatDate(date: Date): string {
//   return date.toLocaleDateString();
// }

const ITEMS_PER_PAGE = 10;

export default function VisitorLog() {
  const { visit } = useOutletContext<{ visit: Visitor[] }>();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
    setCurrentPage(1); // Reset halaman saat ganti tanggal
  };

  const visits = visit.filter((v) => {
    const visitDate = new Date(v.visitedAt).toLocaleDateString();
    const selected = selectedDate.toLocaleDateString();
    return visitDate === selected;
  });

  const totalPages = Math.ceil(visits.length / ITEMS_PER_PAGE);
  const paginatedVisitors = visits.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Visitor Log</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={handleDateChange} className="border rounded-md px-3 py-2" />
        </div>
      </div>

      {/* Visitor List */}
      <div className="space-y-4 mt-6">
        {paginatedVisitors.length > 0 ? (
          paginatedVisitors.map((visitor, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="py-4 px-4 flex items-center justify-between">
                <div>
                  {/* <p className="text-sm text-gray-500">Visit Time: {String(visitor.visitedAt).split('T')[1].split('.')[0]}</p> */}
                  <p className="text-sm text-gray-500">Visit Time: {new Date(visitor.visitedAt).toLocaleTimeString()}</p>
                </div>
                <p className="text-lg font-semibold">{visitor.member.name}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No visitors today.</p>
        )}
      </div>

      {/* Pagination */}
      {visits.length > ITEMS_PER_PAGE && (
        <div className="flex justify-between items-center mt-6">
          <Button variant="secondary" onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <Button variant="secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
