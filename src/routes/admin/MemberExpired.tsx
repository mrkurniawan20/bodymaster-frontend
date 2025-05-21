import { useOutletContext } from 'react-router-dom';

type Member = {
  id: number;
  name: string;
  expireDate: string; // or Date if already parsed
};

export function ExpireMemberPage() {
  const { member } = useOutletContext<{ member: Member[] }>();

  // Filter expired members
  const expiredMembers = member.filter((member) => {
    const today = new Date();
    const expire = new Date(member.expireDate);
    return expire < today;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
