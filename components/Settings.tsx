"use client";

import React from "react";
import { Syringe, Bell, Moon, FileText, Shield, Info, ChevronRight } from "lucide-react";

export default function Settings() {
  return (
    <div className="w-full">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Syringe className="text-primary" size={24} />
          <h1 className="text-xl font-bold tracking-tight">Ajustes</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Bell size={20} className="text-gray-300" />
        </button>
      </header>

      {/* Content Area */}
      <main className="py-6 px-4 space-y-2">
        {/* Menu List */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 divide-y divide-gray-700 overflow-hidden">
          
          {/* Dark Mode - Always on in this refactor, but keeping UI for visuals */}
          <div className="flex items-center justify-between px-4 py-4 hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Moon size={20} />
              </div>
              <span className="font-medium text-gray-200">Modo Escuro</span>
            </div>
            <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-primary p-0.5 justify-end transition-all">
              <div className="h-full w-[27px] rounded-full bg-white shadow-md"></div>
              <input 
                type="checkbox" 
                className="invisible absolute" 
                checked={true}
                readOnly
              />
            </label>
          </div>

          {/* Terms */}
          <a href="#" className="flex items-center justify-between px-4 py-4 hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <FileText size={20} />
              </div>
              <span className="font-medium text-gray-200">Termos de Uso e Responsabilidade</span>
            </div>
            <ChevronRight className="text-gray-500" size={20} />
          </a>

          {/* Privacy */}
          <a href="#" className="flex items-center justify-between px-4 py-4 hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Shield size={20} />
              </div>
              <span className="font-medium text-gray-200">Política de Privacidade</span>
            </div>
            <ChevronRight className="text-gray-500" size={20} />
          </a>

          {/* About */}
          <a href="#" className="flex items-center justify-between px-4 py-4 hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Info size={20} />
              </div>
              <span className="font-medium text-gray-200">Sobre o DoseCerto</span>
            </div>
            <ChevronRight className="text-gray-500" size={20} />
          </a>

        </div>

        {/* Footer App Version */}
        <div className="pt-8 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest">Versão do App 1.0.0</p>
        </div>
      </main>
    </div>
  );
}
