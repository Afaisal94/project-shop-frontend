"use client";

import React, { useEffect, useState } from "react";
import { Footer, LoadingProduct, NavigationBar, Products } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategoryId } from "@/hooks/useProduct";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Category() {
  const { id } = useParams<any>();
  const { data: session, status }: { data: any; status: any } = useSession();
  const [userId, setUserId] = useState<any>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => await getProductsByCategoryId(id),
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
