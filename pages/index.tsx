"use client";
import Timer from "@/components/timer";
import TaskList from "@/components/tasklist";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center space-y-2">
      <Timer />
      <TaskList />
    </div>
  );
}
