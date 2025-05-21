import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data
const members = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Member ${i + 1}`,
  active: i % 3 === 0, // ~1/3 active
  lastVisit: `2025-05-${String((i % 28) + 1).padStart(2, '0')}`,
}));

const ITEMS_PER_PAGE = 10;

export default function MemberListDummy() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | active | inactive
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return members.filter((m) => m.name.toLowerCase().includes(search.toLowerCase())).filter((m) => (filter === 'all' ? true : filter === 'active' ? m.active : !m.active));
  }, [search, filter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 space-y-4">
      <h1 className="text-xl font-bold">Member List</h1>

      {/* Search bar */}
      <Input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset page
        }}
      />

      {/* Filter buttons */}
      <div className="flex space-x-2 mt-2">
        {['all', 'active', 'inactive'].map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setFilter(f);
              setPage(1);
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {/* Member list */}
      <div className="space-y-2 mt-4">
        {paginated.map((member) => (
          <Card key={member.id} className="bg-white">
            <CardContent className="py-3 px-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-500">ID: {member.id}</p>
              </div>
              <div className="flex flex-col items-end">
                <Badge variant={member.active ? 'default' : 'outline'} className={member.active ? 'bg-green-500' : 'bg-gray-300 text-gray-700'}>
                  {member.active ? 'Active' : 'Inactive'}
                </Badge>
                <p className="text-xs text-gray-400 mt-1">Last Visit: {member.lastVisit}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <Button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Prev
        </Button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <Button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
          Next
        </Button>
      </div>
    </div>
  );
}
