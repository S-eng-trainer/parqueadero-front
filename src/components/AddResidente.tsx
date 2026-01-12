"use client";

import { useState } from "react";

export default function AddResidente({
  onCreated,
}: {
  onCreated?: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [torre, setTorre] = useState("");
  const [apartamento, setApartamento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!nombre.trim() || !torre.trim() || !apartamento.trim()) {
      setErrorMessage(
        "Los campos nombre, torre y apartamento son obligatorios."
      );
      return;
    }

    const payload = {
      nombre: nombre.trim(),
      torre: torre.trim(),
      apartamento: apartamento.trim(),
      telefono: telefono.trim() || null,
      email: email.trim() || null,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/residentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al crear residente");
      }

      setSuccessMessage("Residente creado con éxito.");
      if (onCreated) onCreated();
      setNombre("");
      setTorre("");
      setApartamento("");
      setTelefono("");
      setEmail("");

      // Keep the success message visible briefly
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err: any) {
      setErrorMessage(err?.message || "Error al crear residente");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowForm((s) => !s)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          {showForm ? "Cancelar" : "Agregar residente"}
        </button>
        {successMessage && (
          <div className="text-green-700 bg-green-100 px-3 py-1 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-red-700 bg-red-100 px-3 py-1 rounded">
            {errorMessage}
          </div>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 bg-white p-4 rounded shadow-sm border border-gray-200"
        >
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre *
              </label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Torre *
              </label>
              <input
                value={torre}
                onChange={(e) => setTorre(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apartamento *
              </label>
              <input
                value={apartamento}
                onChange={(e) => setApartamento(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 mt-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 disabled:opacity-60"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
