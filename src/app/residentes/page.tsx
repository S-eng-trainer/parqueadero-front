"use client";

import React, { useEffect, useState } from "react";
import AddResidente from "@/components/AddResidente";

interface Residente {
  residenteID: number;
  nombre: string;
  apartamento: string;
  torre: string;
  telefono: string | null;
  email: string | null;
}

export default function ResidentesPage() {
  const [residentes, setResidentes] = useState<Residente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchResidentes() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/residentes", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Error al obtener residentes");
      }

      const data = await res.json();
      setResidentes(data);
    } catch (err: any) {
      setError(err?.message || "Error al obtener residentes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchResidentes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Residentes</h1>

      <div className="mb-6">
        <AddResidente onCreated={fetchResidentes} />
      </div>

      {loading ? (
        <p className="text-gray-600">Cargando residentes...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : residentes.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          No hay residentes registrados
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {residentes.map((residente) => (
            <div
              key={residente.residenteID}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-2">{residente.nombre}</h2>
              <div className="space-y-1 text-gray-600">
                <p>
                  <span className="font-medium">Torre:</span> {residente.torre}
                </p>
                <p>
                  <span className="font-medium">Apartamento:</span>{" "}
                  {residente.apartamento}
                </p>
                {residente.telefono && (
                  <p>
                    <span className="font-medium">Teléfono:</span>{" "}
                    {residente.telefono}
                  </p>
                )}
                {residente.email && (
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {residente.email}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
