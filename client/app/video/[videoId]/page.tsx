"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatBox from "../../components/ChatBox";
import api from "../../utils/api";

export default function VideoPage() {
  const params = useParams();
  const videoId = params.videoId as string; // Menangkap ID dari URL

  const [summaryData, setSummaryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk mengambil data video dari database
    const fetchVideoData = async () => {
      try {
        const response = await api.get(`/chat/${videoId}`);
        setSummaryData(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data video:", error);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchVideoData();
    }
  }, [videoId]);

  if (loading)
    return <div className="p-8 text-center">Memuat Ringkasan AI...</div>;
  if (!summaryData)
    return (
      <div className="p-8 text-center text-red-500">Video tidak ditemukan.</div>
    );

  return (
    <main className="flex flex-col lg:flex-row min-h-screen p-8 gap-8">
      {/* Bagian Kiri: Area Summary */}
      <section className="w-full lg:w-1/2 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{summaryData.title}</h1>
        <div className="bg-gray-50 p-6 rounded-lg border whitespace-pre-wrap">
          <h2 className="font-semibold mb-4 text-lg">Ringkasan Video:</h2>
          {summaryData.summary}
        </div>
      </section>

      {/* Bagian Kanan: Area Chat */}
      <section className="w-full lg:w-1/2">
        <ChatBox videoId={videoId} />
      </section>
    </main>
  );
}
