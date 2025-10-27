import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doğrulanmış Uluslararası Alıcıları Bulun | ITAI İhracat Asistanı",
  description: "ITAI doğrulanmış uluslararası alıcıları ve karar verici iletişim bilgilerini bulur, böylece üreticiler toplantıları daha hızlı ayarlar ve ihracat anlaşmaları kazanır.",
  icons: {
    icon: "/logo.png",
  },
  alternates: {
    canonical: 'https://www.internationaltradeai.com/tr'
  },
  openGraph: {
    title: "Doğrulanmış Uluslararası Alıcıları Bulun | ITAI İhracat Asistanı",
    description: "ITAI doğrulanmış uluslararası alıcıları ve karar verici iletişim bilgilerini bulur, böylece üreticiler toplantıları daha hızlı ayarlar ve ihracat anlaşmaları kazanır.",
    type: "website",
    url: "/tr",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Doğrulanmış Uluslararası Alıcıları Bulun | ITAI İhracat Asistanı",
    description: "ITAI doğrulanmış uluslararası alıcıları ve karar verici iletişim bilgilerini bulur, böylece üreticiler toplantıları daha hızlı ayarlar ve ihracat anlaşmaları kazanır.",
  }
};

export default function TurkishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
