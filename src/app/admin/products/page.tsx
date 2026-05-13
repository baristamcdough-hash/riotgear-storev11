"use client";
import { useState, useRef } from "react";
import { products as initialProducts, Product } from "@/lib/products";

export default function ProductsPage() {
  const [list, setList] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", team: "", price: "", originalPrice: "", category: "", description: "", badge: "", image: "", backImage: "", modelUrl: "", sizes: "S,M,L,XL,XXL" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const backFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "image" | "backImage") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, [field]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const openNew = () => { setForm({ name: "", team: "", price: "", originalPrice: "", category: "", description: "", badge: "", image: "", backImage: "", modelUrl: "", sizes: "S,M,L,XL,XXL" }); setEditing(null); setShowForm(true); };
  const openEdit = (p: Product) => { setForm({ name: p.name, team: p.team, price: String(p.price), originalPrice: String(p.originalPrice||""), category: p.category, description: p.description, badge: p.badge||"", image: p.images[0], backImage: p.backImage||"", modelUrl: p.modelUrl||"", sizes: p.sizes.join(",") }); setEditing(p); setShowForm(true); };

  const handleSave = () => {
    const np: Product = { id: editing?.id||Date.now(), slug: editing?.slug||form.name.toLowerCase().replace(/[^a-z0-9]+/g,"-"), name: form.name, team: form.team, price: parseFloat(form.price)||0, originalPrice: form.originalPrice?parseFloat(form.originalPrice):undefined, images: [form.image||"https://placehold.co/400x500/333/fff?text=Product"], backImage: form.backImage||undefined, modelUrl: form.modelUrl||undefined, badge: (form.badge as any)||undefined, description: form.description, details: ["Premium quality","Official merchandise"], sizes: form.sizes.split(",").map(s=>s.trim()), category: form.category };
    if (editing) { setList(p=>p.map(x=>x.id===editing.id?np:x)); } else { setList(p=>[...p,np]); }
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">Products</h1><p className="text-sm text-gray-500 mt-1">{list.length} products</p></div>
        <button onClick={openNew} className="bg-[var(--color-charcoal)] text-white px-4 py-2 text-xs font-bold uppercase hover:bg-[var(--color-accent)]">+ Add Product</button>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={()=>setShowForm(false)}>
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg p-6" onClick={e=>e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">{editing?"Edit":"Add"} Product</h2>
            <div className="space-y-3">
              <input placeholder="Product Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border px-3 py-2 text-sm" />
              <div className="grid grid-cols-2 gap-3"><input placeholder="Team *" value={form.team} onChange={e=>setForm({...form,team:e.target.value})} className="w-full border px-3 py-2 text-sm" /><input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full border px-3 py-2 text-sm" /></div>
              <div className="grid grid-cols-2 gap-3"><input placeholder="Price *" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="w-full border px-3 py-2 text-sm" /><input placeholder="Original Price" type="number" value={form.originalPrice} onChange={e=>setForm({...form,originalPrice:e.target.value})} className="w-full border px-3 py-2 text-sm" /></div>
              {/* Image Upload */}
              <div className="border-2 border-dashed border-gray-200 rounded p-3">
                <p className="text-[10px] font-bold uppercase text-gray-500 mb-2">Front Image</p>
                <div className="flex gap-2">
                  <input placeholder="Image URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} className="flex-1 border px-3 py-2 text-sm" />
                  <input type="file" ref={fileInputRef} accept="image/*" onChange={(e) => handleFileUpload(e, "image")} className="hidden" />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="px-3 py-2 bg-[var(--color-charcoal)] text-white text-[10px] font-bold uppercase whitespace-nowrap">Upload</button>
                </div>
                {form.image && <img src={form.image} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded border" />}
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded p-3">
                <p className="text-[10px] font-bold uppercase text-gray-500 mb-2">Back Image (for 3D flip)</p>
                <div className="flex gap-2">
                  <input placeholder="Back image URL" value={form.backImage} onChange={e=>setForm({...form,backImage:e.target.value})} className="flex-1 border px-3 py-2 text-sm" />
                  <input type="file" ref={backFileInputRef} accept="image/*" onChange={(e) => handleFileUpload(e, "backImage")} className="hidden" />
                  <button type="button" onClick={() => backFileInputRef.current?.click()} className="px-3 py-2 bg-[var(--color-charcoal)] text-white text-[10px] font-bold uppercase whitespace-nowrap">Upload</button>
                </div>
                {form.backImage && <img src={form.backImage} alt="Back Preview" className="mt-2 w-20 h-20 object-cover rounded border" />}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">3D Model URL (.glb)</p>
                <input placeholder="https://...model.glb (optional)" value={form.modelUrl} onChange={e=>setForm({...form,modelUrl:e.target.value})} className="w-full border px-3 py-2 text-sm" />
              </div>
              <input placeholder="Sizes (S,M,L,XL)" value={form.sizes} onChange={e=>setForm({...form,sizes:e.target.value})} className="w-full border px-3 py-2 text-sm" />
              <select value={form.badge} onChange={e=>setForm({...form,badge:e.target.value})} className="w-full border px-3 py-2 text-sm"><option value="">No Badge</option><option value="Best Seller">Best Seller</option><option value="New Arrival">New Arrival</option></select>
              <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={3} className="w-full border px-3 py-2 text-sm" />
            </div>
            <div className="flex gap-3 mt-5"><button onClick={()=>setShowForm(false)} className="flex-1 border py-2 text-xs font-bold uppercase">Cancel</button><button onClick={handleSave} className="flex-1 bg-[var(--color-charcoal)] text-white py-2 text-xs font-bold uppercase hover:bg-[var(--color-accent)]">{editing?"Update":"Add"}</button></div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {list.map(p=>(
          <div key={p.id} className="bg-white border rounded-lg overflow-hidden">
            <div className="aspect-[4/5] bg-gray-100"><img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" /></div>
            <div className="p-3">
              <p className="text-[10px] text-[var(--color-gold)] font-bold uppercase">{p.team}</p>
              <h3 className="text-xs font-medium line-clamp-1 mt-0.5">{p.name}</h3>
              <div className="flex items-center justify-between mt-2"><span className="font-bold text-sm">${p.price}</span>{p.badge&&<span className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-100 rounded">{p.badge}</span>}</div>
              <div className="flex gap-2 mt-3"><button onClick={()=>openEdit(p)} className="flex-1 border py-1.5 text-[10px] font-bold uppercase hover:bg-gray-50">Edit</button><button onClick={()=>setList(pr=>pr.filter(x=>x.id!==p.id))} className="px-3 py-1.5 text-[10px] font-bold uppercase text-red-600 border border-red-200 hover:bg-red-50">Del</button></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
