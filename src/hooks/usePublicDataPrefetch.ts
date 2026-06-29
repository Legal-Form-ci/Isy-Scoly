import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Warms up React Query caches for high-traffic public pages
 * so the first render after refresh is instant on /shop and /kits.
 *
 * Runs once on mount, in the background — never blocks the UI.
 */
export const usePublicDataPrefetch = () => {
  const qc = useQueryClient();

  useEffect(() => {
    const idle = (cb: () => void) =>
      "requestIdleCallback" in window
        ? (window as any).requestIdleCallback(cb, { timeout: 1500 })
        : setTimeout(cb, 300);

    idle(() => {
      qc.prefetchQuery({
        queryKey: ["shop-products", "page-0"],
        staleTime: 1000 * 60 * 5,
        queryFn: async () => {
          const { data } = await supabase
            .from("products")
            .select(
              "id,name_fr,name_en,name_de,name_es,description_fr,description_en,description_de,description_es,price,original_price,discount_percent,stock,image_url,is_featured,category_id,free_shipping,brand,author_details,metadata,views,sales_count,rating,created_at",
            )
            .eq("is_active", true)
            .order("created_at", { ascending: false })
            .range(0, 1999);
          return data || [];
        },
      });

      qc.prefetchQuery({
        queryKey: ["smart-kits", "all", "all", "", 1],
        staleTime: 1000 * 60 * 5,
        queryFn: async () => {
          const { data, count } = await supabase
            .from("smart_kits")
            .select(
              "id,name,description,grade_level,series,is_active,created_at," +
                "smart_kit_items(id,product_id,quantity,item_name," +
                "products(id,name_fr,price,image_url,stock,is_active))",
              { count: "exact" },
            )
            .eq("is_active", true)
            .order("created_at", { ascending: false })
            .range(0, 11);
          return { rows: data || [], count: count || 0 };
        },
      });
    });
  }, [qc]);
};
