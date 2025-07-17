const API = import.meta.env.VITE_API_URL;

export async function extractGpsFromImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${API}/extract-gps`, {
      method: "POST",
      body: formData,
    });
    if (response.status === 415) {
      const data = await response.json(); // { error: "Format d’image…" }
      throw { message: data.error };
    }

    // Si le serveur renvoie une erreur 422 donc aucune donnée GPS trouvée
    if (response.status === 422) {
      throw new Error("Aucune donnée GPS trouvée dans l’image.");
    }
    // Si le serveur renvoie une erreur 429 donc trop de requêtes
    if (response.status === 429) {
      const data = await response.json();
      const retry = Number(data.retry_after || 10);
      throw { message: data.error, retry };
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
    // On propage l’objet tel quel pour conserver error.retry
    if (error.retry) {
      throw { message: error.message, retry: error.retry };
    }
    // Sinon on renvoie l’erreur classique
    throw new Error(error.message || "Erreur de communication avec le serveur.");
  }
}
