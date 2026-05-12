"use client";

import React, { useState, useEffect } from "react";
import { Syringe, Bell, Moon, Sun, FileText, Shield, Info, ChevronDown, LogOut, User as UserIcon, Camera, Loader2 } from "lucide-react";
import { useAuth } from "./AuthProvider";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Settings() {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function updateProfile() {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar o perfil!');
    } finally {
      setLoading(false);
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Você deve selecionar uma imagem para o upload.');
      }
      const file = event.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      await new Promise(resolve => setTimeout(resolve, 800)); // simulate upload
      setAvatarUrl(objectUrl);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <div className="w-full pb-24 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Syringe className="text-primary" size={28} />
            <h1 className="font-bold text-lg tracking-tight">DoseCerto</h1>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="pt-6 pb-6 px-4 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Ajustes & Perfil</h2>
        
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm transition-colors duration-200">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Seu Perfil</h2>
          <div className="space-y-5">
            <div className="flex flex-col items-center gap-3">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center relative transition-colors duration-200">
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt="Avatar" fill referrerPolicy="no-referrer" className="object-cover" />
                  ) : (
                    <UserIcon size={40} className="text-gray-300 dark:text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-lg">
                  {uploading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={uploadAvatar}
                    disabled={uploading}
                  />
                </label>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1 transition-colors duration-200">Nome Completo</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                placeholder="Seu nome"
              />
            </div>

            <button
              onClick={updateProfile}
              disabled={loading}
              className="w-full py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : 'Salvar Perfil'}
            </button>
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden shadow-sm transition-colors duration-200">
          
          {/* Dark Mode */}
          <div className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                {mounted && theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-200">Modo Escuro</span>
            </div>
            <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-gray-200 dark:bg-primary p-0.5 transition-all" onClick={(e) => { e.preventDefault(); toggleTheme(); }}>
              <div className={`h-full w-[27px] rounded-full bg-white shadow-md transition-all duration-300 ${mounted && theme === 'dark' ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
            </label>
          </div>

          {/* Terms */}
          <details className="group">
            <summary className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer list-none">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FileText size={20} />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-200">Termos de Uso e Responsabilidade</span>
              </div>
              <ChevronDown className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform" size={20} />
            </summary>
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Estes são os termos de uso do aplicativo DoseCerto. Nosso objetivo é fornecer uma ferramenta de cálculo para auxiliar profissionais e pacientes, com conversões matemáticas precisas de dosagem. É importante ressaltar que os resultados não substituem, em nenhuma hipótese, a prescrição e orientação médica profissional.
              </p>
            </div>
          </details>

          {/* Privacy */}
          <details className="group">
            <summary className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer list-none">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Shield size={20} />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-200">Política de Privacidade</span>
              </div>
              <ChevronDown className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform" size={20} />
            </summary>
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Sua privacidade é importante para nós. O DoseCerto salva seus dados localmente e utiliza métodos seguros para autenticação. Não compartilhamos suas informações de dosagem ou dados pessoais com terceiros sob nenhuma circunstância.
              </p>
            </div>
          </details>

          {/* About */}
          <details className="group">
            <summary className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer list-none">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Info size={20} />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-200">Sobre o DoseCerto</span>
              </div>
              <ChevronDown className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform" size={20} />
            </summary>
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                O DoseCerto foi desenvolvido para auxiliar no cálculo rápido e seguro de dosagens, minimizando riscos de erros matemáticos no momento da aplicação. A ferramenta facilita a rotina oferecendo uma interface simples e amigável.
              </p>
            </div>
          </details>

        </div>

        <button 
          onClick={signOut}
          className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
        >
          <LogOut size={20} />
          Sair da conta
        </button>

        {/* Footer App Version */}
        <div className="pt-4 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">Versão do App 1.1.0</p>
        </div>
      </main>
    </div>
  );
}
