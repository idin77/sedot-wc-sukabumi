import React, { useState, useEffect } from 'react';
import { Settings, Save, Plus, Star, RefreshCw, Download, Eye, X, Upload, Undo, Redo, Copy, Sun, Moon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DEFAULT_RESPONSES = {
  'harga': { response: 'Harga layanan sedot WC kami dimulai dari Rp 700.000, tergantung pada jarak dan tingkat kesulitan pengerjaan. Untuk detail lebih lanjut, silakan konsultasikan dengan tim kami.' },
  'lokasi': { response: 'Kami melayani seluruh wilayah Sukabumi dan sekitarnya. Silakan beri tahu lokasi spesifik Anda agar kami bisa segera meluncur.' },
  'jadwal': { response: 'Kami beroperasi 24 jam setiap hari. Kami bisa meluncur ke lokasi Anda kapan saja, bahkan untuk layanan darurat.' },
  'default': { response: 'Halo! Ada yang bisa kami bantu? Anda bisa bertanya tentang: "harga", "lokasi", atau "jadwal".' }
};

const POPULAR_KEYWORDS = ['promo', 'kontak', 'testimoni', 'garansi'];

export const AutoReplyWhatsApp: React.FC = () => {
  const [responses, setResponses] = useState(DEFAULT_RESPONSES);
  const [history, setHistory] = useState<typeof DEFAULT_RESPONSES[]>([DEFAULT_RESPONSES]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [greeting, setGreeting] = useState(localStorage.getItem('whatsapp_bot_greeting') || 'Halo! Selamat datang. Ada yang bisa kami bantu?');
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'upcoming' | 'expired'>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'alpha-asc' | 'alpha-desc'>('alpha-asc');
  const [stats, setStats] = useState<Record<string, number>>({});
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [tags, setTags] = useState<string[]>(['Layanan', 'Promo', 'Darurat']);
  const [tagSearchTerm, setTagSearchTerm] = useState('');
  const filteredTags = tags.filter(t => t.toLowerCase().includes(tagSearchTerm.toLowerCase()));

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const generateChartData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      data.push({
        name: d.toLocaleDateString('id-ID', { weekday: 'short' }),
        penggunaan: Math.floor(Math.random() * 20), // Mock data for 7-day trend
      });
    }
    return data;
  };

  const [chartData] = useState(generateChartData());
  const [bulkEndDate, setBulkEndDate] = useState('');

  const searchInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBulkTag = (tag: string) => {
    if (selectedKeys.size === 0) return;
    if (confirm(`Apakah Anda yakin ingin menerapkan tag "${tag}" ke ${selectedKeys.size} keyword?`)) {
      const newResponses = { ...responses };
      selectedKeys.forEach(key => {
        newResponses[key] = { ...newResponses[key], tag };
      });
      updateResponses(newResponses);
      setSelectedKeys(new Set());
    }
  };

  const handleBulkRemoveTag = () => {
    if (selectedKeys.size === 0) return;
    if (confirm(`Apakah Anda yakin ingin menghapus tag dari ${selectedKeys.size} keyword yang dipilih?`)) {
      const newResponses = { ...responses };
      selectedKeys.forEach(key => {
        if (newResponses[key].tag) {
          delete newResponses[key].tag;
        }
      });
      updateResponses(newResponses);
      setSelectedKeys(new Set());
    }
  };

  const getTagColor = (tag: string) => {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 80%)`;
    return color;
  };

  const handleBulkUpdateDates = () => {
    if (selectedKeys.size === 0) return;
    if (confirm(`Apakah Anda yakin ingin mengubah masa aktif ${selectedKeys.size} keyword yang dipilih?`)) {
      const newResponses = { ...responses };
      selectedKeys.forEach(key => {
        newResponses[key] = {
          ...newResponses[key],
          startDate: bulkStartDate || newResponses[key].startDate,
          endDate: bulkEndDate || newResponses[key].endDate
        };
      });
      updateResponses(newResponses);
      setBulkStartDate('');
      setBulkEndDate('');
      setSelectedKeys(new Set());
    }
  };

  const handleBulkAiGenerate = async () => {
    if (selectedKeys.size === 0) return;
    if (!confirm(`Apakah Anda yakin ingin meng-generate respons untuk ${selectedKeys.size} keyword yang dipilih?`)) return;

    const newResponses = { ...responses };
    for (const key of selectedKeys) {
      const response = await fetch("/api/gemini/suggest-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: key }),
      });
      const data = await response.json();
      if (data.suggestion) {
        newResponses[key] = { ...newResponses[key], response: data.suggestion };
      }
    }
    updateResponses(newResponses);
    setSelectedKeys(new Set());
  };

  const handleAiGenerate = async (key: string) => {
    const response = await fetch("/api/gemini/suggest-reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword: key }),
    });
    const data = await response.json();
    if (data.suggestion) {
      updateResponses({ ...responses, [key]: { ...responses[key], response: data.suggestion } });
    }
  };

  const handleSimulate = (input: string) => {
    setSimInput(input);
    const k = input.toLowerCase();
    const match = responses[k];
    
    if (match && checkStatus(match.startDate, match.endDate) === 'active') {
      setSimOutput(match.response);
      setStats(prev => {
        const next = { ...prev, [k]: (prev[k] || 0) + 1 };
        localStorage.setItem('whatsapp_bot_stats', JSON.stringify(next));
        return next;
      });
    } else {
      setSimOutput(responses['default']?.response || 'Maaf, tidak ada respons untuk keyword tersebut.');
    }
  };

  const toggleSelectKey = (key: string) => {
    const newSelected = new Set(selectedKeys);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedKeys(newSelected);
  };

  const checkStatus = (startDate?: string, endDate?: string): 'active' | 'upcoming' | 'expired' => {
    const now = new Date().toISOString().split('T')[0];
    if (startDate && startDate > now) return 'upcoming';
    if (endDate && endDate < now) return 'expired';
    return 'active';
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="bg-yellow-200 dark:bg-yellow-800 font-bold">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const handleBulkDelete = () => {
    if (selectedKeys.size === 0) return;
    if (confirm(`Apakah Anda yakin ingin menghapus ${selectedKeys.size} keyword yang dipilih?`)) {
      const newResponses = { ...responses };
      selectedKeys.forEach(key => delete newResponses[key]);
      updateResponses(newResponses);
      setSelectedKeys(new Set());
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('whatsapp_bot_responses');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration logic: convert old string values to new object format
      const migrated = Object.entries(parsed).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
          acc[key] = { response: value };
        } else {
          acc[key] = value as { response: string, startDate?: string, endDate?: string, tag?: string };
        }
        return acc;
      }, {} as Record<string, { response: string, startDate?: string, endDate?: string, tag?: string }>);
      setResponses(migrated);
    }
    const savedStats = localStorage.getItem('whatsapp_bot_stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
    const savedTags = localStorage.getItem('whatsapp_bot_tags');
    if (savedTags) {
      setTags(JSON.parse(savedTags));
    }
  }, []);

  const removeTag = (tagToRemove: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus tag "${tagToRemove}"?`)) {
      const newTags = tags.filter(t => t !== tagToRemove);
      setTags(newTags);
      localStorage.setItem('whatsapp_bot_tags', JSON.stringify(newTags));
      
      // Remove tag from responses if it was used
      const newResponses = { ...responses };
      Object.keys(newResponses).forEach(key => {
        if (newResponses[key].tag === tagToRemove) {
          delete newResponses[key].tag;
        }
      });
      updateResponses(newResponses);
    }
  };

  const addTag = () => {
    const tagName = prompt('Masukkan nama tag baru:');
    if (tagName && !tags.includes(tagName)) {
      const newTags = [...tags, tagName];
      setTags(newTags);
      localStorage.setItem('whatsapp_bot_tags', JSON.stringify(newTags));
    }
  };

  const handleSave = () => {
    localStorage.setItem('whatsapp_bot_responses', JSON.stringify(responses));
    localStorage.setItem('whatsapp_bot_greeting', greeting);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 1000);
  };

  const updateResponses = (newResponses: typeof DEFAULT_RESPONSES) => {
    setResponses(newResponses);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newResponses);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setResponses(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setResponses(history[historyIndex + 1]);
    }
  };

  const handleAdd = (key: string, value: string = '') => {
    if (!key) return;
    const lowerKey = key.toLowerCase();
    
    // Exact match check
    if (responses[lowerKey]) {
      alert(`Keyword "${lowerKey}" sudah ada!`);
      return;
    }

    // Semantic similarity check (simple inclusion check)
    const similarKey = Object.keys(responses).find(k => k.includes(lowerKey) || lowerKey.includes(k));
    if (similarKey) {
      if (!confirm(`Keyword "${lowerKey}" mungkin memiliki kemiripan dengan "${similarKey}". Tetap tambahkan?`)) {
        return;
      }
    }

    updateResponses({ ...responses, [lowerKey]: { response: value || 'Respons untuk ' + lowerKey } });
    setNewKey('');
    setNewValue('');
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin mengembalikan semua respons ke pengaturan default?')) {
      setResponses(DEFAULT_RESPONSES);
      localStorage.removeItem('whatsapp_bot_responses');
    }
  };

  const handleExportResponses = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Keyword,Response,StartDate,EndDate,Tag\n"
      + Object.entries(responses).map(([k, v]) => `"${k.replace(/"/g, '""')}","${v.response.replace(/"/g, '""')}","${v.startDate || ''}","${v.endDate || ''}","${v.tag || ''}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "whatsapp_bot_config.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportResponses = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const newResponses: Record<string, any> = {};
      
      lines.slice(1).forEach((line) => {
        const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if (parts.length >= 2) {
          const key = parts[0].replace(/^"|"$/g, '').replace(/""/g, '"');
          const response = parts[1].replace(/^"|"$/g, '').replace(/""/g, '"');
          const startDate = parts[2]?.replace(/^"|"$/g, '').replace(/""/g, '"');
          const endDate = parts[3]?.replace(/^"|"$/g, '').replace(/""/g, '"');
          const tag = parts[4]?.replace(/^"|"$/g, '').replace(/""/g, '"');
          
          if (key) {
            newResponses[key] = { response, startDate: startDate || undefined, endDate: endDate || undefined, tag: tag || undefined };
          }
        }
      });

      if (confirm("Apakah Anda yakin ingin mengimpor konfigurasi baru? (Ini akan menggantikan data saat ini)")) {
        updateResponses(newResponses);
        localStorage.setItem('whatsapp_bot_responses', JSON.stringify(newResponses));
        alert('Konfigurasi berhasil diimpor!');
      }
    };
    reader.readAsText(file);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Teks berhasil disalin!');
  };

  const handleImportStats = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const newStats = { ...stats };
      lines.forEach((line, index) => {
        if (index === 0) return; // Skip header
        const [key, count] = line.split(',');
        if (key && count) {
          newStats[key.trim()] = (newStats[key.trim()] || 0) + parseInt(count.trim(), 10);
        }
      });
      setStats(newStats);
      localStorage.setItem('whatsapp_bot_stats', JSON.stringify(newStats));
      alert('Statistik berhasil diimpor!');
    };
    reader.readAsText(file);
  };

  const handleExportStats = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Keyword,Jumlah Penggunaan\n"
      + Object.entries(stats).map(([key, count]) => `${key},${count}`).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "whatsapp_bot_stats.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(responses, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "whatsapp_bot_settings.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleUnifiedImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;

      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        try {
          const parsed = JSON.parse(content);
          // Simple heuristic to distinguish: responses (keys, response) vs stats (key, count)
          const isStats = Object.values(parsed).every(v => typeof v === 'number');
          if (isStats) {
            if (confirm("Terdeteksi file statistik JSON. Update data statistik?")) {
              setStats(prev => ({ ...prev, ...parsed }));
              localStorage.setItem('whatsapp_bot_stats', JSON.stringify({ ...stats, ...parsed }));
              alert('Statistik berhasil diupdate!');
            }
          } else {
            if (confirm("Terdeteksi file konfigurasi JSON. Impor keyword?")) {
              updateResponses(prev => ({ ...prev, ...parsed }));
              alert('Keyword berhasil diimpor!');
            }
          }
        } catch { alert('Gagal membaca JSON.'); }
      } else if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        const lines = content.split('\n');
        const header = lines[0].toLowerCase();
        
        if (header.includes('keyword') && header.includes('jumlah')) {
           // CSV Statistik
           if (confirm("Terdeteksi file CSV statistik. Update data statistik?")) {
              const newStats = { ...stats };
              lines.slice(1).forEach(line => {
                const [key, count] = line.split(',');
                if (key && count) newStats[key.trim()] = (newStats[key.trim()] || 0) + parseInt(count.trim(), 10);
              });
              setStats(newStats);
              localStorage.setItem('whatsapp_bot_stats', JSON.stringify(newStats));
              alert('Statistik berhasil diupdate!');
           }
        } else {
           // CSV Konfigurasi
           if (confirm("Terdeteksi file CSV konfigurasi. Impor keyword?")) {
             const newResponses: Record<string, any> = {};
             lines.slice(1).forEach(line => {
                const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                if (parts.length >= 2) {
                  const key = parts[0].replace(/^"|"$/g, '').replace(/""/g, '"');
                  const response = parts[1].replace(/^"|"$/g, '').replace(/""/g, '"');
                  if (key) newResponses[key] = { response };
                }
             });
             updateResponses({ ...responses, ...newResponses });
             alert('Keyword berhasil diimpor!');
           }
        }
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-36 right-4 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        title="Konfigurasi Bot WhatsApp"
      >
        <Settings size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-36 right-4 z-50 w-96 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 h-[600px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Konfigurasi Bot WhatsApp</h3>
        <div className="flex items-center gap-2">
          <label className="text-gray-500 hover:text-green-600 cursor-pointer" title="Impor Konfigurasi CSV">
            <Upload size={18} />
            <input type="file" accept=".csv" className="hidden" onChange={handleImportResponses} />
          </label>
          <button onClick={handleExportResponses} title="Ekspor Konfigurasi CSV" className="text-gray-500 hover:text-blue-600">
            <Download size={18} />
          </button>
          <button onClick={toggleTheme} className="text-gray-500 hover:text-yellow-600" title="Toggle Theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button onClick={handleExport} title="Ekspor Pengaturan" className="text-gray-500 hover:text-blue-600">
            <Download size={18} />
          </button>
          <label className="cursor-pointer text-gray-500 hover:text-green-600" title="Impor Data (CSV/JSON)">
            <Upload size={18} />
            <input type="file" accept=".json,.csv" onChange={handleUnifiedImport} className="hidden" />
          </label>
          <button onClick={undo} disabled={historyIndex === 0} title="Undo" className="text-gray-500 hover:text-gray-800 disabled:opacity-30">
            <Undo size={18} />
          </button>
          <button onClick={redo} disabled={historyIndex === history.length - 1} title="Redo" className="text-gray-500 hover:text-gray-800 disabled:opacity-30">
            <Redo size={18} />
          </button>
          <button onClick={handleReset} title="Reset ke Default" className="text-gray-500 hover:text-red-600">
            <RefreshCw size={18} />
          </button>
          <button onClick={() => setIsOpen(false)}><X size={18} /></button>
        </div>
      </div>
      
      {/* Summary Panel */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-center">
          <div className="text-xs text-blue-800 dark:text-blue-200">Aktif</div>
          <div className="font-bold text-blue-900 dark:text-blue-100">{Object.values(responses).filter(r => checkStatus(r.startDate, r.endDate) === 'active').length}</div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-2 rounded-lg text-center">
          <div className="text-xs text-yellow-800 dark:text-yellow-200">Kritis (3h)</div>
          <div className="font-bold text-yellow-900 dark:text-yellow-100">
            {Object.values(responses).filter(r => {
              if (!r.endDate) return false;
              const end = new Date(r.endDate);
              const now = new Date();
              const diffTime = end.getTime() - now.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays >= 0 && diffDays <= 3;
            }).length}
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-lg text-center">
          <div className="text-xs text-green-800 dark:text-green-200">Total Kirim</div>
          <div className="font-bold text-green-900 dark:text-green-100">{Object.values(stats).reduce((a, b) => a + b, 0)}</div>
        </div>
      </div>
      
      <div className="space-y-4 mb-6 border-b pb-4">
        <h4 className="font-semibold text-sm">Mode Simulasi Cepat</h4>
        <input 
          placeholder="Ketik keyword untuk simulasi..."
          value={simInput}
          onChange={(e) => handleSimulate(e.target.value)}
          className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
        />
        {simOutput && (
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg text-sm rounded-bl-none shadow-sm mt-2">
            <p className="text-gray-800 dark:text-gray-100">{simOutput}</p>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-6 border-b pb-4">
        <h4 className="font-semibold text-sm">Pesan Sambutan</h4>
        <textarea
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
          className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
          rows={2}
        />
      </div>

      <div className="space-y-4 mb-6 border-b pb-4">
        <h4 className="font-semibold text-sm flex items-center gap-2"><Star size={16} className="text-yellow-500" /> Saran Keyword Populer</h4>
        <div className="flex flex-wrap gap-2">
          {POPULAR_KEYWORDS.map(k => (
            <button 
              key={k}
              onClick={() => handleAdd(k)}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs hover:bg-yellow-100 transition-colors"
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-6 border-b pb-4">
        <h4 className="font-semibold text-sm">Tambah Keyword Baru</h4>
        <input 
          placeholder="Keyword (e.g., promo)"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
        />
        <textarea
          placeholder="Respons otomatis"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
          rows={2}
        />
        <button
          onClick={() => handleAdd(newKey, newValue)}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          <Plus size={16} />
          Tambah Keyword
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            ref={searchInputRef}
            placeholder="Cari keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
          >
            <option value="all">Semua</option>
            <option value="active">Aktif</option>
            <option value="upcoming">Akan Datang</option>
            <option value="expired">Kadaluwarsa</option>
          </select>
          <div className="flex flex-col gap-1 w-full">
            <input 
              placeholder="Cari tag..."
              value={tagSearchTerm}
              onChange={(e) => setTagSearchTerm(e.target.value)}
              className="p-1 border rounded text-xs bg-gray-50 dark:bg-gray-700"
            />
            <select 
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
            >
              <option value="all">Semua Tag</option>
              {filteredTags.map(t => (
                <option key={t} value={t} className="flex justify-between items-center">
                  {t}
                </option>
              ))}
              <option value="Tanpa Tag">Tanpa Tag</option>
            </select>
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {filteredTags.map(t => (
              <span key={t} style={{ backgroundColor: getTagColor(t) }} className="flex items-center gap-1 px-2 py-1 rounded text-xs whitespace-nowrap">
                {t}
                <button onClick={() => removeTag(t)} className="text-red-500 hover:text-red-700 font-bold" title="Hapus Tag">×</button>
              </span>
            ))}
          </div>
          <button onClick={addTag} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg" title="Tambah Tag">+ </button>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'alpha-asc' | 'alpha-desc')}
            className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
          >
            <option value="alpha-asc">A-Z</option>
            <option value="alpha-desc">Z-A</option>
          </select>
          {selectedKeys.size > 0 && (
            <div className="flex flex-col gap-2 mt-2 w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700">
              <span className="text-xs font-semibold">Bulk Actions ({selectedKeys.size}):</span>
              <button
                onClick={handleBulkAiGenerate}
                className="w-full bg-purple-600 text-white p-1 rounded text-xs hover:bg-purple-700"
              >
                AI Generate Massal
              </button>
              
              <select 
                onChange={(e) => handleBulkTag(e.target.value)}
                className="w-full p-1 border rounded text-xs bg-white dark:bg-gray-800"
              >
                <option value="">Pilih Tag untuk Massal</option>
                {tags.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <button
                onClick={handleBulkRemoveTag}
                className="w-full bg-gray-600 text-white p-1 rounded text-xs hover:bg-gray-700"
              >
                Hapus Tag Massal
              </button>

              <div className="flex gap-2">
                <input
                  type="date"
                  value={bulkStartDate}
                  onChange={(e) => setBulkStartDate(e.target.value)}
                  className="w-1/2 p-1 border rounded text-xs bg-white dark:bg-gray-800"
                />
                <input
                  type="date"
                  value={bulkEndDate}
                  onChange={(e) => setBulkEndDate(e.target.value)}
                  className="w-1/2 p-1 border rounded text-xs bg-white dark:bg-gray-800"
                />
              </div>
              <button
                onClick={handleBulkUpdateDates}
                className="w-full bg-blue-600 text-white p-1 rounded text-xs hover:bg-blue-700"
              >
                Update Tanggal
              </button>
              <button
                onClick={handleBulkDelete}
                className="w-full bg-red-600 text-white p-1 rounded text-xs hover:bg-red-700"
              >
                Hapus ({selectedKeys.size})
              </button>
            </div>
          )}
        </div>
        <div className="mb-2 flex gap-2">
          <button
            onClick={() => {
              const filtered = Object.fromEntries(
                Object.entries(responses).filter(([key, value]) => 
                  (key.toLowerCase().includes(searchTerm.toLowerCase()) || value.response.toLowerCase().includes(searchTerm.toLowerCase())) &&
                  (statusFilter === 'all' || checkStatus(value.startDate, value.endDate) === statusFilter) &&
                  (tagFilter === 'all' || (tagFilter === 'Tanpa Tag' ? !value.tag : value.tag === tagFilter))
                )
              );
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filtered, null, 2));
              const downloadAnchorNode = document.createElement('a');
              downloadAnchorNode.setAttribute("href", dataStr);
              downloadAnchorNode.setAttribute("download", "filtered_whatsapp_config.json");
              document.body.appendChild(downloadAnchorNode);
              downloadAnchorNode.click();
              downloadAnchorNode.remove();
            }}
            className="flex-1 bg-green-600 text-white p-2 rounded-lg text-sm hover:bg-green-700"
          >
            Export Filtered
          </button>
          <button
            onClick={() => {
              const filtered = Object.fromEntries(
                Object.entries(responses).filter(([key, value]) => 
                  (key.toLowerCase().includes(searchTerm.toLowerCase()) || value.response.toLowerCase().includes(searchTerm.toLowerCase())) &&
                  (statusFilter === 'all' || checkStatus(value.startDate, value.endDate) === statusFilter) &&
                  (tagFilter === 'all' || (tagFilter === 'Tanpa Tag' ? !value.tag : value.tag === tagFilter))
                )
              );
              navigator.clipboard.writeText(JSON.stringify(filtered, null, 2));
              alert('JSON berhasil disalin ke clipboard!');
            }}
            className="flex-1 bg-gray-600 text-white p-2 rounded-lg text-sm hover:bg-gray-700"
          >
            Copy JSON
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(responses)
            .filter(([key, value]) => 
              key.toLowerCase().includes(searchTerm.toLowerCase()) || 
              value.response.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(([_, value]) => {
              if (statusFilter === 'all') return true;
              return checkStatus(value.startDate, value.endDate) === statusFilter;
            })
            .filter(([_, value]) => {
              if (tagFilter === 'all') return true;
              if (tagFilter === 'Tanpa Tag') return !value.tag;
              return value.tag === tagFilter;
            })
            .sort((a, b) => {
              if (sortBy === 'alpha-asc') return a[0].localeCompare(b[0]);
              return b[0].localeCompare(a[0]);
            })
            .map(([key, value]) => (
            <div key={key} className={`p-2 rounded-lg border ${selectedKeys.has(key) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
              <label className="block text-sm font-medium mb-1 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedKeys.has(key)}
                    onChange={() => toggleSelectKey(key)}
                  />
                  {highlightMatch(key.toUpperCase(), searchTerm)}
                </div>
                <button onClick={() => setPreview({key, value: value.response})} className="text-gray-400 hover:text-blue-500">
                  <Eye size={16} />
                </button>
                <button onClick={() => handleAiGenerate(key)} className="text-gray-400 hover:text-purple-600" title="AI Generate">
                  <Star size={16} />
                </button>
                <button onClick={() => handleCopy(value.response)} className="text-gray-400 hover:text-green-600" title="Copy Respons">
                  <Copy size={16} />
                </button>
              </label>
              <textarea
                value={value.response}
                onChange={(e) => updateResponses({ ...responses, [key]: { ...value, response: e.target.value } })}
                className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
                rows={3}
              />
              <select
                value={value.tag || ''}
                onChange={(e) => updateResponses({ ...responses, [key]: { ...value, tag: e.target.value } })}
                className="w-full mt-2 p-1 border rounded text-xs"
                style={{ backgroundColor: value.tag ? getTagColor(value.tag) : undefined }}
              >
                <option value="">Pilih Label/Tag</option>
                {tags.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <button onClick={addTag} className="w-full mt-1 text-[10px] text-purple-600 hover:underline">Tambah Tag Baru +</button>
              <div className="flex gap-2 mt-2">
                <input
                  type="date"
                  value={value.startDate || ''}
                  onChange={(e) => updateResponses({ ...responses, [key]: { ...value, startDate: e.target.value } })}
                  className="w-1/2 p-1 border rounded text-xs bg-gray-50 dark:bg-gray-700"
                  title="Tanggal mulai aktif"
                />
                <input
                  type="date"
                  value={value.endDate || ''}
                  onChange={(e) => updateResponses({ ...responses, [key]: { ...value, endDate: e.target.value } })}
                  className="w-1/2 p-1 border rounded text-xs bg-gray-50 dark:bg-gray-700"
                  title="Tanggal berakhir aktif"
                />
              </div>
            </div>
          ))}
        </div>
        {preview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold">Preview Respons</h4>
                <button onClick={() => setPreview(null)}><X size={20} /></button>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg text-sm rounded-bl-none shadow-sm">
                <p className="font-semibold text-xs text-green-800 dark:text-green-200 mb-1">User: {preview.key}</p>
                <p className="text-gray-800 dark:text-gray-100">{preview.value}</p>
              </div>
            </div>
          </div>
        )}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-sm">Statistik Penggunaan (7 Hari)</h4>
            <div className="flex gap-2">
              <label className="text-xs text-purple-600 hover:underline cursor-pointer">
                Impor CSV
                <input type="file" accept=".csv" className="hidden" onChange={handleImportStats} />
              </label>
              <button onClick={handleExportStats} className="text-xs text-blue-600 hover:underline">Ekspor CSV</button>
            </div>
          </div>
          <div className="h-48 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="penggunaan" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1">
            {Object.entries(responses).map(([key]) => (
              <div key={key} className="flex justify-between text-xs p-1 bg-gray-50 dark:bg-gray-700 rounded">
                <span>{key}</span>
                <span className="font-bold">{stats[key] || 0} kali</span>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleSave}
          className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 ${isSuccess ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          <Save size={20} />
          {isSuccess ? 'Berhasil Disimpan!' : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  );
};
