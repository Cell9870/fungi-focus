"use client";
import Timer from "@/components/timer";
import TaskList from "@/components/tasklist";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { User } from "next-auth";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading</div>;
  }

  console.log(session);
  return (
    <div>
      <Timer />
      <TaskList />
    </div>
  );
}
