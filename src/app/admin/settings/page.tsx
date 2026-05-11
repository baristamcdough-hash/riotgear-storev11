"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ADMIN_CREDS_KEY, DEFAULT_ADMIN_EMAIL, getAdminCreds } from "@/components/AdminLogin";

const EMAILJS_SERVICE_ID = "service_ud4q3th";
const EMAILJS_TEMPLATE_ID = "template_7xizeyl";
const EMAILJS_PUBLIC_KEY = "lR0od57Crthfh4V1a";
const SITE_CONFIG_KEY = "riotgear_site_config";

const defaultConfig = {
  brandName: "RIOTGEAR", brandAccent: "GEAR",
  promoText: "FREE SHIPPING ON ORDERS OVER $50",
  navMenu: [
    { name: "Men", subcategories: ["Jerseys","Shorts","Training Kits","Jackets","Accessories"] },
    { name: "Women", subcategories: ["Jerseys","Shorts","Training Kits","Jackets","Accessories"] },
    { name: "Kids", subcategories: ["Jerseys","Shorts","Mini Kits","School Gear"] },
    { name: "Jerseys", subcategories: ["Home Kits","Away Kits","Third Kits","Retro","Custom"] },
    { name: "Teams", subcategories: ["Premier League","La Liga","Serie A","Bundesliga","African Teams"] },
  ],
  heroLeft: { tag: "New Season", title: "2025/26 Home Kits", desc: "Rep your team with the latest match-day jerseys.", btnText: "Shop Now" },
  heroRight: { tag: "Limited Edition", title: "African Retro Collection", desc: "Classic designs inspired by legendary African football moments.", btnText: "Explore" },
  footer: {
    shop: [{text:"Men",url:"#"},{text:"Women",url:"#"},{text:"Kids",url:"#"},{text:"New Arrivals",url:"#"},{text:"Sale",url:"#"}],
    teams: [{text:"Premier League",url:"#"},{text:"La Liga",url:"#"},{text:"Serie A",url:"#"},{text:"Bundesliga",url:"#"},{text:"African Teams",url:"#"}],
    support: [{text:"Contact Us",url:"#"},{text:"Shipping Info",url:"#"},{text:"Returns",url:"#"},{text:"Size Guide",url:"#"},{text:"FAQ",url:"#"}],
    connect: [{text:"Instagram",url:"#"},{text:"Twitter/X",url:"#"},{text:"TikTok",url:"#"},{text:"YouTube",url:"#"},{text:"Newsletter",url:"#"}],
  },
  rewards: [
    {name:"5% Off Next Order",cost:50,icon:"🏷️"},{name:"Free Shipping",cost:30,icon:"🚚"},
    {name:"10% Off Any Jersey",cost:100,icon:"👕"},{name:"Mystery Box Unlock",cost:200,icon:"🎁"},
    {name:"VIP Early Access",cost:150,icon:"⭐"},{name:"Exclusive Retro Drop",cost:300,icon:"🔥"},
  ],
};

