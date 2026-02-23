"use client";

import { useTasks } from "@/lib/useTasks";
import { tasks } from "@/lib/tasks";
import jsPDF from "jspdf";

export default function Home() {
  const { state, toggle, score } = useTasks();

  const sendReport = async () => {
    await fetch("/api/send-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score }),
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Weekly Checklist", 10, 10);

    let y = 20;
    tasks.forEach(t => {
      doc.text(
        `${state[t.id] ? "✓" : "☐"} ${t.label}`,
        10,
        y
      );
      y += 10;
    });

    doc.text(`Score: ${score}`, 10, y + 10);
    doc.save("checklist.pdf");
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Study Tracker</h1>

      {tasks.map(t => (
        <div key={t.id} className="flex gap-3 mb-2">
          <input
            type="checkbox"
            checked={state[t.id] || false}
            onChange={() => toggle(t.id)}
          />
          {t.label}
        </div>
      ))}

      <div className="mt-6 font-bold">Score: {score}</div>

      <button
        onClick={downloadPDF}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Download PDF
      </button>
      <button onClick={sendReport} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
        Send weekly email
      </button>
    </main>
  );
}