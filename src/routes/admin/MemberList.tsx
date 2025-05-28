import { useState, useEffect } from 'react';
import type { Member } from '@/services/useUser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoadingPage from '../LoadingPage';
import { useDebounce } from '@/services/useDebounce';
import { api } from '@/services/api';

export default function MemberList() {
  const token = localStorage.getItem('token');
  const [name, setName] = useState('');
  const [filter, setFilter] = useState('all');
  const [members, setMembers] = useState<Member[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const ITEMS_PER_PAGE = 10;
  const debounceValue = useDebounce(name, 1000);

  useEffect(() => {
    async function fetchMember() {
      setLoading(true);
      try {
        const res = await api.get(`/getallmember/`, {
          params: {
            page,
            limit: ITEMS_PER_PAGE,
            status: filter === 'all' ? 'all' : filter,
            name: name || undefined,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMembers(res.data.members);
        setTotalPages(res.data.totalPage);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMember();
  }, [page, filter, debounceValue]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 space-y-4">
      <h1 className="text-xl font-bold">Member List</h1>

      <Input
        placeholder="Search by name..."
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setPage(1);
        }}
      />

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

      <div className="space-y-2 mt-4">
        {loading && <LoadingPage />}
        {!loading &&
          members.map((m) => (
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
