import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import type { Member } from '@/services/useUser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MemberList() {
  const { member } = useOutletContext<{ member: Member[] }>();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  // const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const filtered = useMemo(() => {
    return member.filter((m) => m.name.toLowerCase().includes(search.toLowerCase())).filter((m) => (filter === 'all' ? true : filter === 'active' ? m.status == 'ACTIVE' : m.status == 'INACTIVE'));
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
        {paginated.map((m) => (
          <Card key={m.id} className="bg-white">
            <CardContent className="py-3 px-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-gray-500">ID: {m.id}</p>
              </div>
              <div className="flex flex-col items-end">
                <Badge variant={m.status == 'ACTIVE' ? 'default' : 'outline'} className={m.status == 'ACTIVE' ? 'bg-green-500' : 'bg-gray-300 text-gray-700'}>
                  {m.status == 'ACTIVE' ? 'Active' : 'Inactive'}
                </Badge>
                <p className="text-xs text-gray-400 mt-1">Member expire: {new Date(m.expireDate).toLocaleDateString(`id-ID`)}</p>
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
