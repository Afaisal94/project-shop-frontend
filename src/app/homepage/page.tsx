"use client";

import React, { useState, useEffect } from "react";
import { Footer, LoadingProduct, NavigationBar, Products } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/hooks/useProduct";
import { useSession } from "next-auth/react";

export default function Homepage() {
  const { data: session, status }: { data: any; status: any } = useSession();
  const [userId, setUserId] = useState<any>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  useEffect(() => {
    if (session) {
      setUserId(session.user.id);
    }
  }, [session]);

  return (
    <div>
      <NavigationBar userId={userId} status={status} session={session} />

      {isLoading ? (
        <LoadingProduct />
      ) : (
        <Products
          data={data}
          userId={userId}
          status={status}
          session={session}
        />
      )}

      <Footer />
    </div>
  );
}
