import { createFileRoute } from "@tanstack/react-router";
// @ts-ignore
import WelcomeHero from "@/components/WelcomeHero";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Raya's Kitchen — Welcome" },
      { name: "description", content: "Welcome to Raya's Kitchen. Where every dish tells a story." },
    ],
  }),
});

function Index() {
  return <WelcomeHero />;
}
