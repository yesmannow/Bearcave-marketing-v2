"use client";

import { useEffect, useState } from "react";
import type { ProjectAssets, ProjectResponse } from "@/app/api/gallery/project/[slug]/route";

type ProjectApiResponse = ProjectResponse & { error?: string };

export function useProjectAssets(projectSlug: string) {
  const [assets, setAssets] = useState<ProjectAssets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAssets = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/gallery/project/${projectSlug}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as Partial<ProjectApiResponse>;

        if (!response.ok || !data.success || !data.assets) {
          throw new Error(data.error || "Failed to load project assets.");
        }

        if (!controller.signal.aborted) {
          setAssets(data.assets);
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        setAssets(null);
        setError(err instanceof Error ? err.message : "Network error loading assets.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchAssets();

    return () => controller.abort();
  }, [projectSlug]);

  return { assets, loading, error };
}
