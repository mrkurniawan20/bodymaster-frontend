import { Button } from '@/components/ui/button';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Member } from '@/services/useUser';
import axios from 'axios';

export default function MemberLandingPage() {
  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: Member }>();
  const token = localStorage.getItem('token');

  async function handleClick() {
    try {
      await axios.post(`https://bodymaster-backend.vercel.app/member/visit/${user.id}`, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/memberinfo');
    } catch (error: any) {}
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
            💪🏼 Start Working Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
