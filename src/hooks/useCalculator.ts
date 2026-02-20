"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import type {
  CalculatorInput,
  CalculationResult,
  RentalType,
  InitialInvestment,
  RevenueInput,
  PlatformFees,
  OperatingCosts,
} from "@/types/calculator";
import { calculateResults } from "@/lib/calculator";
import { DEFAULT_INPUT, TYPE_DEFAULTS } from "@/lib/constants";
import { decodeParamsToInput, encodeInputToParams } from "@/lib/urlShare";

export function useCalculator() {
  const [input, setInput] = useState<CalculatorInput>(DEFAULT_INPUT);
  const initializedRef = useRef(false);

  // 마운트 후 URL 파라미터에서 초기값 읽기 (hydration 불일치 방지)
  useEffect(() => {
    const fromUrl = decodeParamsToInput(window.location.search);
    if (fromUrl) {
      setInput(fromUrl);
    }
    initializedRef.current = true;
  }, []);

  // 입력 변경 시 주소창 URL 업데이트
  useEffect(() => {
    if (!initializedRef.current) return;
    const params = encodeInputToParams(input);
    const url = `${window.location.pathname}?${params}`;
    window.history.replaceState(null, "", url);
  }, [input]);

  // 타입별 입력값 캐시 (탭 전환 시 사용자 입력 보존)
  const cacheRef = useRef<Partial<Record<RentalType, CalculatorInput>>>({
    airbnb: DEFAULT_INPUT,
  });

  const result: CalculationResult = useMemo(
    () => calculateResults(input),
    [input]
  );

  const updateRentalType = useCallback((rentalType: RentalType) => {
    setInput((prev) => {
      // 현재 타입의 입력값을 캐시에 저장
      cacheRef.current[prev.rentalType] = prev;

      // 전환할 타입의 캐시가 있으면 복원, 없으면 기본값 적용
      const cached = cacheRef.current[rentalType];
      if (cached) {
        return { ...cached, rentalType };
      }

      const defaults = TYPE_DEFAULTS[rentalType];
      return {
        ...prev,
        rentalType,
        investment: { ...prev.investment, ...defaults.investment },
        revenue: { ...prev.revenue, ...defaults.revenue },
        platformFees: { ...prev.platformFees, ...defaults.platformFees },
        operatingCosts: { ...prev.operatingCosts, ...defaults.operatingCosts },
      };
    });
  }, []);

  const updateInvestment = useCallback(
    (partial: Partial<InitialInvestment>) => {
      setInput((prev) => ({
        ...prev,
        investment: { ...prev.investment, ...partial },
      }));
    },
    []
  );

  const updateRevenue = useCallback((partial: Partial<RevenueInput>) => {
    setInput((prev) => ({
      ...prev,
      revenue: { ...prev.revenue, ...partial },
    }));
  }, []);

  const updatePlatformFees = useCallback((partial: Partial<PlatformFees>) => {
    setInput((prev) => ({
      ...prev,
      platformFees: { ...prev.platformFees, ...partial },
    }));
  }, []);

  const updateOperatingCosts = useCallback(
    (partial: Partial<OperatingCosts>) => {
      setInput((prev) => ({
        ...prev,
        operatingCosts: { ...prev.operatingCosts, ...partial },
      }));
    },
    []
  );

  return {
    input,
    result,
    updateRentalType,
    updateInvestment,
    updateRevenue,
    updatePlatformFees,
    updateOperatingCosts,
  };
}
