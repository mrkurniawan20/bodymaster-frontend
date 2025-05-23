import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import bodyMaster from '@/assets/img/bodymaster.png';
import { useNavigate } from 'react-router-dom';
import { loginMember } from '@/services/api';
import { Loader2 } from 'lucide-react';

export default function GymLoginMobile() {
  const token = localStorage.getItem('token');
  if (token) {
    localStorage.removeItem('token');
  }
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const [hidden, setHidden] = useState('hidden');
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginMember(formData);
      const token = res.data.loggedInMember.token;
      const user = res.data.loggedInMember.user;
      localStorage.setItem('token', token);

      if (user.role == `ADMIN`) {
        navigate('/dashboard');
      } else {
        navigate('/landingpage');
      }
    } catch (error: any) {
      setHidden('');
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-blue-900 px-4">
      <Card className="w-full max-w-sm rounded-2xl p-6 shadow-lg bg-white">
        <CardContent className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to <br /> Body Master Gym
            </h1>
            {/* <p className="text-sm text-gray-500">Please log in to see your membership</p> */}
          </div>

          <form className="space-y-4" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="id" className="block text-sm font-medium text-gray-700">
                Member ID
              </Label>
              <Input id="id" type="id" name="id" placeholder="#123" className="mt-1" onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input id="password" type="password" name="password" placeholder="••••••••" className="mt-1" onChange={handleChange} />
            </div>

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? <Loader2 className="size-6 animate-spin text-gray-500" /> : 'Login'}
            </Button>
          </form>
          <p className={`text-center bg-red-400 p-2 rounded-md text-white ${hidden}`}>Password incorrect!</p>
          <p className="text-center text-md text-gray-500">
            Hanya visit? <br /> <span className="text-blue-600 ">Silakan hubungi instruktur</span>
          </p>
          <img src={bodyMaster} className="w-1/2 m-auto invert" alt="" />
        </CardContent>
      </Card>
    </div>
  );
}
