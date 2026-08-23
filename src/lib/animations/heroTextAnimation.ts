import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

interface Frase {
  equipo: string;
  texto: string;
  color: string;
}

export function animarFrases(frases: Frase[]) {
  const fraseEl = document.getElementById("frase");
  if (!fraseEl) return;

  // repeat: -1 → ciclo infinito (reinicia desde Avengers)
  const tl = gsap.timeline({ repeat: -1 });

  frases.forEach(({ equipo, texto, color }) => {
    // 1. efecto typing con color del equipo
    tl.to(fraseEl, {
      text: `${equipo}: ${texto}`,
      duration: 5,
      ease: "none",
      color: color
    });

    // 2. pausa breve para que se lea
    tl.to(fraseEl, { duration: 1.5 });

    // 3. aplicar verde hechizado (sin desaparecer aún)
    tl.to(fraseEl, {
      color: "#22c55e",
      duration: 0.5,
      ease: "none"
    });

    // 4. mantenerlo un instante en verde
    tl.to(fraseEl, { duration: 1 });

    // 5. desvanecer el texto en verde
    tl.to(fraseEl, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    });

    // 6. reset para la siguiente frase
    tl.set(fraseEl, { opacity: 1, text: "" });
  });
}
