'use client'

import {SessionProvider } from 'next-auth/react'

export function RootProvider({children}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}
