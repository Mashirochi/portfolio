"use client";

import { useState } from "react";
import { FaEdit, FaSave, FaTimes, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "i18n/routing";

export default function PersonalDataClient({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const router = useRouter();

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData(data); // Reset form data
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use the generic type endpoint. If personal data already exists, our POST handles update or we use PUT.
      // But the API for POST "personal-data" already checks and updates if exists.
      const res = await fetch(`/api/data/personal-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save data");

      const savedItem = await res.json();
      setData(savedItem);
      setIsEditing(false);
      toast.success("Personal data updated successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleCopyJson = () => {
    const { _id, __v, createdAt, updatedAt, ...cleanData } = data;
    navigator.clipboard.writeText(JSON.stringify(cleanData, null, 2));
    toast.success("JSON copied to clipboard!");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Personal Data</h1>
        <div className="flex gap-3">
          <button 
            onClick={handleCopyJson}
            className="flex items-center px-4 py-2 bg-[#1a1f3c] border border-[#2a2a5a] hover:bg-[#2a2a5a] text-gray-300 rounded-lg transition-all font-medium"
          >
            <FaCopy className="mr-2" /> Copy JSON
          </button>
          {!isEditing && (
            <button 
              onClick={handleEditToggle}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-lg shadow-lg shadow-violet-500/20 transition-all font-medium"
            >
              <FaEdit className="mr-2" /> Edit Profile
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-[#101428]/80 backdrop-blur-xl rounded-2xl border border-[#2a2a5a] shadow-xl overflow-hidden p-8 animate-in fade-in duration-300">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              {isEditing ? (
                <input type="text" required value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all" />
              ) : (
                <div className="text-white text-lg font-medium">{data.name}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              {isEditing ? (
                <input type="email" required value={formData.email || ""} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all" />
              ) : (
                <div className="text-white text-lg font-medium">{data.email}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
              {isEditing ? (
                <input type="text" required value={formData.phone || ""} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all" />
              ) : (
                <div className="text-white text-lg font-medium">{data.phone}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Address (EN)</label>
              {isEditing ? (
                <input type="text" required value={formData.en_address || ""} onChange={e => setFormData({...formData, en_address: e.target.value})} className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all" />
              ) : (
                <div className="text-white text-lg font-medium">{data.en_address}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Address (VI)</label>
              {isEditing ? (
                <input type="text" required value={formData.vi_address || ""} onChange={e => setFormData({...formData, vi_address: e.target.value})} className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all" />
              ) : (
                <div className="text-white text-lg font-medium">{data.vi_address}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Designation (EN)</label>
              {isEditing ? (
                <input type="text" required value={formData.en_designation || ""} onChange={e => setFormData({...formData, en_designation: e.target.value})} className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all" />
              ) : (
                <div className="text-white text-lg font-medium text-violet-300">{data.en_designation}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Designation (VI)</label>
              {isEditing ? (
                <input type="text" required value={formData.vi_designation || ""} onChange={e => setFormData({...formData, vi_designation: e.target.value})} className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all" />
              ) : (
                <div className="text-white text-lg font-medium">{data.vi_designation}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Profile Image URL</label>
              {isEditing ? (
                <input type="text" required value={formData.profile || ""} onChange={e => setFormData({...formData, profile: e.target.value})} className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all" />
              ) : (
                <div className="text-white text-lg font-medium truncate">{data.profile}</div>
              )}
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Description (EN)</label>
              {isEditing ? (
                <textarea rows={4} required value={formData.en_description || ""} onChange={e => setFormData({...formData, en_description: e.target.value})} className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all" />
              ) : (
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{data.en_description}</div>
              )}
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Description (VI)</label>
              {isEditing ? (
                <textarea rows={4} required value={formData.vi_description || ""} onChange={e => setFormData({...formData, vi_description: e.target.value})} className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all" />
              ) : (
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{data.vi_description}</div>
              )}
            </div>
            
            <div className="col-span-1 md:col-span-2 mt-4 pt-6 border-t border-[#2a2a5a]">
              <h3 className="text-lg font-bold text-white mb-4">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["github", "facebook", "linkedIn", "twitter", "leetcode"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-400 mb-1 capitalize">{field}</label>
                    {isEditing ? (
                      <input type="text" value={formData[field] || ""} onChange={e => setFormData({...formData, [field]: e.target.value})} className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm" />
                    ) : (
                      <div className="text-gray-300 text-sm truncate">{data[field] || "—"}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {isEditing && (
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-[#2a2a5a]">
              <button type="button" onClick={handleEditToggle} className="flex items-center px-5 py-2.5 text-gray-300 hover:text-white transition-colors">
                <FaTimes className="mr-2" /> Cancel
              </button>
              <button type="submit" className="flex items-center px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow-lg shadow-violet-500/20 transition-all font-medium">
                <FaSave className="mr-2" /> Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
