"use client";

import React from "react";
import { ArrowLeft, ChevronDown, Info } from "lucide-react";

interface GuideProps {
  onGoBack: () => void;
}

export default function Guide({ onGoBack }: GuideProps) {
  return (
    <div className="w-full">
      {/* Top Header */}
      <header className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded-full transition-colors"
          >
            <ArrowLeft className="text-primary" size={24} />
          </button>
          <h1 className="text-lg font-bold tracking-tight">DoseCerto</h1>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-4 pt-6 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">Guia de Uso</h2>
        <p className="text-gray-400 text-sm mt-1 mb-6">
          Tire suas dúvidas sobre a aplicação e dosagem.
        </p>

        {/* Accordion List */}
        <div className="flex flex-col gap-3">
          {/* Item 1 */}
          <details
            className="group bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-sm"
            open
          >
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
              <span className="text-sm font-semibold text-gray-200">
                Onde encontro a concentração no frasco?
              </span>
              <ChevronDown
                className="text-primary group-open:rotate-180 transition-transform"
                size={20}
              />
            </summary>
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-400 leading-relaxed">
                A concentração geralmente está localizada no rótulo principal do
                frasco, indicada em unidades por ml (ex: 100 U/ml). Procure por
                textos em destaque ou perto da data de validade.
              </p>
            </div>
          </details>

          {/* Item 2 */}
          <details className="group bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-sm">
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
              <span className="text-sm font-semibold text-gray-200">
                Diferença entre seringa U-100 e U-40
              </span>
              <ChevronDown
                className="text-primary group-open:rotate-180 transition-transform"
                size={20}
              />
            </summary>
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-400 leading-relaxed">
                Seringas U-100 são projetadas para insulinas de 100 unidades por
                ml, enquanto U-40 são para 40 unidades por ml. O uso da seringa
                errada pode causar erro grave de dosagem.
              </p>
            </div>
          </details>

          {/* Item 3 */}
          <details className="group bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-sm">
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
              <span className="text-sm font-semibold text-gray-200">
                Boas práticas de higiene
              </span>
              <ChevronDown
                className="text-primary group-open:rotate-180 transition-transform"
                size={20}
              />
            </summary>
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-400 leading-relaxed">
                Lave sempre as mãos com água e sabão antes do manuseio. Limpe o
                topo do frasco com álcool 70% e utilize sempre uma agulha nova e
                descartável para cada aplicação.
              </p>
            </div>
          </details>

          {/* Item 4 */}
          <details className="group bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-sm">
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
              <span className="text-sm font-semibold text-gray-200">
                Como ler a prescrição médica
              </span>
              <ChevronDown
                className="text-primary group-open:rotate-180 transition-transform"
                size={20}
              />
            </summary>
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-400 leading-relaxed">
                A prescrição deve indicar o nome do medicamento, a concentração
                (U/ml) e o número de unidades (U) a serem aplicadas. Em caso de
                dúvida, nunca presuma; consulte seu médico.
              </p>
            </div>
          </details>

          {/* Info Card */}
          <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20 flex gap-3">
            <Info className="text-primary shrink-0" size={24} />
            <div>
              <h4 className="text-sm font-bold text-primary">
                Dica de Segurança
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                Sempre verifique se a cor da insulina está de acordo com o
                padrão esperado antes de aplicar.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
