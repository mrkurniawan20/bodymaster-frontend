import { useState, useEffect, type ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import type { Member } from '@/services/useUser';

export default function EditMemberPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { user } = useOutletContext<{ user: Member }>();
  const { id } = useParams(); // ambil ID dari URL
  useEffect(() => {
    if (user.id !== Number(id)) {
      navigate('/landingpage');
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    // setSelectedFile(e.target.files[0])
    const files = e.target.files;
    if (files) {
      setFormData({ ...formData, [e.target.name]: files[0] });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(`https://bodymaster-backend.vercel.app/member/editmember/${id}`, formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
      navigate('/landingpage');
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2">
              Nama
            </Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Nama" />
          </div>
          <div>
            <Label htmlFor="phone" className="mb-2">
              Phone
            </Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="08xxxxxxxxxx" type="tel" />
          </div>
          <div>
            <Label htmlFor="password" className="mb-2">
              Password
            </Label>
            <Input id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" type="password" />
          </div>
          <div>
            <Label htmlFor="image" className="mb-2">
              Profile Picture
            </Label>
            <Input id="image" name="image" onChange={handleFile} type="file" />
          </div>
          <div className="flex items-center justify-between"></div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </div>
    </div>
  );
}
