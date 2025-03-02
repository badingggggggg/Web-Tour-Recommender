'use client';

import MainLayout from '@/features/main/layout';
import dynamic from 'next/dynamic';
import React from 'react';

const ResortsMap = dynamic(() => import('./components/Map'), { ssr: false });

export default function MapPage() {
  return (
    <MainLayout>
      <ResortsMap />
    </MainLayout>
  );
}
