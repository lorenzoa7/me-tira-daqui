import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Me Tira Daqui!",
    short_name: "Me Tira Daqui",
    description:
      "Vote anonimamente pra ir embora do rolê. Quando a maioria votar, todo mundo fica sabendo!",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1207",
    theme_color: "#ea580c",
    icons: [
      {
        src: "/api/icon?size=192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/api/icon?size=512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
