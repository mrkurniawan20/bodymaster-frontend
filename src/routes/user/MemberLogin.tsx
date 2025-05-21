import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
// import { loginMember } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginMember } from '@/services/api';
import IncorrectPassword from '@/components/IncorrectPassword';

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
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const [hidden, setHidden] = useState('hidden');
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // const res = await axios.post('http://127.0.0.1:3450/member/loginmember/', formData);
      const res = await loginMember(formData);
      console.log(res.data);
      const token = res.data.loggedInMember.token;
      const user = res.data.loggedInMember.user;
      const message = res.data.message;
      // const user = res.data.loggedInMember.user;
      localStorage.setItem('token', token);
      // console.log(user);
      // localStorage.setItem('expired-day', user)
      // console.log(user);
      // localStorage.setItem('user', user);
      if (user.role == `ADMIN`) {
        navigate('/dashboard');
      } else {
        // await axios.post(`http://127.0.0.1:3450/member/visit/${user.id}`, { headers: { Authorization: `Bearer ${token}` } });
        navigate('/landingpage');
      }
    } catch (error: any) {
      setHidden('');
      console.log('salah');
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

            <Button type="submit" className="w-full mt-2">
              Login
            </Button>
          </form>
          <p className={`text-center bg-red-400 p-2 rounded-md text-white ${hidden}`}>Password incorrect!</p>
          <p className="text-center text-md text-gray-500">
            Hanya visit? <br /> <span className="text-blue-600 ">Silakan hubungi instruktur</span>
          </p>
          <img src="/src/assets/img/bodymaster.png" className="w-1/2 m-auto invert" alt="" />
        </CardContent>
      </Card>
    </div>
  );
}
