'use client'

import {Button} from 'ui'
import { signIn, signOut, useSession } from 'next-auth/react';
import type {Session} from 'next-auth'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <>
      {!session && <Button onClick={() => signIn()} variant="destructive">Sign In</Button>}
      {!!session && <Button onClick={() => signOut()} variant="destructive">{session.user?.email}</Button>}
    </>
  )
}
