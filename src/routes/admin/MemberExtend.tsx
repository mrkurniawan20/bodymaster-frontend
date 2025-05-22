import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import type { Member } from '@/services/useUser';
import { Checkbox } from '@/components/ui/checkbox';
import LoadingPage from '../LoadingPage';

export default function MemberExtend() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const { member } = useOutletContext<{ member: Member[] }>();

  const [formData, setFormData] = useState({
    id: '',
    method: '',
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setButtonDisable(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`https://bodymaster-backend.vercel.app/member/extendmember/`, formData, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/dashboard');
      window.location.reload();
    } catch (err: any) {
      console.error('Update failed:', err);
    } finally {
      setLoading(false);
    }
  };
  const [buttonDisable, setButtonDisable] = useState(true);
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    setButtonDisable(false);
  }
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {loading && <LoadingPage />}
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Extend Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2">
              Member ID
            </Label>
            <div className="flex">
              <Input id="id" name="id" value={formData.id} onChange={handleChange} placeholder="ID" type="text" /> &ensp;
              <Button onClick={handleClick}>Check ID</Button>
            </div>
            <div className="mt-2">
              <Label htmlFor="category">Pembayaran</Label>
              {/* <Input id="category" name="category" value={form.category} onChange={handleChange} placeholder="08xxxxxxxxxx" required className="mt-2" /> */}
              <div className="flex items-center">
                <Checkbox
                  id="qr"
                  name="qr"
                  checked={formData.method === 'QR'}
                  onCheckedChange={(checked) => {
                    if (checked) setFormData((prev) => ({ ...prev, method: 'QR' }));
                  }}
                  className="mt-2"
                />
                <label htmlFor="reguler" className="items-center ml-2 mt-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  QR
                </label>
                {/* <div className="grid gap-1.5 leading-none mt-2"></div> */}
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="cash"
                  name="cash"
                  checked={formData.method === 'CASH'}
                  onCheckedChange={(checked) => {
                    if (checked) setFormData((prev) => ({ ...prev, method: 'CASH' }));
                  }}
                  className="mt-2"
                />
                <label htmlFor="wanita" className="items-center ml-2 mt-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Cash
                </label>
                {/* <div className="grid gap-1.5 leading-none mt-2"></div> */}
              </div>
            </div>
          </div>
          {/* {!buttonDisable && (
            <div className="flex items-center justify-between font-bold">
              {member.find((m) => m.id === Number(formData.id))?.name ? (
                <div className="text-sm text-green-600 bg-green-100 border border-green-300 rounded-md p-2 text-center my-4 mx-auto">
                  <p>{`Member Name : ${member.find((m) => m.id === Number(formData.id))?.name}`}</p>
                </div>
              ) : (
                <p className="text-sm text-red-600 bg-red-100 border border-red-300 rounded-md p-2 text-center my-4 mx-auto">Member tidak ada</p>
              )}
            </div>
          )} */}

          {!buttonDisable &&
            (() => {
              const selectedMember = member.find((m) => m.id === Number(formData.id));
              return (
                <div className="flex items-center justify-between font-bold">
                  {selectedMember! ? (
                    <div className="text-sm text-green-600 bg-green-100 border border-green-300 rounded-md p-2 text-center my-4 mx-auto">
                      <p>{`Member Name : ${selectedMember?.name}`}</p>
                      <p>{`Expire Date : ${new Date(selectedMember!.expireDate).toLocaleDateString('id-ID')}`}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-red-600 bg-red-100 border border-red-300 rounded-md p-2 text-center my-4 mx-auto">Member tidak ada</p>
                  )}
                </div>
              );
            })()}
          {buttonDisable ? (
            <Button type="submit" className="w-full" disabled>
              Please Check ID First
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Extend
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
