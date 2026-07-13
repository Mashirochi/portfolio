"use client";

import { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSave, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "i18n/routing";

const emptyForm = {
  vi_title: "",
  en_title: "",
  vi_role: "",
  en_role: "",
  vi_short_description: "",
  en_short_description: "",
  vi_description: "",
  en_description: "",
  vi_problem: "",
  en_problem: "",
  vi_solution: "",
  en_solution: "",
  vi_features: "",
  en_features: "",
  vi_challenges: "",
  en_challenges: "",
  cover_image: "",
  youtube_url: "",
  github_url: "",
  published_at: "",
  tags: "",
  order: 0,
};

export default function ProjectsClient({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const router = useRouter();
  const [formData, setFormData] = useState<any>({ ...emptyForm });

  const set = (key: string, val: any) => setFormData((f: any) => ({ ...f, [key]: val }));

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ ...emptyForm, order: data.length + 1 });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    let formattedDate = "";
    if (item.published_at) {
      try {
        const d = new Date(item.published_at);
        if (!isNaN(d.getTime())) {
          formattedDate = d.toISOString().split('T')[0];
        } else {
          formattedDate = item.published_at;
        }
      } catch {
        formattedDate = item.published_at;
      }
    }
    setFormData({
      vi_title: item.vi_title || "",
      en_title: item.en_title || "",
      vi_role: item.vi_role || "",
      en_role: item.en_role || "",
      vi_short_description: item.vi_short_description || "",
      en_short_description: item.en_short_description || "",
      vi_description: item.vi_description || "",
      en_description: item.en_description || "",
      vi_problem: item.vi_problem || "",
      en_problem: item.en_problem || "",
      vi_solution: item.vi_solution || "",
      en_solution: item.en_solution || "",
      vi_features: item.vi_features || "",
      en_features: item.en_features || "",
      vi_challenges: item.vi_challenges || "",
      en_challenges: item.en_challenges || "",
      cover_image: item.cover_image || "",
      youtube_url: item.youtube_url || "",
      github_url: item.github_url || "",
      published_at: formattedDate,
      tags: item.tags ? item.tags.join(", ") : "",
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
      const url = isEdit ? `/api/data/projects/${editingItem._id}` : `/api/data/projects`;
      const method = isEdit ? "PUT" : "POST";

      let isoDate = formData.published_at;
      if (formData.published_at && formData.published_at.length === 10) {
        isoDate = new Date(formData.published_at).toISOString();
      }

      const submissionData = {
        ...formData,
        published_at: isoDate,
        tags: formData.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!res.ok) throw new Error("Failed to save data");

      const savedItem = await res.json();

      if (isEdit) {
        setData(data.map(item => item._id === savedItem._id ? savedItem : item));
        toast.success("Project updated successfully");
      } else {
        setData([...data, savedItem].sort((a, b) => a.order - b.order));
        toast.success("Project added successfully");
      }

      closeModal();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/data/projects/${id}`, { method: "DELETE" });
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

  const inputCls = "w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all";
  const textareaCls = "w-full bg-[#0a0d17] border border-[#2a2a5a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-y";
  const labelCls = "block text-sm font-medium text-gray-400 mb-1";
  const sectionHeadCls = "col-span-2 text-xs font-bold uppercase tracking-widest text-violet-400 pt-4 pb-1 border-b border-[#2a2a5a]";

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Projects</h1>
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
                <th className="px-6 py-4 font-semibold text-sm text-gray-300">Role (EN)</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-300">Published At</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-300">YouTube</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-300">GitHub</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a5a]">
              {data.map((proj: any) => (
                <tr key={proj._id} className="hover:bg-[#1a1f3c]/50 transition-colors group">
                  <td className="px-6 py-4 text-sm text-gray-400">{proj.order}</td>
                  <td className="px-6 py-4 text-sm font-medium max-w-[200px] truncate">{proj.en_title}</td>
                  <td className="px-6 py-4 text-sm text-[#16f2b3]">{proj.en_role || "—"}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{proj.published_at ? proj.published_at.slice(0, 10) : "—"}</td>
                  <td className="px-6 py-4 text-sm">
                    {proj.youtube_url
                      ? <a href={proj.youtube_url} target="_blank" rel="noreferrer" className="text-red-400 hover:underline">Link</a>
                      : <span className="text-gray-600">—</span>}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {proj.github_url
                      ? <a href={proj.github_url} target="_blank" rel="noreferrer" className="text-violet-400 hover:underline">Link</a>
                      : <span className="text-gray-600">—</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-2 text-violet-400 hover:text-white hover:bg-violet-600/20 rounded-lg transition-colors mr-2"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(proj._id)}
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
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No projects found. Click &quot;Add New&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto pt-10 pb-10">
          <div className="bg-[#101428] border border-[#2a2a5a] rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-[#2a2a5a]">
              <h3 className="text-xl font-bold text-white">
                {editingItem ? "Edit Project" : "Add Project"}
              </h3>
              <button type="button" onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">

                {/* ── BASIC ── */}
                <div className={sectionHeadCls}>Basic Info</div>

                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Title (VI)</label>
                  <input type="text" required value={formData.vi_title} onChange={e => set('vi_title', e.target.value)} className={inputCls} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Title (EN)</label>
                  <input type="text" required value={formData.en_title} onChange={e => set('en_title', e.target.value)} className={inputCls} />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Role (VI)</label>
                  <input type="text" value={formData.vi_role} onChange={e => set('vi_role', e.target.value)} className={inputCls} placeholder="Ví dụ: Full-stack Developer" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Role (EN)</label>
                  <input type="text" value={formData.en_role} onChange={e => set('en_role', e.target.value)} className={inputCls} placeholder="e.g. Full-stack Developer" />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Cover Image URL</label>
                  <input type="url" value={formData.cover_image} onChange={e => set('cover_image', e.target.value)} className={inputCls} placeholder="https://..." />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Published At</label>
                  <input type="date" value={formData.published_at} onChange={e => set('published_at', e.target.value)} className={inputCls} />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>YouTube Demo URL</label>
                  <input type="url" value={formData.youtube_url} onChange={e => set('youtube_url', e.target.value)} className={inputCls} placeholder="https://youtube.com/..." />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>GitHub URL</label>
                  <input type="url" value={formData.github_url} onChange={e => set('github_url', e.target.value)} className={inputCls} placeholder="https://github.com/..." />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Tags (comma separated)</label>
                  <input type="text" value={formData.tags} onChange={e => set('tags', e.target.value)} className={inputCls} placeholder="React, Node.js, MongoDB" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Order</label>
                  <input type="number" required value={formData.order} onChange={e => set('order', Number(e.target.value))} className={inputCls} />
                </div>

                {/* ── SHORT DESCRIPTION ── */}
                <div className={sectionHeadCls}>Short Description (shown on card)</div>

                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Short Description (VI)</label>
                  <textarea rows={2} value={formData.vi_short_description} onChange={e => set('vi_short_description', e.target.value)} className={textareaCls} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Short Description (EN)</label>
                  <textarea rows={2} value={formData.en_short_description} onChange={e => set('en_short_description', e.target.value)} className={textareaCls} />
                </div>

                {/* ── DETAIL DESCRIPTION ── */}
                <div className={sectionHeadCls}>Vấn đề cần giải quyết / Problem to Solve</div>

                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Problem (VI)</label>
                  <textarea rows={3} value={formData.vi_problem} onChange={e => set('vi_problem', e.target.value)} className={textareaCls} placeholder="Mô tả vấn đề..." />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Problem (EN)</label>
                  <textarea rows={3} value={formData.en_problem} onChange={e => set('en_problem', e.target.value)} className={textareaCls} placeholder="Describe the problem..." />
                </div>

                <div className={sectionHeadCls}>Giải pháp / Solution Implemented</div>

                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Solution (VI)</label>
                  <textarea rows={3} value={formData.vi_solution} onChange={e => set('vi_solution', e.target.value)} className={textareaCls} placeholder="Mô tả giải pháp..." />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Solution (EN)</label>
                  <textarea rows={3} value={formData.en_solution} onChange={e => set('en_solution', e.target.value)} className={textareaCls} placeholder="Describe the solution..." />
                </div>

                <div className={sectionHeadCls}>Tính năng nổi bật / Key Features</div>

                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Features (VI)</label>
                  <textarea rows={3} value={formData.vi_features} onChange={e => set('vi_features', e.target.value)} className={textareaCls} placeholder="Liệt kê tính năng..." />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Features (EN)</label>
                  <textarea rows={3} value={formData.en_features} onChange={e => set('en_features', e.target.value)} className={textareaCls} placeholder="List key features..." />
                </div>

                <div className={sectionHeadCls}>Khó khăn & Bài học / Challenges & Lessons</div>

                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Challenges (VI)</label>
                  <textarea rows={3} value={formData.vi_challenges} onChange={e => set('vi_challenges', e.target.value)} className={textareaCls} placeholder="Mô tả khó khăn và bài học..." />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Challenges (EN)</label>
                  <textarea rows={3} value={formData.en_challenges} onChange={e => set('en_challenges', e.target.value)} className={textareaCls} placeholder="Describe challenges & lessons..." />
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
