import localFont from "next/font/local";

export const domaineDisplayNarrow = localFont({
  variable: "--font-domaine-display-narrow",
  display: "swap",
  src: [
    {
      path: "../../../public/fonts/domaine-display-narrow-webfont/DomaineDispNar-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/domaine-display-narrow-webfont/DomaineDispNar-RegularItalic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/domaine-display-narrow-webfont/DomaineDispNar-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/domaine-display-narrow-webfont/DomaineDispNar-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../public/fonts/domaine-display-narrow-webfont/DomaineDispNar-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/domaine-display-narrow-webfont/DomaineDispNar-SemiboldItalic.woff",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../../public/fonts/domaine-display-narrow-webfont/DomaineDispNar-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/domaine-display-narrow-webfont/DomaineDispNar-BoldItalic.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/fonts/domaine-display-narrow-webfont/DomaineDispNar-Extrabold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/fonts/domaine-display-narrow-webfont/DomaineDispNar-ExtraboldItalic.woff",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../../public/fonts/domaine-display-narrow-webfont/DomaineDispNar-Black.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/domaine-display-narrow-webfont/DomaineDispNar-BlackItalic.woff",
      weight: "900",
      style: "italic",
    },
  ],
});
