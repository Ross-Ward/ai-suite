"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Briefcase, 
  Settings, 
  Brain, 
  Mic, 
  FileCheck, 
  Shield, 
  Wand2, 
  Search,
  ArrowUpRight,
  BookOpen,
  Layout,
  Terminal,
  Activity
} from "lucide-react";

const categories = [
  { id: "all", label: "All Tools", icon: Layout },
  { id: "exam", label: "Exams & Grading", icon: GraduationCap },
  { id: "career", label: "Career & Jobs", icon: Briefcase },
  { id: "study", label: "Study & Learning", icon: BookOpen },
  { id: "content", label: "AI Content", icon: Wand2 }
];

const tools = [
  { 
    name: "Exam Checker AI", 
    desc: "Automated analysis and scoring of handwritten or digital exam papers.", 
    cat: "exam", 
    icon: FileCheck,
    color: "from-blue-500 to-cyan-400"
  },
  { 
    name: "Exam Developer", 
    desc: "Generate Bloom's Taxonomy based examinations from any source material.", 
    cat: "exam", 
    icon: GraduationCap,
    color: "from-blue-600 to-indigo-500"
  },
  { 
    name: "Intelligent Job Matcher", 
    desc: "AI-driven matching between resume data and live market job postings.", 
    cat: "career", 
    icon: Briefcase,
    color: "from-emerald-500 to-teal-400"
  },
  { 
    name: "Resume Analyzer AI", 
    desc: "Deep analysis of resume strength, skill gap, and ATS optimization.", 
    cat: "career", 
    icon: Brain,
    color: "from-emerald-600 to-green-500"
  },
  { 
    name: "University Chat Bot", 
    desc: "RAG-powered campus assistant for student services and academic queries.", 
    cat: "study", 
    icon: Mic,
    color: "from-purple-500 to-pink-400"
  },
  { 
    name: "Education Book Generator", 
    desc: "Transform simple outlines into full-length structured educational books.", 
    cat: "content", 
    icon: BookOpen,
    color: "from-orange-500 to-red-400"
  },
  { 
    name: "Code Similarity Check", 
    desc: "NLP-based plagiarism and code pattern matching for educational integrity.", 
    cat: "exam", 
    icon: Terminal,
    color: "from-indigo-500 to-violet-400"
  },
  { 
    name: "Student Ethics Classifier", 
    desc: "AI monitoring of student conversations for ethical and safety compliance.", 
    cat: "study", 
    icon: Shield,
    color: "from-rose-500 to-pink-500"
  },
  { 
    name: "Advanced TTS Suite", 
    desc: "High-fidelity text-to-speech for educational content and accessible learning.", 
    cat: "content", 
    icon: Mic,
    color: "from-cyan-500 to-blue-500"
  },
  { 
    name: "Mock Interview AI", 
    desc: "Simulated behavioral and technical interviews with real-time feedback.", 
    cat: "career", 
    icon: Activity,
    color: "from-amber-500 to-orange-400"
  }
];

export default function Dashboard() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTools = tools.filter(t => 
    (filter === "all" || t.cat === filter) &&
    (t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-xl shadow-lg shadow-cyan-500/20">
              <Brain className="text-white" size={24} />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">AI Education <span className="text-cyan-400">Suite</span></span>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold leading-none mt-0.5">Professional Outsource Suite</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
            {categories.map((c) => (
              <button 
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === c.id ? 'bg-white/10 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
              >
                <c.icon size={14} />
                {c.label}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2 rounded-full text-sm font-bold transition-all transform active:scale-95">
            Client Login
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Market-Ready AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Products</span></h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            A specialized collection of deployment-ready AI agents and tools for educational institutions and recruitment platforms.
          </p>
          
          <div className="mt-10 relative max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search for a tool or capability..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((t, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={t.name}
                className="group relative bg-slate-900/40 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all flex flex-col justify-between"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
                  <ArrowUpRight size={20} className="text-cyan-400" />
                </div>
                
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${t.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <t.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-300 transition-colors">{t.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{t.desc}</p>
                </div>
                
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-cyan-400/70 transition-colors">{t.cat}</span>
                  <button className="text-xs font-bold text-cyan-400 border border-cyan-400/30 px-3 py-1 rounded-md hover:bg-cyan-500 hover:text-slate-950 transition-all">
                    Demo Tool
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTools.length === 0 && (
          <div className="py-20 text-center">
            <Settings className="mx-auto text-slate-700 animate-spin-slow mb-4" size={48} />
            <p className="text-slate-500">No tools found matching your search criteria.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 py-12 bg-slate-950/20 backdrop-blur-sm mt-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50">
            <Brain size={20} />
            <span className="text-sm font-bold tracking-tight">AI Education Suite</span>
          </div>
          <div className="flex gap-12 text-xs font-bold uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-white">API Docs</a>
            <a href="#" className="hover:text-white">Commercial License</a>
            <a href="#" className="hover:text-white">Outsource Terms</a>
          </div>
          <p className="text-[10px] text-slate-600">&copy; 2026 Professional AI Outsource Suite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
