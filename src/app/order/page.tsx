"use client";

import React, { useState, useEffect } from "react";
import { Footer, NavigationBar, Details, OrderTable } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getOrdersByUserId } from "@/hooks/useOrder";
import Link from "next/link";

export default function Order() {
  const { data: session, status }: { data: any; status: any } = useSession();
  const [userId, setUserId] = useState<any>(null);

  const {
    data,
    status: statusData,
    error,
  } = useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => getOrdersByUserId(userId),
  });

  useEffect(() => {
    if (session) {
      setUserId(session.user.id);
    }
    console.log(data)
  }, [session]);

  return (
    <div>
      <NavigationBar userId={userId} status={status} session={session} />
      <OrderTable data={data} status={statusData} error={error} />
      <Footer />
    </div>
  );
}
