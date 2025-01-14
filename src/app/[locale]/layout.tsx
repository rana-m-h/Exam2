
import Providers from "@/components/providers";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";



type LocaleLayoutProps = {
  children: React.ReactNode;
} & Pick<BaseParams, "params">;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ params: { locale }, children }: LocaleLayoutProps) {
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`antialiased`}>
 
<Providers>
{children}
</Providers>

      </body>
    </html>
  );
}
