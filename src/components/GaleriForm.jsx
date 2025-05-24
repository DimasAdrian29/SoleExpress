import { useState, useEffect } from "react";

export default function GaleriForm({ onSave, dataToEdit, cancelEdit }) {
  const [form, setForm] = useState({ title: "", image: "" });

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.image) return alert("Lengkapi semua data!");
    onSave(form);
    setForm({ title: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-md shadow-md">
      <input
        type="text"
        name="title"
        placeholder="Judul Gambar"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="image"
        placeholder="URL Gambar"
        value={form.image}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {dataToEdit ? "Update" : "Add"}
        </button>
        {dataToEdit && (
          <button onClick={cancelEdit} type="button" className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
