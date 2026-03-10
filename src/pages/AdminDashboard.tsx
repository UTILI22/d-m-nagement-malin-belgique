import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Search, Filter, RefreshCw, ChevronDown, ChevronUp, Phone, Mail, MapPin, Calendar, Image, Clock, Trash2, Package } from "lucide-react";

type Quote = {
  id: string;
  created_at: string;
  departure: string;
  arrival: string;
  property_from: string | null;
  property_to: string | null;
  move_date: string | null;
  email: string | null;
  phone: string | null;
  photos_count: number | null;
  status: string;
  selected_pack: string | null;
};

const STATUS_OPTIONS = [
  { value: "new", label: "Nouveau", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { value: "contacted", label: "Contacté", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { value: "quoted", label: "Devis envoyé", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { value: "accepted", label: "Accepté", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { value: "rejected", label: "Refusé", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  { value: "completed", label: "Terminé", color: "bg-accent/20 text-accent border-accent/30" },
];

const AdminDashboard = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<"created_at" | "move_date">("created_at");
  const [sortAsc, setSortAsc] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchQuotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order(sortField, { ascending: sortAsc });

    if (error) {
      console.error("Fetch error:", error);
      if (error.code === "PGRST301" || error.message?.includes("JWT")) {
        navigate("/admin");
      }
    } else {
      setQuotes(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Check auth
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/admin");
      else fetchQuotes();
    });
  }, [sortField, sortAsc]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("quotes")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q)));
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) return;
    const { error } = await supabase.from("quotes").delete().eq("id", id);
    if (!error) {
      setQuotes((prev) => prev.filter((q) => q.id !== id));
      setExpandedId(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const toggleSort = (field: "created_at" | "move_date") => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(false); }
  };

  const filtered = quotes.filter((q) => {
    const matchesSearch =
      !searchTerm ||
      q.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.arrival.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.phone?.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const s = STATUS_OPTIONS.find((o) => o.value === status) || STATUS_OPTIONS[0];
    return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${s.color}`}>{s.label}</span>;
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("fr-BE", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const stats = {
    total: quotes.length,
    new: quotes.filter((q) => q.status === "new").length,
    accepted: quotes.filter((q) => q.status === "accepted").length,
    completed: quotes.filter((q) => q.status === "completed").length,
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, hsl(160 55% 7%), hsl(160 60% 5%))" }}>
      {/* Header */}
      <header className="border-b border-white/10 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">🏢 Dashboard Utilitop</h1>
          <button onClick={handleLogout} className="btn-glass text-xs gap-1.5">
            <LogOut className="w-3.5 h-3.5" /> Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total", value: stats.total, icon: "📊" },
            { label: "Nouvelles", value: stats.new, icon: "🆕" },
            { label: "Acceptées", value: stats.accepted, icon: "✅" },
            { label: "Terminées", value: stats.completed, icon: "🏁" },
          ].map((s) => (
            <div key={s.label} className="glass-card-flat p-4">
              <p className="text-xs text-muted-foreground">{s.icon} {s.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              className="glass-input pl-10"
              placeholder="Rechercher par ville, email, téléphone…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select
              className="glass-input pl-10 pr-8 min-w-[160px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <button onClick={fetchQuotes} className="btn-glass text-xs gap-1.5">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Actualiser
          </button>
        </div>

        {/* Sort buttons */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => toggleSort("created_at")} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            Date de demande {sortField === "created_at" && (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
          </button>
          <button onClick={() => toggleSort("move_date")} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            Date déménagement {sortField === "move_date" && (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
          </button>
        </div>

        {/* Quotes list */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Chargement…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">Aucune demande trouvée.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((q) => (
              <div key={q.id} className="glass-card-flat overflow-hidden">
                {/* Summary row */}
                <button
                  onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                  className="w-full p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground font-mono">#{q.id.substring(0, 8)}</span>
                      {getStatusBadge(q.status)}
                    </div>
                    <p className="text-sm font-semibold text-foreground mt-1 truncate">
                      {q.departure} → {q.arrival}
                    </p>
                    {q.selected_pack && (
                      <p className="text-xs text-primary mt-0.5 flex items-center gap-1"><Package className="w-3 h-3" />{q.selected_pack}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(q.created_at)}</span>
                    {q.email && <span className="hidden sm:flex items-center gap-1"><Mail className="w-3 h-3" />{q.email}</span>}
                  </div>
                  {expandedId === q.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>

                {/* Expanded details */}
                {expandedId === q.id && (
                  <div className="px-4 pb-4 border-t border-white/5 pt-4">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-primary mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Départ</p>
                            <p className="text-foreground font-medium">{q.departure} {q.property_from && `(${q.property_from})`}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-accent mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Destination</p>
                            <p className="text-foreground font-medium">{q.arrival} {q.property_to && `(${q.property_to})`}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Date déménagement</p>
                            <p className="text-foreground font-medium">{q.move_date || "Non définie"}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Image className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Photos</p>
                            <p className="text-foreground font-medium">{q.photos_count || 0} photo(s)</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {q.email && (
                          <div className="flex items-start gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-xs text-muted-foreground">Email</p>
                              <a href={`mailto:${q.email}`} className="text-primary hover:underline">{q.email}</a>
                            </div>
                          </div>
                        )}
                        {q.phone && (
                          <div className="flex items-start gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-xs text-muted-foreground">Téléphone</p>
                              <a href={`tel:${q.phone}`} className="text-primary hover:underline">{q.phone}</a>
                            </div>
                          </div>
                        )}

                        <div className="mt-4">
                          <label className="block text-xs text-muted-foreground mb-1.5">Changer le statut</label>
                          <select
                            className="glass-input text-sm"
                            value={q.status}
                            onChange={(e) => handleStatusChange(q.id, e.target.value)}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </div>

                        <button
                          onClick={() => handleDelete(q.id)}
                          className="mt-3 flex items-center gap-1.5 text-xs text-destructive hover:text-destructive/80 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Supprimer cette demande
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
