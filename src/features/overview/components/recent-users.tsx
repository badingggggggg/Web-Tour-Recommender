'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/hooks/use-dashboard';

export function RecentUsers() {
  const { data, isLoading } = useDashboard();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            data?.recentUsers?.map((user) => (
              <div key={user.id} className='flex items-center'>
                <Avatar className='h-9 w-9'>
                  <AvatarFallback>
                    {user.full_name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className='ml-4 space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {user.full_name}
                  </p>
                  <p className='text-sm text-muted-foreground'>{user.email}</p>
                </div>
                <div className='ml-auto text-sm text-muted-foreground'>
                  {new Date(user.created_at).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
