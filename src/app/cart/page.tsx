"use client";

import React, { useState, useEffect } from "react";
import { Footer, NavigationBar, ShoppingCart } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { getCarts } from "@/hooks/useCart";
import { useSession } from "next-auth/react";

export default function Cart() {
  const { data: session, status }: { data: any; status: any } = useSession();
  const [userId, setUserId] = useState<any>(null);
  const { data, status: statusCart, error } = useQuery({
    queryKey: ["carts", userId],
    queryFn: async () => getCarts(userId),
  });

  useEffect(() => {
    if (session) {
      setUserId(session.user.id);
    }
  }, [session]);
  return (
    <div>
      <NavigationBar userId={userId} status={status} session={session} />
      <ShoppingCart data={data} userId={userId} status={statusCart} error={error} />
      <Footer />
    </div>
  );
}
