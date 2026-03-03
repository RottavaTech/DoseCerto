"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Clock, CheckCircle, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getDeviceId } from "@/lib/deviceId";

interface HistoryProps {
  onGoBack: () => void;
}

export interface SupabaseHistoryEntry {
  id: string;
  created_at: string;
  concentracao_frasco: number;
  dose_prescrita: number;
  volume_ml: number;
  volume_ui: number | null;
  device_id: string;
}

export default function History({ onGoBack }: HistoryProps) {
  const [history, setHistory] = useState<SupabaseHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoading(true);
    const deviceId = getDeviceId();

    try {
      const { data, error } = await supabase
        .from("historico_aplicacoes")
        .select("*")
        .eq("device_id", deviceId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      if (data) {
        setHistory(data as SupabaseHistoryEntry[]);
      }
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("historico_aplicacoes")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Update local state to remove the deleted item
      setHistory(history.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Erro ao deletar registro:", error);
      alert("Erro ao deletar. Tente novamente.");
    }
  };

  const formatMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { month: "long" });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleDateString("pt-BR", { month: "long" });
    const time = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${day} de ${month.charAt(0).toUpperCase() + month.slice(1)} • ${time}`;
  };

  const getRelativeDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Hoje";
    if (date.toDateString() === yesterday.toDateString()) return "Ontem";
    return null;
  };

  // Group history by month
  const groupedHistory = history.reduce(
    (acc, entry) => {
      const month = formatMonth(entry.created_at);
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(entry);
      return acc;
    },
    {} as Record<string, SupabaseHistoryEntry[]>,
  );

  const currentMonth = new Date().toLocaleDateString("pt-BR", {
    month: "long",
  });
  const currentMonthCount = groupedHistory[currentMonth]?.length || 0;

  return (
    <div className="w-full pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-gray-900/80 backdrop-blur-md p-4 border-b border-gray-800 justify-between">
        <button
          onClick={onGoBack}
          className="text-gray-100 flex size-10 items-center justify-center rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
          Diário de Aplicações
        </h1>
      </header>

      {/* Summary Card */}
      <div className="px-4 py-6">
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-primary text-xs font-semibold uppercase tracking-wider">
              Total este mês
            </p>
            <p className="text-2xl font-bold text-white">
              {currentMonthCount} Aplicações
            </p>
          </div>
          <div className="bg-primary text-white p-2 rounded-lg">
            <Calendar size={24} />
          </div>
        </div>
      </div>

      {/* List Sections */}
      <div className="flex flex-col gap-1">
        {isLoading ? (
          <div className="px-4 py-12 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="animate-spin mb-4 text-primary" size={40} />
            <p className="font-medium">Carregando histórico...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-400">
            <Clock className="mx-auto mb-2 opacity-50" size={48} />
            <p>Nenhum registro encontrado.</p>
          </div>
        ) : (
          Object.entries(groupedHistory).map(([month, entries], index) => (
            <React.Fragment key={month}>
              <h3
                className={`text-gray-400 text-sm font-semibold px-4 pb-2 uppercase tracking-tight ${index === 0 ? "pt-2" : "pt-6"}`}
              >
                {index === 0 ? "Recentes" : month}
              </h3>

              {entries.map((entry) => {
                const relativeLabel = getRelativeDateLabel(entry.created_at);
                return (
                  <div key={entry.id} className="group px-4 py-2">
                    <div
                      className={`flex items-center gap-4 bg-gray-800 border border-gray-700 p-4 rounded-xl shadow-sm transition-shadow ${index === 0 ? "hover:shadow-md" : "opacity-80"}`}
                    >
                      <div className="text-emerald-500 flex items-center justify-center rounded-full bg-emerald-500/10 shrink-0 size-12">
                        <CheckCircle size={24} />
                      </div>
                      <div className="flex flex-col flex-1 justify-center">
                        <div className="flex justify-between items-start">
                          <p className="text-white text-base font-bold leading-none mb-1">
                            {entry.dose_prescrita}mg -{" "}
                            {entry.volume_ui !== null
                              ? `${entry.volume_ui.toFixed(1).replace(/\.0$/, "")} UI`
                              : `${entry.volume_ml.toFixed(2).replace(/\.00$/, "")} mL`}
                          </p>
                          {relativeLabel && (
                            <span className="text-[10px] font-bold py-0.5 px-2 bg-gray-700 text-gray-300 rounded-full uppercase text-nowrap">
                              {relativeLabel}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm font-medium">
                          {formatDateTime(entry.created_at)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="shrink-0 text-gray-500 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-gray-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}
