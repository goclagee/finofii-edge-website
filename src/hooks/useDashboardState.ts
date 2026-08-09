'use client';

import { useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { encodeDashboardState, decodeDashboardState } from '@/lib/dashboard-url';
import type { DashboardState, IndustryType, MonthIndex, DashboardDataset, MonthData } from '@/types/dashboard';

import dtcData from '@/content/data/dashboard-dtc.json';
import agencyData from '@/content/data/dashboard-agency.json';
import saasData from '@/content/data/dashboard-saas.json';
import cpaData from '@/content/data/dashboard-cpa.json';

const datasets: Record<IndustryType, DashboardDataset> = {
  dtc: dtcData as unknown as DashboardDataset,
  agency: agencyData as unknown as DashboardDataset,
  saas: saasData as unknown as DashboardDataset,
  cpa: cpaData as unknown as DashboardDataset,
};

export interface UseDashboardStateReturn {
  state: DashboardState;
  monthData: MonthData;
  dataset: DashboardDataset;
  setMonth: (month: MonthIndex) => void;
  setIndustry: (industry: IndustryType) => void;
}

export function useDashboardState(): UseDashboardStateReturn {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const state: DashboardState = useMemo(
    () => decodeDashboardState(searchParams),
    [searchParams]
  );

  const dataset = datasets[state.industry];

  const monthData = dataset.months[state.month];

  const updateURL = useCallback(
    (newState: DashboardState) => {
      const queryString = encodeDashboardState(newState);
      router.replace(`${pathname}${queryString}`, { scroll: false });
    },
    [router, pathname]
  );

  const setMonth = useCallback(
    (month: MonthIndex) => {
      const newState: DashboardState = { ...state, month };
      updateURL(newState);
    },
    [state, updateURL]
  );

  const setIndustry = useCallback(
    (industry: IndustryType) => {
      const newState: DashboardState = { ...state, industry };
      updateURL(newState);
    },
    [state, updateURL]
  );

  return {
    state,
    monthData,
    dataset,
    setMonth,
    setIndustry,
  };
}
