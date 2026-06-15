import { useState, useRef, useEffect } from "react";
import { Plus, Pencil, Trash2, LogOut, X, Upload, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCars } from "@/contexts/CarsContext";
import { Car, CarImage } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ADMIN_HASH = (import.meta.env.VITE_ADMIN_HASH as string ?? "").toLowerCase();
const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000;

async function hashPassword(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generateId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now();
}

const emptyForm: Omit<Car, "id"> = {
  name: "",
  brand: "Toyota",
  model: "",
  year: new Date().getFullYear(),
  mileage: 0,
  engineType: "Hybrid",
  driveType: "FWD",
  transmission: "",
  fuelConsumption: "",
  price: 0,
  description: "",
  images: [],
  featured: false,
};

type FormData = Omit<Car, "id">;

interface CarFormProps {
  initial?: Car;
  onSave: (car: Car) => void;
  onCancel: () => void;
}

function CarForm({ initial, onSave, onCancel }: CarFormProps) {
  const [form, setForm] = useState<FormData>(initial ? { ...initial } : { ...emptyForm });
  const [images, setImages] = useState<CarImage[]>(initial?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    const readers = files.map(
      (file) =>
        new Promise<CarImage>((resolve) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve({ url: reader.result as string, category: "exterior" });
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((newImgs) => {
      setImages((prev) => [...prev, ...newImgs]);
      setUploading(false);
    });
    e.target.value = "";
  };

  const updateImageCategory = (idx: number, category: CarImage["category"]) => {
    setImages((prev) =>
      prev.map((img, i) => (i === idx ? { ...img, category } : img))
    );
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Нэр оруулна уу"); return; }
    if (!form.model.trim()) { toast.error("Загвар оруулна уу"); return; }
    if (form.price <= 0) { toast.error("Үнэ оруулна уу"); return; }
    if (images.length === 0) { toast.error("Дор хаяж 1 зураг оруулна уу"); return; }
    const car: Car = {
      ...form,
      id: initial?.id ?? generateId(form.name),
      images,
    };
    onSave(car);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Нэр *</Label>
          <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Toyota Prius 41" className="rounded-none" />
        </div>
        <div className="space-y-2">
          <Label>Загвар *</Label>
          <Input value={form.model} onChange={(e) => set("model", e.target.value)} placeholder="Prius 41" className="rounded-none" />
        </div>
        <div className="space-y-2">
          <Label>Брэнд</Label>
          <Select value={form.brand} onValueChange={(v) => set("brand", v as Car["brand"])}>
            <SelectTrigger className="rounded-none"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Toyota">Toyota</SelectItem>
              <SelectItem value="Lexus">Lexus</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Хөдөлгүүрийн төрөл</Label>
          <Select value={form.engineType} onValueChange={(v) => set("engineType", v as Car["engineType"])}>
            <SelectTrigger className="rounded-none"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Gasoline">Gasoline</SelectItem>
              <SelectItem value="Gasoline 2.5 turbo">Gasoline 2.5 turbo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Хөтлөгч</Label>
          <Select value={form.driveType} onValueChange={(v) => set("driveType", v as Car["driveType"])}>
            <SelectTrigger className="rounded-none"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="FWD">FWD</SelectItem>
              <SelectItem value="AWD">AWD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Үйлдвэрлэсэн он *</Label>
          <Input type="number" value={form.year} onChange={(e) => set("year", Number(e.target.value))} className="rounded-none" />
        </div>
        <div className="space-y-2">
          <Label>Гүйлт (км) *</Label>
          <Input
            type="text"
            inputMode="numeric"
            value={form.mileage === 0 ? "" : new Intl.NumberFormat("mn-MN").format(form.mileage)}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9]/g, "");
              set("mileage", raw === "" ? 0 : Number(raw));
            }}
            placeholder="28,000"
            className="rounded-none"
          />
        </div>
        <div className="space-y-2">
          <Label>Үнэ (₮) *</Label>
          <Input
            type="text"
            inputMode="numeric"
            value={form.price === 0 ? "" : new Intl.NumberFormat("mn-MN").format(form.price)}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9]/g, "");
              set("price", raw === "" ? 0 : Number(raw));
            }}
            placeholder="78,000,000"
            className="rounded-none"
          />
        </div>
        <div className="space-y-2">
          <Label>Хурдны хайрцаг</Label>
          <Input value={form.transmission} onChange={(e) => set("transmission", e.target.value)} placeholder="CVT автомат" className="rounded-none" />
        </div>
        <div className="space-y-2">
          <Label>Түлшний зарцуулалт</Label>
          <Input value={form.fuelConsumption} onChange={(e) => set("fuelConsumption", e.target.value)} placeholder="3.5л / 100км" className="rounded-none" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Тайлбар</Label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={4}
          className="w-full border border-input bg-background px-3 py-2 text-sm rounded-none resize-none focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="Машины тайлбар..."
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={!!form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="h-4 w-4"
          />
          <Label htmlFor="featured">Онцлох машин болгох</Label>
        </div>
      </div>

      {/* Image upload */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Зургууд *</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-none gap-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="h-4 w-4" />
            {uploading ? "Уншиж байна..." : "Зураг нэмэх"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {images.length === 0 ? (
          <div
            className="border-2 border-dashed border-border p-12 text-center cursor-pointer hover:border-foreground/40 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm text-muted-foreground">Зураг сонгохын тулд дарна уу</p>
            <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WEBP дэмжигдэнэ</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                <div className="aspect-[4/3] overflow-hidden border border-border">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </div>
                <Select
                  value={img.category}
                  onValueChange={(v) => updateImageCategory(idx, v as CarImage["category"])}
                >
                  <SelectTrigger className="rounded-none h-8 text-xs mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exterior">Гадна</SelectItem>
                    <SelectItem value="interior">Дотор</SelectItem>
                    <SelectItem value="engine">Хөдөлгүүр</SelectItem>
                  </SelectContent>
                </Select>
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-black/70 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <div
              className="aspect-[4/3] border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-foreground/40 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Plus className="h-6 w-6 opacity-30" />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="rounded-none uppercase tracking-wider flex-1">
          {initial ? "Хадгалах" : "Нэмэх"}
        </Button>
        <Button type="button" variant="outline" className="rounded-none uppercase tracking-wider" onClick={onCancel}>
          Болих
        </Button>
      </div>
    </form>
  );
}

const AdminPage = () => {
  const [authed, setAuthed] = useState(() => {
    const ts = sessionStorage.getItem("admin-auth-ts");
    if (!ts) return false;
    return Date.now() - Number(ts) < SESSION_DURATION_MS;
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [attempts, setAttempts] = useState(() => Number(localStorage.getItem("admin-attempts") ?? 0));
  const [lockedUntil, setLockedUntil] = useState(() => Number(localStorage.getItem("admin-locked-until") ?? 0));
  const [lockCountdown, setLockCountdown] = useState(0);
  const { cars, addCar, updateCar, deleteCar } = useCars();
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (lockedUntil <= Date.now()) return;
    const interval = setInterval(() => {
      const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockCountdown(0);
        clearInterval(interval);
      } else {
        setLockCountdown(remaining);
      }
    }, 1000);
    setLockCountdown(Math.ceil((lockedUntil - Date.now()) / 1000));
    return () => clearInterval(interval);
  }, [lockedUntil]);

  useEffect(() => {
    if (!authed) return;
    const ts = Number(sessionStorage.getItem("admin-auth-ts") ?? 0);
    const remaining = SESSION_DURATION_MS - (Date.now() - ts);
    if (remaining <= 0) { handleLogout(); return; }
    const timer = setTimeout(() => {
      toast.error("Сессий дууслаа. Дахин нэвтэрнэ үү.");
      handleLogout();
    }, remaining);
    return () => clearTimeout(timer);
  }, [authed]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockedUntil > Date.now()) return;
    const inputHash = await hashPassword(password);
    if (inputHash === ADMIN_HASH) {
      sessionStorage.setItem("admin-auth-ts", String(Date.now()));
      localStorage.removeItem("admin-attempts");
      localStorage.removeItem("admin-locked-until");
      setAttempts(0);
      setAuthed(true);
      setLoginError("");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem("admin-attempts", String(newAttempts));
      if (newAttempts >= MAX_ATTEMPTS) {
        const until = Date.now() + LOCKOUT_SECONDS * 1000;
        setLockedUntil(until);
        localStorage.setItem("admin-locked-until", String(until));
        localStorage.setItem("admin-attempts", "0");
        setAttempts(0);
        setLoginError("");
      } else {
        setLoginError(`Нууц үг буруу байна. ${MAX_ATTEMPTS - newAttempts} оролдлого үлдлээ.`);
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-auth-ts");
    setAuthed(false);
    setPassword("");
  };

  const handleSave = (car: Car) => {
    if (mode === "add") {
      addCar(car);
      toast.success(`${car.name} нэмэгдлээ`);
    } else {
      updateCar(car);
      toast.success(`${car.name} шинэчлэгдлээ`);
    }
    setMode("list");
    setEditingCar(null);
  };

  const handleDelete = (id: string) => {
    const car = cars.find((c) => c.id === id);
    deleteCar(id);
    toast.success(`${car?.name ?? "Машин"} устгагдлаа`);
    setDeleteConfirm(null);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-light mb-2">Admin</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Urin Motors</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label>Нууц үг</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setLoginError(""); }}
                  className={`rounded-none pr-10 ${loginError ? "border-red-500" : ""}`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {loginError && <p className="text-red-500 text-xs">{loginError}</p>}
              {lockCountdown > 0 && (
                <p className="text-orange-500 text-xs">{lockCountdown} секундын дараа дахин оролдоно уу</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={lockCountdown > 0}
              className="w-full rounded-none uppercase tracking-wider disabled:opacity-50"
            >
              {lockCountdown > 0 ? `Түгжигдсэн (${lockCountdown}с)` : "Нэвтрэх"}
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {mode !== "list" && (
              <button
                onClick={() => { setMode("list"); setEditingCar(null); }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <h1 className="font-heading text-lg font-medium">
              {mode === "list" ? "Admin Dashboard" : mode === "add" ? "Машин нэмэх" : "Машин засах"}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
          >
            <LogOut className="h-4 w-4" />
            Гарах
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {mode === "list" ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Stats + Add Button */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-1">Нийт</p>
                  <p className="font-heading text-4xl font-light">{cars.length} <span className="text-lg text-muted-foreground">машин</span></p>
                </div>
                <Button
                  onClick={() => { setMode("add"); setEditingCar(null); }}
                  className="rounded-none uppercase tracking-wider gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Машин нэмэх
                </Button>
              </div>

              {/* Car List */}
              <div className="border border-border divide-y divide-border">
                {cars.length === 0 ? (
                  <div className="py-16 text-center text-muted-foreground">Машин байхгүй байна</div>
                ) : (
                  cars.map((car) => (
                    <div key={car.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                      <div className="w-20 h-14 flex-shrink-0 overflow-hidden bg-muted">
                        {car.images[0] ? (
                          <img src={car.images[0].url} alt={car.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-5 w-5 opacity-30" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{car.name}</p>
                        <p className="text-sm text-muted-foreground">{car.year} · {car.brand} · {new Intl.NumberFormat("mn-MN").format(car.price)}₮</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {car.featured && (
                          <span className="hidden sm:inline text-xs bg-foreground text-background px-2 py-0.5 uppercase tracking-wider">Онцлох</span>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-none gap-1.5"
                          onClick={() => { setEditingCar(car); setMode("edit"); }}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Засах</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-none gap-1.5 text-red-500 hover:text-red-500 hover:border-red-500"
                          onClick={() => setDeleteConfirm(car.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Устгах</span>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl"
            >
              <CarForm
                initial={editingCar ?? undefined}
                onSave={handleSave}
                onCancel={() => { setMode("list"); setEditingCar(null); }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Delete confirmation dialog */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background border border-border p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-heading text-lg font-medium mb-2">Устгах уу?</h2>
              <p className="text-muted-foreground text-sm mb-6">
                <strong>{cars.find((c) => c.id === deleteConfirm)?.name}</strong> машиныг устгах гэж байна. Энэ үйлдлийг буцааж болохгүй.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="destructive"
                  className="rounded-none flex-1"
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  Устгах
                </Button>
                <Button
                  variant="outline"
                  className="rounded-none flex-1"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Болих
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
