import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { nextTick } from "vue";
import ImageDropzone from "@/components/ImageDropzone.vue";

/* Mock du service -------------------------------------------------------- */
vi.mock("@/services/imageService", () => ({
  extractGpsFromImage: vi.fn(),
}));

describe("ImageDropzone – état 429", () => {
  it("affiche un compte à rebours après 429", async () => {
    vi.useFakeTimers();

    // 1. on prépare le rejet 429
    const { extractGpsFromImage } = await import("@/services/imageService");
    extractGpsFromImage.mockRejectedValueOnce({
      code: 429,
      message: "Trop de requêtes",
      retryAfter: 2, // durée du compte‑à‑rebours
    });

    // 2. on monte le composant
    render(ImageDropzone);

    // 3. on déclenche un upload factice
    const file = new File(["x"], "img.jpg", { type: "image/jpeg" });
    await userEvent.click(screen.getByRole("button", { name: /parcourir/i }));
    const input = document.querySelector('input[type="file"]');
    await userEvent.upload(input, file);

    // 4. le message « Réessayez dans 2 s … » doit apparaître
    expect(await screen.findByText(/réessayez.*2.*s/i)).toBeInTheDocument();

    // 5. on laisse passer les 2 s du compte‑à‑rebours
    await vi.advanceTimersByTimeAsync(2000);
    await vi.runOnlyPendingTimersAsync();
    await nextTick(); // flush du rendu Vue

    // 6. le message a disparu
    await waitFor(() => expect(screen.queryByText(/réessayez dans/i)).not.toBeInTheDocument());

    vi.useRealTimers();
  }, 15000); // 15 s de timeout maxi pour ce test
});
