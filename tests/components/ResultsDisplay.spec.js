import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import ResultsDisplay from "@/components/ResultsDisplay.vue";

describe("ResultsDisplay", () => {
  it("affiche le lien Google Maps quand url fournie", () => {
    render(ResultsDisplay, { props: { url: "https://maps.google.com/?q=0,0" } });
    expect(screen.getByRole("link", { name: /ouvrir dans google maps/i })).toBeInTheDocument();
  });

  it("affiche le message d’erreur", () => {
    render(ResultsDisplay, { props: { error: "Pas de GPS" } });
    expect(screen.getByText(/pas de gps/i)).toBeInTheDocument();
  });
});