export function getSiteConfig() {
  if (typeof window === "undefined") return defaultConfig;
  const s = localStorage.getItem(SITE_CONFIG_KEY);
  if (s) try { return JSON.parse(s); } catch {}
  return defaultConfig;
}

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<"site"|"credentials">("site");
  const [config, setConfig] = useState(defaultConfig);
  const [saved, setSaved] = useState(false);
  const creds = getAdminCreds();
  const [newEmail, setNewEmail] = useState(creds.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [credStep, setCredStep] = useState<"form"|"otp"|"done">("form");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [credError, setCredError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => { setConfig(getSiteConfig()); }, []);

  const saveConfig = () => { localStorage.setItem(SITE_CONFIG_KEY, JSON.stringify(config)); setSaved(true); setTimeout(()=>setSaved(false),2000); };

  const updateFooterItem = (section: string, i: number, field: "text"|"url", value: string) => {
    setConfig((p: any) => { const f={...p.footer}; f[section]=[...f[section]]; f[section][i]={...f[section][i],[field]:value}; return {...p,footer:f}; });
  };
  const updateNavItem = (i: number, field: string, value: string) => {
    setConfig((p: any) => { const m=[...p.navMenu]; m[i]=field==="name"?{...m[i],name:value}:{...m[i],subcategories:value.split(",").map((s:string)=>s.trim())}; return {...p,navMenu:m}; });
  };
  const updateReward = (i: number, field: string, value: string) => {
    setConfig((p: any) => { const r=[...p.rewards]; r[i]=field==="cost"?{...r[i],cost:parseInt(value)||0}:{...r[i],[field]:value}; return {...p,rewards:r}; });
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault(); setCredError("");
    if (!newEmail||!newPassword) { setCredError("Required."); return; }
    if (newPassword!==confirmPassword) { setCredError("Mismatch."); return; }
    if (newPassword.length<6) { setCredError("Min 6 chars."); return; }
    const code = Math.floor(100000+Math.random()*900000).toString();
    setGeneratedOtp(code); setSending(true);
    try { await emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,{to_email:DEFAULT_ADMIN_EMAIL,otp_code:code,admin_name:"RiotGear Admin"},EMAILJS_PUBLIC_KEY); }
    catch { alert(`OTP: ${code}`); }
    setSending(false); setCredStep("otp");
  };
  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault(); setCredError("");
    if (otp!==generatedOtp) { setCredError("Invalid OTP."); return; }
    localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify({email:newEmail,password:newPassword}));
    setCredStep("done");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Admin Settings</h1>
      <p className="text-sm text-gray-500 mb-6">Manage site content, branding & credentials</p>
      <div className="flex gap-1 mb-6 border-b">
        <button onClick={()=>setTab("site")} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 ${tab==="site"?"border-[var(--color-gold)] text-[var(--color-charcoal)]":"border-transparent text-gray-400"}`}>Site Content</button>
        <button onClick={()=>setTab("credentials")} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 ${tab==="credentials"?"border-[var(--color-gold)] text-[var(--color-charcoal)]":"border-transparent text-gray-400"}`}>Credentials</button>
      </div>

      {tab==="site" ? (
        <div className="space-y-6 max-w-3xl">
          {/* Brand */}
          <div className="bg-white rounded-lg border p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Brand & Promo Bar</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div><label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Brand Name</label><input value={config.brandName} onChange={e=>setConfig({...config,brandName:e.target.value})} className="w-full border px-3 py-2 text-sm" /></div>
              <div><label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Accent Word</label><input value={config.brandAccent} onChange={e=>setConfig({...config,brandAccent:e.target.value})} className="w-full border px-3 py-2 text-sm" /></div>
            </div>
            <div><label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Promo Bar Text</label><input value={config.promoText} onChange={e=>setConfig({...config,promoText:e.target.value})} className="w-full border px-3 py-2 text-sm" /></div>
          </div>
          {/* Nav */}
          <div className="bg-white rounded-lg border p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Navigation Menu</h2>
            <div className="space-y-2">
              {config.navMenu.map((item: any,i: number)=>(
                <div key={i} className="grid grid-cols-3 gap-2">
                  <input value={item.name} onChange={e=>updateNavItem(i,"name",e.target.value)} className="border px-2 py-1.5 text-xs font-bold" />
                  <input value={item.subcategories.join(", ")} onChange={e=>updateNavItem(i,"sub",e.target.value)} className="col-span-2 border px-2 py-1.5 text-xs" placeholder="Comma separated" />
                </div>
              ))}
            </div>
          </div>
          {/* Hero */}
          <div className="bg-white rounded-lg border p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Hero Banners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded p-3"><p className="text-[10px] font-bold text-[var(--color-gold)] uppercase mb-2">Left (Shop)</p>
                <div className="space-y-2"><input value={config.heroLeft.tag} onChange={e=>setConfig({...config,heroLeft:{...config.heroLeft,tag:e.target.value}})} placeholder="Tag" className="w-full border px-2 py-1.5 text-xs" /><input value={config.heroLeft.title} onChange={e=>setConfig({...config,heroLeft:{...config.heroLeft,title:e.target.value}})} placeholder="Title" className="w-full border px-2 py-1.5 text-xs" /><input value={config.heroLeft.desc} onChange={e=>setConfig({...config,heroLeft:{...config.heroLeft,desc:e.target.value}})} placeholder="Description" className="w-full border px-2 py-1.5 text-xs" /><input value={config.heroLeft.btnText} onChange={e=>setConfig({...config,heroLeft:{...config.heroLeft,btnText:e.target.value}})} placeholder="Button" className="w-full border px-2 py-1.5 text-xs" /></div>
              </div>
              <div className="border rounded p-3"><p className="text-[10px] font-bold text-[var(--color-gold)] uppercase mb-2">Right (Explore)</p>
                <div className="space-y-2"><input value={config.heroRight.tag} onChange={e=>setConfig({...config,heroRight:{...config.heroRight,tag:e.target.value}})} placeholder="Tag" className="w-full border px-2 py-1.5 text-xs" /><input value={config.heroRight.title} onChange={e=>setConfig({...config,heroRight:{...config.heroRight,title:e.target.value}})} placeholder="Title" className="w-full border px-2 py-1.5 text-xs" /><input value={config.heroRight.desc} onChange={e=>setConfig({...config,heroRight:{...config.heroRight,desc:e.target.value}})} placeholder="Description" className="w-full border px-2 py-1.5 text-xs" /><input value={config.heroRight.btnText} onChange={e=>setConfig({...config,heroRight:{...config.heroRight,btnText:e.target.value}})} placeholder="Button" className="w-full border px-2 py-1.5 text-xs" /></div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="bg-white rounded-lg border p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Footer Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["shop","teams","support","connect"].map(section=>(
                <div key={section} className="border rounded p-3"><p className="text-[10px] font-bold text-[var(--color-gold)] uppercase mb-2">{section}</p>
                  <div className="space-y-1.5">{(config.footer as any)[section].map((item: any,i: number)=>(
                    <div key={i} className="flex gap-1.5"><input value={item.text} onChange={e=>updateFooterItem(section,i,"text",e.target.value)} className="w-1/2 border px-2 py-1 text-[11px]" placeholder="Label" /><input value={item.url} onChange={e=>updateFooterItem(section,i,"url",e.target.value)} className="w-1/2 border px-2 py-1 text-[11px]" placeholder="URL" /></div>
                  ))}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Rewards */}
          <div className="bg-white rounded-lg border p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Rewards / Coins Cost</h2>
            <div className="space-y-2">
              {config.rewards.map((r: any,i: number)=>(
                <div key={i} className="grid grid-cols-4 gap-2 items-center">
                  <input value={r.icon} onChange={e=>updateReward(i,"icon",e.target.value)} className="border px-2 py-1.5 text-center text-sm" />
                  <input value={r.name} onChange={e=>updateReward(i,"name",e.target.value)} className="col-span-2 border px-2 py-1.5 text-xs" />
                  <input value={r.cost} onChange={e=>updateReward(i,"cost",e.target.value)} type="number" className="border px-2 py-1.5 text-xs text-center font-bold" />
                </div>
              ))}
              <p className="text-[10px] text-gray-400">Icon | Name | Coin Cost</p>
            </div>
          </div>
          <button onClick={saveConfig} className={`w-full py-3 text-sm font-bold uppercase tracking-[0.2em] ${saved?"bg-green-600 text-white":"bg-[var(--color-charcoal)] text-white hover:bg-[var(--color-accent)]"}`}>{saved?"✓ Saved":"Save All Site Settings"}</button>
        </div>
      ) : (
        <div className="max-w-lg bg-white rounded-lg border p-6">
          {credStep==="done"?<div className="text-center py-8"><div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg></div><p className="font-bold">Credentials Updated</p></div>
          :credStep==="otp"?<div><h2 className="font-bold text-sm uppercase mb-2">Verify OTP</h2><p className="text-xs text-gray-500 mb-4">Sent to {DEFAULT_ADMIN_EMAIL}</p>{credError&&<div className="mb-3 p-2 bg-red-50 text-red-700 text-xs rounded">{credError}</div>}<form onSubmit={handleVerifyOTP}><input type="text" value={otp} onChange={e=>setOtp(e.target.value)} maxLength={6} placeholder="000000" className="w-full border px-4 py-3 text-lg text-center font-mono tracking-[0.5em] mb-3" /><button type="submit" className="w-full bg-[var(--color-charcoal)] text-white py-3 text-sm font-bold uppercase">Verify</button></form></div>
          :<div><h2 className="font-bold text-sm uppercase mb-4">Change Credentials</h2>{credError&&<div className="mb-3 p-2 bg-red-50 text-red-700 text-xs rounded">{credError}</div>}<form onSubmit={handleRequestOTP} className="space-y-3"><input type="email" value={newEmail} onChange={e=>setNewEmail(e.target.value)} required placeholder="New Email" className="w-full border px-3 py-2.5 text-sm" /><input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} required minLength={6} placeholder="New Password" className="w-full border px-3 py-2.5 text-sm" /><input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required placeholder="Confirm" className="w-full border px-3 py-2.5 text-sm" /><button type="submit" disabled={sending} className="w-full bg-[var(--color-charcoal)] text-white py-3 text-sm font-bold uppercase disabled:opacity-50">{sending?"Sending...":"Send OTP & Update"}</button></form></div>}
        </div>
      )}
    </div>
  );
}
