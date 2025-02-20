'use client';

import React, { createContext, useContext, useState } from 'react';

type Direction = 'ltr' | 'rtl';

type DirectionContextType = {
  direction: Direction;
  setDirection: (direction: Direction) => void;
};

const DirectionContext = createContext<DirectionContextType | undefined>(
  undefined
);

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirection] = useState<Direction>('ltr');

  return (
    <DirectionContext.Provider value={{ direction, setDirection }}>
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirectionContext() {
  const context = useContext(DirectionContext);
  if (context === undefined) {
    throw new Error(
      'useDirectionContext must be used within a DirectionProvider'
    );
  }
  return context;
}
