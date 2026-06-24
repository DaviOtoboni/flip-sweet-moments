import { createFileRoute } from "@tanstack/react-router";
import { Heart, Play, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nosso Amor — Memórias & Momentos" },
      {
        name: "description",
        content:
          "Uma página fofa e carinhosa com galeria interativa de flip cards e mosaico de redes sociais para o dia dos namorados.",
      },
      { property: "og:title", content: "Nosso Amor — Memórias & Momentos" },
      {
        property: "og:description",
        content: "Galeria interativa com flip cards e mosaico do Instagram/Facebook.",
      },
    ],
  }),
  component: Index,
});

/* =========================================================================
   1) DADOS DOS FLIP CARDS — substitua a imagem (front) e o texto (back).
   ========================================================================= */
const flipCards = [
  {
    // <!-- INSIRA SUA FOTO AQUI -->
    image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&q=80",
    alt: "Momento especial 1",
    // <!-- INSIRA SEU TEXTO DO VERSO AQUI -->
    title: "Nosso primeiro encontro",
    text: "Aquele dia em que tudo começou e o coração não parou de sorrir.",
  },
  {
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80",
    alt: "Momento especial 2",
    title: "Pequenos gestos",
    text: "Um abraço apertado vale mais que mil palavras.",
  },
  {
    image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&q=80",
    alt: "Momento especial 3",
    title: "Viagens juntos",
    text: "Explorar o mundo ao seu lado é a melhor aventura.",
  },
  {
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
    alt: "Momento especial 4",
    title: "Dias preguiçosos",
    text: "Manhãs lentas, café e você. Perfeição.",
  },
  {
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
    alt: "Momento especial 5",
    title: "Risadas sem fim",
    text: "Você é o motivo dos meus sorrisos mais sinceros.",
  },
  {
    image: "https://images.unsplash.com/photo-1525361531253-bd17f3536263?w=800&q=80",
    alt: "Momento especial 6",
    title: "Para sempre",
    text: "Cada dia ao seu lado é uma página nova da nossa história.",
  },
];

/* =========================================================================
   2) DADOS DO MOSAICO DE REDES SOCIAIS — substitua imagem e link de cada post.
   ========================================================================= */
const socialPosts = [
  {
    image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=400&q=80",
    href: "https://www.instagram.com/p/SEU_POST_AQUI/",
    label: "Ver no Instagram",
  },
  {
    image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&q=80",
    href: "https://www.facebook.com/SEU_POST_AQUI",
    label: "Ver no Facebook",
  },
  {
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
    href: "https://www.instagram.com/p/SEU_POST_AQUI/",
    label: "Ver no Instagram",
  },
  {
    image: "https://images.unsplash.com/photo-1525361531253-bd17f3536263?w=400&q=80",
    href: "https://www.instagram.com/p/SEU_POST_AQUI/",
    label: "Ver no Instagram",
  },
  {
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80",
    href: "https://www.facebook.com/SEU_POST_AQUI",
    label: "Ver no Facebook",
  },
  {
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80",
    href: "https://www.instagram.com/p/SEU_POST_AQUI/",
    label: "Ver no Instagram",
  },
];

/* =========================================================================
   3) MÚSICA — substitua o caminho abaixo pelo arquivo de áudio desejado.
      Você pode colocar um arquivo em `public/` (ex: public/nossa-musica.mp3)
      e usar "/nossa-musica.mp3", ou usar um link externo (https://...).
   ========================================================================= */
const AUDIO_SRC = "/nossa-musica.mp3"; // <!-- INSIRA SUA MÚSICA AQUI -->
const AUDIO_TITLE = "Nossa música"; // <!-- TÍTULO DA MÚSICA -->
const AUDIO_ARTIST = "Para sempre nós"; // <!-- ARTISTA / DEDICATÓRIA -->

function Index() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      void a.play().catch(() => setIsPlaying(false));
    } else {
      a.pause();
    }
  };

  return (
    <main className="min-h-screen bg-romance-bg text-romance-ink">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-romance-glow opacity-70" />
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-romance-rose/40 bg-white/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-romance-rose backdrop-blur">
          <Heart className="h-3.5 w-3.5 fill-current" /> Feito com amor
        </div>

        {/* PLAYER DE ÁUDIO — clique para tocar/pausar */}
        <div className="mx-auto mt-8 flex max-w-sm items-center gap-4 rounded-2xl border border-romance-rose/30 bg-white/70 p-3 pr-5 shadow-[0_10px_30px_-12px_rgba(190,90,110,0.35)] backdrop-blur">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar música" : "Tocar música"}
            aria-pressed={isPlaying}
            className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-romance-rose text-white shadow-md transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 fill-current" />
            ) : (
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            )}
            {isPlaying && (
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-romance-rose/40" />
            )}
          </button>
          <div className="flex flex-1 flex-col items-start text-left">
            <span className="font-display text-base leading-tight text-romance-ink">
              {AUDIO_TITLE}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-romance-rose/80">
              {AUDIO_ARTIST}
            </span>
            {/* barrinhas animadas decorativas */}
            <div className="mt-2 flex h-3 items-end gap-[3px]">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-romance-rose/70"
                  style={{
                    height: isPlaying ? `${30 + ((i * 37) % 70)}%` : "20%",
                    animation: isPlaying
                      ? `audioBar 0.9s ease-in-out ${i * 0.08}s infinite alternate`
                      : "none",
                  }}
                />
              ))}
            </div>
          </div>
          {/* <!-- INSIRA SUA MÚSICA AQUI (também na constante AUDIO_SRC no topo do arquivo) --> */}
          <audio ref={audioRef} src={AUDIO_SRC} preload="none" loop />
        </div>

        <h1 className="font-display mt-10 text-5xl leading-tight md:text-7xl">
          Nossos momentos, <span className="italic text-romance-rose">para sempre</span>
        </h1>
      </section>


      {/* GALERIA — FLIP CARDS */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {flipCards.map((card, i) => (
            <article
              key={i}
              tabIndex={0}
              className="flip-card group aspect-[3/4] cursor-pointer outline-none"
            >
              <div className="flip-card-inner">
                {/* FRENTE — FOTO */}
                <div className="flip-card-face flip-card-front">
                  {/* <!-- INSIRA SUA FOTO AQUI --> */}
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-romance-ink/40 via-transparent to-transparent" />
                </div>

                {/* VERSO — TEXTO */}
                <div className="flip-card-face flip-card-back">
                  {/* <!-- INSIRA SEU TEXTO DO VERSO AQUI --> */}
                  <h3 className="font-display text-2xl text-romance-rose">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-romance-ink/80">{card.text}</p>
                  <Heart className="mt-5 h-5 w-5 fill-current text-romance-rose" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MOSAICO DE REDES SOCIAIS */}
      <section className="border-t border-romance-rose/15 bg-white/40 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl">Parte da nossa história</h2>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
            {socialPosts.map((post, i) => (
              <a
                key={i}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={post.label}
                className="group relative block aspect-square overflow-hidden rounded-xl bg-romance-rose/10 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={post.image}
                  alt={post.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-romance-rose/0 transition-colors duration-300 group-hover:bg-romance-rose/40">
                  <Heart className="h-6 w-6 fill-current text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="px-6 py-10 text-center text-sm text-romance-ink/60">
        <p className="inline-flex items-center gap-1.5">
          Feito com <Heart className="h-4 w-4 fill-romance-rose text-romance-rose" /> para você
        </p>
      </footer>
    </main>
  );
}
