import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';

type MemberForm = {
  name: string;
  id: number | undefined;
  password: string;
  phone: string;
  category: 'REGULAR' | 'WANITA' | 'PELAJAR' | '';
  method: 'QR' | 'CASH' | '';
};

export default function AddMember() {
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState<MemberForm>({
    name: '',
    id: undefined,
    password: '',
    phone: '',
    category: '',
    method: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //   const navigate = useNavigate(); // Optional, kalau mau redirect setelah submit

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios
        .post('http://127.0.0.1:3450/member/addmember/', formData, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          setError(false);
          setSuccess(true);
        })
        .catch(() => {
          setSuccess(false);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
          // setError(false);
        });
    } catch (error) {
      setError(true);
    }
    // TODO: Kirim ke backend di sini

    // navigate('/dashboard'); // kalau mau balik ke dashboard
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 space-y-4">
      <h1 className="text-xl font-bold">Add New Member</h1>

      <Card className="bg-white max-w-xl mx-auto">
        <CardContent className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" required className="mt-2" />
            </div>
            <div>
              <Label htmlFor="id">Member ID</Label>
              <Input id="id" name="id" value={formData.id} onChange={handleChange} placeholder="Enter member ID" required className="mt-2" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required className="mt-2" type="password" />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="08xxxxxxxxxx" required className="mt-2" />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              {/* <Input id="category" name="category" value={form.category} onChange={handleChange} placeholder="08xxxxxxxxxx" required className="mt-2" /> */}
              <div className="flex items-center">
                <Checkbox
                  id="reguler"
                  name="reguler"
                  checked={formData.category === 'REGULAR'}
                  onCheckedChange={(checked) => {
                    if (checked) setFormData((prev) => ({ ...prev, category: 'REGULAR' }));
                  }}
                  className="mt-2"
                />
                <label htmlFor="reguler" className="items-center ml-2 mt-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Reguler
                </label>
                {/* <div className="grid gap-1.5 leading-none mt-2"></div> */}
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="wanita"
                  name="wanita"
                  checked={formData.category === 'WANITA'}
                  onCheckedChange={(checked) => {
                    if (checked) setFormData((prev) => ({ ...prev, category: 'WANITA' }));
                  }}
                  className="mt-2"
                />
                <label htmlFor="wanita" className="items-center ml-2 mt-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Wanita
                </label>
                {/* <div className="grid gap-1.5 leading-none mt-2"></div> */}
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="pelajar"
                  name="pelajar"
                  checked={formData.category === 'PELAJAR'}
                  onCheckedChange={(checked) => {
                    if (checked) setFormData((prev) => ({ ...prev, category: 'PELAJAR' }));
                  }}
                  className="mt-2"
                />
                <label htmlFor="pelajar" className="items-center ml-2 mt-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Pelajar
                </label>
                {/* <div className="grid gap-1.5 leading-none mt-2"></div> */}
              </div>
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

            {/* Submit */}
            <Button type="submit" className="w-full mt-4">
              Add Member
            </Button>
          </form>
          {loading && (
            <div className="flex items-center justify-center mt-4">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
              <span className="ml-2 text-sm text-muted-foreground">Logging in...</span>
            </div>
          )}
          {error && <div className="text-sm text-red-600 bg-red-100 border border-red-300 rounded-md p-2 text-center mt-4">Failed to add member. Please check your input and try again.</div>}
          {success && <div className="text-sm text-green-600 bg-green-100 border border-green-300 rounded-md p-2 text-center mt-4">Member added successfully!</div>}
        </CardContent>
      </Card>
    </div>
  );
}
