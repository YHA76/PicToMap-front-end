export async function extractGpsFromImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/extract-gps`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Aucune donnée GPS trouvée dans l’image.");
    }

    const data = await response.json();
    return {
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    throw new Error("Erreur de communication avec le serveur.");
  }
}
