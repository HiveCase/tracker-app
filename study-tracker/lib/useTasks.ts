"use client";

import { useEffect, useState } from "react";
import { tasks } from "./tasks";

export function useTasks() {
  const [state, setState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setState(JSON.parse(saved));
    else {
      const init: any = {};
      tasks.forEach(t => (init[t.id] = false));
      setState(init);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);

  const toggle = (id: string) =>
    setState(prev => ({ ...prev, [id]: !prev[id] }));

  const score = Object.values(state).filter(Boolean).length;

  return { state, toggle, score };
}