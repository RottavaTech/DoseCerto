"use client";

import React, { useState } from "react";
import BottomNav from "@/components/BottomNav";
import Calculator from "@/components/Calculator";
import History from "@/components/History";
import Guide from "@/components/Guide";
import Settings from "@/components/Settings";

type Tab = "calculator" | "history" | "guide" | "settings";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("calculator");

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-900 text-white overflow-hidden shadow-2xl">
      <div className="flex-1 overflow-y-auto">
        {activeTab === "calculator" && (
          <Calculator onGoToHistory={() => setActiveTab("history")} />
        )}
        {activeTab === "history" && (
          <History onGoBack={() => setActiveTab("calculator")} />
        )}
        {activeTab === "guide" && (
          <Guide onGoBack={() => setActiveTab("calculator")} />
        )}
        {activeTab === "settings" && <Settings />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
