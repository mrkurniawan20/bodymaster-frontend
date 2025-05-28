import type { Member } from '@/services/useUser';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import bodyMaster from '@/assets/img/bodymaster.png';

export function MemberInfoPage() {
  const { user } = useOutletContext<{ user: Member }>();

  const isExpired = user.status !== 'ACTIVE';

  const now = new Date();
  const formattedDate = now.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const parts = formattedDate.split(' ');
  const date = parts[0];
  const month = parts[1].toLocaleUpperCase();
  const year = parts[2];
  const time = parts[4];
  const finalDate = `${date} ${month} ${year} - ${time}`;

  const userFormattedDate = new Date(String(user.expireDate)).toLocaleString(`id-ID`, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const userParts = userFormattedDate.split(' ');
  const userDate = userParts[0];
  const userMonth = userParts[1].toLocaleUpperCase();
  const userYear = userParts[2];
  const userFinalDate = `${userDate} ${userMonth} ${userYear}`;

  useEffect(() => {
    if (isExpired) {
      setBackgroundColor('bg-red-600');
    } else {
      setBackgroundColor('bg-emerald-600');
    }
  }, [isExpired]);

  const [backgroundColor, setBackgroundColor] = useState('');
  const expired = `HARAP HUBUNGI INSTRUKTUR UNTUK PERPANJANG MEMBER`;
  const notExpired = `MEMBER EXPIRED : ${userFinalDate}`;
  return (
    <div className={`w-screen h-screen ${backgroundColor} text-white font-sans rounded-none overflow-hidden relative shadow-md flex flex-col`}>
      <div className="relative flex-row items-center text-center justify-center p-0 my-20 rounded-lg">
        <h1 className="text-4xl font-semibold">{finalDate}</h1>
        <div className="flex justify-center my-6">
          <img src={`${user.image}`} alt="Rafli Kurniawan" className="w-80 h-90 rounded-xl object-cover shadow-xl" />
        </div>
        <h2 className="m-0 text-3xl font-semibold">{user.name.toUpperCase()}</h2>
        <p className="text-xl font-semibold">ID: {user.id}</p>
        <div className="mt-2">
          <p className="text-xl font-semibold">{isExpired ? expired : notExpired}</p>
        </div>
        <div className="mt-4 flex justify-center items-center">
          <img src={`${bodyMaster}`} alt="" className="size-1/2 invert object-contain" />
        </div>
      </div>

      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
        {[...Array(5)].map((_, i) => (
          <div key={`left-dot-${i}`} className="w-2.5 h-2.5 rounded-full bg-white" />
        ))}
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
        {[...Array(5)].map((_, i) => (
          <div key={`right-dot-${i}`} className="w-2.5 h-2.5 rounded-full bg-white" />
        ))}
      </div>
    </div>
  );
}
