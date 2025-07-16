import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import ImageDropzone from "@/components/ImageDropzone.vue";

// mock global du service
vi.mock("@/services/imageService", () => ({
  extractGpsFromImage: vi.fn(() => Promise.resolve({ latitude: 48.8584, longitude: 2.2945 })),
}));

describe("ImageDropzone", () => {
  it("émet coordsFound après upload JPEG", async () => {
    const file = new File(["dummy"], "photo.jpg", { type: "image/jpeg" });

    // on récupère les events émis
    const { emitted } = render(ImageDropzone);

    await userEvent.click(screen.getByRole("button", { name: /parcourir/i }));
    const input = document.querySelector('input[type="file"]');
    await userEvent.upload(input, file);

    await waitFor(() => {
      expect(emitted()).toHaveProperty("coordsFound");
      expect(emitted().coordsFound[0][0]).toEqual({
        latitude: 48.8584,
        longitude: 2.2945,
      });
    });
  });

  it("met la bordure rouge sur erreur PNG", async () => {
    // force le mock à rejeter une 415
    const { extractGpsFromImage } = await import("@/services/imageService");
    extractGpsFromImage.mockRejectedValueOnce({
      code: 415,
      message: "Format de fichier non pris en charge",
    });

    const bad = new File(["dummy"], "img.png", { type: "image/png" });

    render(ImageDropzone);

    await userEvent.click(screen.getByRole("button", { name: /parcourir/i }));
    const input = document.querySelector('input[type="file"]');
    await userEvent.upload(input, bad);

    const dropzone = document.querySelector(".uploader-area");
    await waitFor(() => {
      expect(dropzone.className).toMatch(/border-error-500/);
    });
  });
});
