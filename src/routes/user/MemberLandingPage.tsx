import { Button } from '@/components/ui/button';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Member } from '@/services/useUser';
import { api } from '@/services/api';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function MemberLandingPage() {
  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: Member }>();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      await api.post(`/visit/${user.id}`, null, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/memberinfo');
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome, {user.name}!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full" onClick={() => navigate(`/editmember/${user.id}`)}>
            ✏️ Edit Data
          </Button>
          <Button className="w-full" onClick={handleClick}>
            {loading && <Loader2 className="size-6 animate-spin text-gray-500" />}
            {!loading && `💪🏼 Start Working Out`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
