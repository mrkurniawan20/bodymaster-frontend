import type { Member } from '@/services/useUser';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';

export function MemberInfoPage() {
  const { user } = useOutletContext<{ user: Member }>();
  const isExpired = user.status !== 'ACTIVE';

  const [bgGradient, setBgGradient] = useState('from-green-600 to-emerald-800');

  useEffect(() => {
    setBgGradient(isExpired ? 'from-red-700 to-red-900' : 'from-green-600 to-emerald-800');
  }, [isExpired]);

  const formattedDate = new Date().toLocaleString('id-ID', {
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

  const formattedExpireDate = new Date(user.expireDate).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={`w-screen h-screen bg-gradient-to-br ${bgGradient} flex items-center justify-center`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="backdrop-blur-lg bg-white/10 border border-white/20 text-white rounded-2xl p-8 w-[90%] max-w-4xl shadow-2xl flex flex-col items-center gap-6"
      >
        <div className="text-2xl tracking-wide text-gray-200">{finalDate}</div>

        <div className="flex flex-col items-center gap-3">
          <img src={user.image} alt={user.name} className="size-50 rounded-full object-cover border-1 border-white shadow-lg" />
          <h1 className="text-4xl font-extrabold tracking-wide">{user.name.toUpperCase()}</h1>
          <p className="text-xl text-gray-300 font-mono">ID: {user.id}</p>
        </div>

        <motion.div
          animate={{
            boxShadow: isExpired ? '0 0 15px 3px rgba(239, 68, 68, 0.6)' : '0 0 15px 3px rgba(16, 185, 129, 0.5)',
          }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
          className={`w-full text-center rounded-lg py-3 font-semibold text-lg ${isExpired ? 'bg-red-600/30 border border-red-300 text-red-100' : 'bg-emerald-500/20 border border-emerald-300 text-emerald-100'}`}
        >
          {isExpired ? (
            <p>
              MEMBER TIDAK AKTIF <br /> HUBUNGI INSTRUKTUR
            </p>
          ) : (
            <p>AKTIF SAMPAI {formattedExpireDate.toUpperCase()}</p>
          )}
        </motion.div>

        <div className="w-full flex justify-center mt-4">
          <img src="https://res.cloudinary.com/dkadm58qz/image/upload/v1748075471/bodymaster_f35woi.png" alt="Body Master Logo" className="w-2/5 md:w-1/4 invert opacity-80" />
        </div>
      </motion.div>
    </div>
  );
}
