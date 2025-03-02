import Dashboard from '@/models/Dashboard';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const [
      totalUsers,
      totalRedeemedVouchers,
      totalCategories,
      totalPosts,
      recentUsers,
      userRegistrations,
      categoryDistribution
    ] = await Promise.all([
      Dashboard.getTotalUsers(),
      Dashboard.getTotalRedeemedVouchers(),
      Dashboard.getTotalCategories(),
      Dashboard.getTotalPosts(),
      Dashboard.getRecentUsers(),
      Dashboard.getUserRegistrationsByDay(),
      Dashboard.getCategoryDistribution()
    ]);

    return NextResponse.json(
      {
        totalUsers,
        totalRedeemedVouchers,
        totalCategories,
        totalPosts,
        recentUsers,
        userRegistrations,
        categoryDistribution
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching dashboard overview', error);
    return NextResponse.json(
      { message: 'Error fetching dashboard overview', error },
      { status: 500 }
    );
  }
}
