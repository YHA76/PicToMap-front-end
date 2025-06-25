export async function extractGpsFromImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("http://192.168.1.125:5000/extract-gps", {
      method: "POST",
      body: formData,
    });
    // Si le serveur renvoie une erreur 422 donc aucune donnée GPS trouvée
    if (response.status === 422) {
      throw new Error("Aucune donnée GPS trouvée dans l’image.");
    }

    if (!response.ok) {
      throw new Error("Une erreur est survenue côté serveur.");
    }

    const data = await response.json();
    return {
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    throw new Error(error.message || "Erreur de communication avec le serveur.");
  }
}
