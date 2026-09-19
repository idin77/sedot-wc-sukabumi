import React, { useState, useEffect } from 'react';
import { Settings, Save, Plus, Star, RefreshCw, Download, Eye, X, Upload, Undo, Redo } from 'lucide-react';

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
  const [sortBy, setSortBy] = useState<'alpha-asc' | 'alpha-desc'>('alpha-asc');
  const [stats, setStats] = useState<Record<string, number>>({});
  const [preview, setPreview] = useState<{key: string, value: string} | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('whatsapp_bot_responses');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration logic: convert old string values to new object format
      const migrated = Object.entries(parsed).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
          acc[key] = { response: value };
        } else {
          acc[key] = value as { response: string, startDate?: string, endDate?: string };
        }
        return acc;
      }, {} as Record<string, { response: string, startDate?: string, endDate?: string }>);
      setResponses(migrated);
    }
    const savedStats = localStorage.getItem('whatsapp_bot_stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

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

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(responses, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "whatsapp_bot_settings.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        const replace = confirm('Apakah Anda ingin mengganti seluruh konfigurasi dengan file ini? (Pilih "Cancel" untuk menggabungkan data)');
        
        setResponses(prev => {
          if (replace) return importedData;
          return { ...prev, ...importedData };
        });
        alert('Data berhasil diimpor!');
      } catch (err) {
        alert('Gagal mengimpor file JSON. Pastikan format file benar.');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
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
          <button onClick={handleExport} title="Ekspor Pengaturan" className="text-gray-500 hover:text-blue-600">
            <Download size={18} />
          </button>
          <label className="cursor-pointer text-gray-500 hover:text-green-600" title="Impor Pengaturan">
            <Upload size={18} />
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
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
          <button onClick={() => setIsOpen(false)}>X</button>
        </div>
      </div>
      
      <div className="space-y-4 mb-6 border-b pb-4">
        <h4 className="font-semibold text-sm">Mode Simulasi Cepat</h4>
        <input 
          placeholder="Ketik keyword untuk simulasi..."
          onChange={(e) => {
            const k = e.target.value.toLowerCase();
            const match = responses[k];
            if (match) {
              setPreview({key: k, value: match.response});
            }
          }}
          className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
        />
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
            placeholder="Cari keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
          />
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'alpha-asc' | 'alpha-desc')}
            className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
          >
            <option value="alpha-asc">A-Z</option>
            <option value="alpha-desc">Z-A</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(responses)
            .filter(([key]) => key.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
              if (sortBy === 'alpha-asc') return a[0].localeCompare(b[0]);
              return b[0].localeCompare(a[0]);
            })
            .map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1 flex justify-between items-center">
                {key.toUpperCase()}
                <button onClick={() => setPreview({key, value: value.response})} className="text-gray-400 hover:text-blue-500">
                  <Eye size={16} />
                </button>
              </label>
              <textarea
                value={value.response}
                onChange={(e) => updateResponses({ ...responses, [key]: { ...value, response: e.target.value } })}
                className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-sm"
                rows={3}
              />
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
          <h4 className="font-semibold text-sm mb-2">Statistik Penggunaan</h4>
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
