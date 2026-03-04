"use client";

import React, { useState } from "react";
import { Syringe as SyringeIcon, Clock, AlertTriangle, Save, Info } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getDeviceId } from "@/lib/deviceId";

type SyringeType = "U-100" | "U-40" | "mL";

export interface HistoryEntry {
  id: string;
  date: string;
  concentration: number;
  dose: number;
  syringe: SyringeType;
  volume: number;
  ui: number | null;
}

interface CalculatorProps {
  onGoToHistory: () => void;
}

export default function Calculator({ onGoToHistory }: CalculatorProps) {
  const [concentration, setConcentration] = useState<string>("");
  const [dose, setDose] = useState<string>("");
  const [syringe, setSyringe] = useState<SyringeType>("U-100");
  const [isSaving, setIsSaving] = useState(false);

  const concValue = parseFloat(concentration);
  const doseValue = parseFloat(dose);

  let volume = 0;
  let ui: number | null = 0;

  if (!isNaN(concValue) && !isNaN(doseValue) && concValue > 0) {
    volume = doseValue / concValue;
    if (syringe === "U-100") {
      ui = volume * 100;
    } else if (syringe === "U-40") {
      ui = volume * 40;
    } else {
      ui = null;
    }
  }

  const handleSave = async () => {
    const concValue = parseFloat(concentration);
    const doseValue = parseFloat(dose);

    if (isNaN(concValue) || isNaN(doseValue) || concValue <= 0) {
      alert("Por favor, preencha os valores corretamente.");
      return;
    }

    setIsSaving(true);
    const deviceId = getDeviceId();

    try {
      const { error } = await supabase.from("historico_aplicacoes").insert([
        {
          concentracao_frasco: concValue,
          dose_prescrita: doseValue,
          volume_ml: volume,
          volume_ui: ui,
          device_id: deviceId,
        },
      ]);

      if (error) throw error;

      // Clear inputs after saving
      setConcentration("");
      setDose("");

      // Provide feedback
      alert("Salvo no diário com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar no diário:", error);
      alert("Erro ao salvar. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full pb-24">
      {/* Header Navigation */}
      <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SyringeIcon className="text-primary" size={28} />
            <h1 className="font-bold text-lg tracking-tight">DoseCerto</h1>
          </div>
          <button
            onClick={onGoToHistory}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Clock className="text-gray-400" size={24} />
          </button>
        </div>
      </header>

      {/* Alert Banner */}
      <div className="px-4 py-3">
        <div className="bg-amber-900/20 border border-amber-800/50 rounded-xl p-4 flex gap-3 items-start shadow-sm">
          <AlertTriangle className="text-amber-500 shrink-0" size={20} />
          <p className="text-sm text-amber-200 leading-snug">
            <strong>Aviso Importante:</strong> Apenas conversão matemática. Não
            substitui orientação médica ou profissional.
          </p>
        </div>
      </div>

      {/* Input Section */}
      <section className="px-4 py-4 space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300 ml-1">
            Concentração do frasco (mg/mL)
          </label>
          <div className="relative">
            <input
              type="number"
              value={concentration}
              onChange={(e) => setConcentration(e.target.value)}
              className="w-full h-16 px-5 rounded-2xl border-2 border-gray-700 bg-gray-800 focus:border-primary focus:ring-0 transition-all text-xl font-medium placeholder:text-gray-500 text-white"
              placeholder="Ex: 100"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
              mg/mL
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300 ml-1">
            Dose prescrita (mg)
          </label>
          <div className="relative">
            <input
              type="number"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              className="w-full h-16 px-5 rounded-2xl border-2 border-gray-700 bg-gray-800 focus:border-primary focus:ring-0 transition-all text-xl font-medium placeholder:text-gray-500 text-white"
              placeholder="Ex: 25"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
              mg
            </span>
          </div>
        </div>

        {/* Syringe Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-300 ml-1">
            Tipo de Seringa
          </label>
          <div className="flex p-1 bg-gray-800 rounded-xl">
            {(["U-100", "U-40", "mL"] as SyringeType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSyringe(type)}
                className={`flex-1 py-3 px-2 text-sm rounded-lg transition-all ${
                  syringe === type
                    ? "font-bold bg-gray-700 shadow-sm text-primary"
                    : "font-medium text-gray-400 hover:text-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-4 py-6 grid grid-cols-2 gap-4">
        <div className="bg-primary/20 border border-primary/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
            Volume
          </span>
          <div className="text-3xl font-bold text-white">
            {volume > 0 ? volume.toFixed(2).replace(/\.00$/, "") : "0"}
          </div>
          <span className="text-sm font-medium text-primary">mL</span>
        </div>

        <div className="bg-emerald-900/20 border border-emerald-800/50 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            Seringa
          </span>
          <div className="text-3xl font-bold text-white">
            {ui !== null
              ? ui > 0
                ? ui.toFixed(1).replace(/\.0$/, "")
                : "0"
              : "-"}
          </div>
          <span className="text-sm font-medium text-emerald-400">
            {ui !== null ? "UI" : "-"}
          </span>
        </div>
      </section>

      <div className="px-4 py-2">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
        >
          <Save size={20} />
          {isSaving ? "Salvando..." : "Salvar no Diário"}
        </button>
      </div>

      {/* Educational Section */}
      <section className="px-4 py-4">
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Info className="text-gray-400" size={20} />
            <h3 className="font-bold text-gray-200">
              Como calculamos?
            </h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Utilizamos a <strong>Regra de Três Simples</strong> para encontrar o
            volume exato baseado na concentração disponível:
          </p>
          <div className="bg-gray-900 rounded-xl p-4 font-mono text-center border border-gray-800">
            <div className="text-xs text-gray-500 mb-2 italic">
              Fórmula aplicada
            </div>
            <div className="text-primary font-bold">
              V = (Dose × 1mL) / Conc
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
