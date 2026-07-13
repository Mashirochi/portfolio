"use client";

import { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSave, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/routing";

export default function ExperiencesClient({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    vi_title: "",
    en_title: "",
    vi_company: "",
    en_company: "",
    vi_duration: "",
    en_duration: "",
    order: 0,
  });

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ vi_title: "", en_title: "", vi_company: "", en_company: "", vi_duration: "", en_duration: "", order: data.length + 1 });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      vi_title: item.vi_title || "",
      en_title: item.en_title || "",
      vi_company: item.vi_company || "",
      en_company: item.en_company || "",
      vi_duration: item.vi_duration || "",
      en_duration: item.en_duration || "",
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = !!editingItem;
      const url = isEdit ? `/api/data/experiences/${editingItem._id}` : `/api/data/experiences`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save data");

      const savedItem = await res.json();
      
      if (isEdit) {
        setData(data.map(item => item._id === savedItem._id ? savedItem : item));
        toast.success("Experience updated successfully");
      } else {
        setData([...data, savedItem].sort((a, b) => a.order - b.order));
        toast.success("Experience added successfully");
      }
      
      closeModal();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      const res = await fetch(`/api/data/experiences/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      
      setData(data.filter(item => item._id !== id));
      toast.success("Deleted successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleCopyJson = () => {
    const cleanData = data.map(({ _id, __v, createdAt, updatedAt, ...rest }) => rest);
    navigator.clipboard.writeText(JSON.stringify(cleanData, null, 2));
    toast.success("JSON copied to clipboard!");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Experiences</h1>
        <div className="flex gap-3">
          <button 
            onClick={handleCopyJson}
            className="flex items-center px-4 py-2 bg-[#1a1f3c] border border-[#2a2a5a] hover:bg-[#2a2a5a] text-gray-300 rounded-lg transition-all font-medium"
          >
            <FaCopy className="mr-2" /> Copy JSON
          </button>
          <button 
            onClick={openAddModal}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-lg shadow-lg shadow-violet-500/20 transition-all font-medium"
          >
            <FaPlus className="mr-2" /> Add New
          </button>
        </div>
      </div>
      
      <div className="bg-[#101428]/80 backdrop-blur-xl rounded-2xl border border-[#2a2a5a] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white whitespace-nowrap">
            <thead className="bg-[#1a1f3c]">
              <tr>
                <th className="px-6 py-4 font-semibold text-sm text-gray-300">Order</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-300">Title (EN)</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-300">Company (EN)</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-300">Duration (VI)</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-300">Duration (EN)</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a5a]">
              {data.map((exp: any) => (
                <tr key={exp._id} className="hover:bg-[#1a1f3c]/50 transition-colors group">
                  <td className="px-6 py-4 text-sm text-gray-400">{exp.order}</td>
                  <td className="px-6 py-4 text-sm font-medium">{exp.en_title}</td>
                  <td className="px-6 py-4 text-sm text-violet-300">{exp.en_company}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{exp.vi_duration}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{exp.en_duration}</td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button 
                      onClick={() => openEditModal(exp)}
                      className="p-2 text-violet-400 hover:text-white hover:bg-violet-600/20 rounded-lg transition-colors mr-2"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(exp._id)}
                      className="p-2 text-red-400 hover:text-white hover:bg-red-600/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No experiences found. Click &quot;Add New&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto pt-20 pb-10">
          <div className="bg-[#101428] border border-[#2a2a5a] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-[#2a2a5a]">
              <h3 className="text-xl font-bold text-white">
                {editingItem ? "Edit Experience" : "Add Experience"}
              </h3>
              <button type="button" onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                <FaTimes size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Title (VI)</label>
                  <input 
                    type="text" required
                    value={formData.vi_title} onChange={e => setFormData({...formData, vi_title: e.target.value})}
                    className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Title (EN)</label>
                  <input 
                    type="text" required
                    value={formData.en_title} onChange={e => setFormData({...formData, en_title: e.target.value})}
                    className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Company (VI)</label>
                  <input 
                    type="text" required
                    value={formData.vi_company} onChange={e => setFormData({...formData, vi_company: e.target.value})}
                    className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Company (EN)</label>
                  <input 
                    type="text" required
                    value={formData.en_company} onChange={e => setFormData({...formData, en_company: e.target.value})}
                    className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Duration (VI)</label>
                  <input 
                    type="text" required placeholder="e.g. 2018 - 2022"
                    value={formData.vi_duration} onChange={e => setFormData({...formData, vi_duration: e.target.value})}
                    className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Duration (EN)</label>
                  <input 
                    type="text" required placeholder="e.g. 2018 - 2022"
                    value={formData.en_duration} onChange={e => setFormData({...formData, en_duration: e.target.value})}
                    className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Order</label>
                  <input 
                    type="number" required
                    value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})}
                    className="w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-[#2a2a5a]">
                <button type="button" onClick={closeModal} className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex items-center px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow-lg shadow-violet-500/20 transition-all font-medium">
                  <FaSave className="mr-2" /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
