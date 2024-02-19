"use client";

import React, { useState, useEffect } from "react";
import { Footer, NavigationBar, Details } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { getOrderById, getPaymentByOrderId } from "@/hooks/useOrder";

export default function OrderDetail() {
  const { id } = useParams<any>();
  const { data: session, status }: { data: any; status: any } = useSession();
  const [userId, setUserId] = useState<any>(null);
  const [paymentUrl, setPaymentUrl] = useState<any>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["orders", id],
    queryFn: async () => getOrderById(id),
  });

  const { data: payment } = useQuery({
    queryKey: ["payment", id],
    queryFn: async () => getPaymentByOrderId(id),
  });

  useEffect(() => {
    if (session) {
      setUserId(session.user.id);
    }
    if (payment) {
      setPaymentUrl(payment.paymentUrl);
    }
  }, [session]);

  return (
    <div>
      <NavigationBar userId={userId} status={status} session={session} />
      <Details data={data} isLoading={isLoading} paymentUrl={paymentUrl} />
      <Footer />
    </div>
  );
}
