import type { Member } from '@/services/useUser';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingPage from '../LoadingPage';

export function ExpireMemberPage() {
  const [expiredMembers, setExpiredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchExpiredMember() {
      try {
        setLoading(true);
        const res = await axios.get('https://bodymaster-backend.vercel.app/member/getExpiredMember');
        setExpiredMembers(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchExpiredMember();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {loading && <LoadingPage />}
      <h2 className="text-2xl font-bold mb-4">Expired Memberships</h2>
      {expiredMembers.length > 0 ? (
        <ul className="space-y-3">
          {expiredMembers.map((member) => (
            <li key={member.id} className="bg-red-100 border border-red-300 rounded-md p-4 shadow-sm">
              <p className="text-lg font-semibold">{member.name}</p>
              <p className="text-sm text-red-700">Expired on: {new Date(member.expireDate).toLocaleDateString('id-ID')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No expired memberships.</p>
      )}
    </div>
  );
}
