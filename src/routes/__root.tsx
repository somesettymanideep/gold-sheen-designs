import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Durga Hardware and Plywood — Premium Plywood, Laminates & Kitchens, Vijayawada" },
      {
        name: "description",
        content:
          "Vijayawada's premium destination for plywood, laminates, veneers, modular kitchens, hardware accessories & profile doors. Trusted brands. Expert guidance.",
      },
      { name: "author", content: "Durga Hardware and Plywood" },
      { property: "og:title", content: "Durga Hardware and Plywood — Premium Plywood, Laminates & Kitchens, Vijayawada" },
      {
        property: "og:description",
        content:
          "Premium plywood, laminates, veneers, modular kitchens, hardware & profile doors. Trusted brands under one roof.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Durga Hardware and Plywood" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Durga Hardware and Plywood — Premium Plywood, Laminates & Kitchens, Vijayawada" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/14330d4c-586b-4ba2-8caf-59a3dbe700a0/id-preview-1fa098b5--7726ac25-862a-4e71-b16a-1b3788e17f02.lovable.app-1781848545532.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/14330d4c-586b-4ba2-8caf-59a3dbe700a0/id-preview-1fa098b5--7726ac25-862a-4e71-b16a-1b3788e17f02.lovable.app-1781848545532.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://gold-sheen-designs.lovable.app/#organization",
          name: "Durga Hardware and Plywood",
          url: "https://gold-sheen-designs.lovable.app",
          logo: {
            "@type": "ImageObject",
            url: "https://gold-sheen-designs.lovable.app/__l5e/assets-v1/26ca5f6e-1042-4ccb-9e71-475099d84969/durga-logo.png",
          },
          image:
            "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/14330d4c-586b-4ba2-8caf-59a3dbe700a0/id-preview-1fa098b5--7726ac25-862a-4e71-b16a-1b3788e17f02.lovable.app-1781848545532.png",
          description:
            "Vijayawada's premium destination for plywood, laminates, veneers, modular kitchens, hardware accessories and profile doors from trusted brands.",
          telephone: "+91-7842591100",
          email: "durgahardwareandkitchen@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "27/37/11 M.G. Road, Gopala Reddy Rd, Opposite Manorama Hotel, Governor Peta",
            addressLocality: "Vijayawada",
            addressRegion: "Andhra Pradesh",
            postalCode: "520002",
            addressCountry: "IN",
          },
          sameAs: [
            "https://www.instagram.com/durga_hardware_plywood/reels/",
            "https://www.facebook.com/profile.php?id=61576566413635",
            "https://www.youtube.com/@DurgaHardwareandPlywood",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://gold-sheen-designs.lovable.app/#website",
          name: "Durga Hardware and Plywood",
          url: "https://gold-sheen-designs.lovable.app",
          publisher: { "@id": "https://gold-sheen-designs.lovable.app/#organization" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HardwareStore",
          "@id": "https://gold-sheen-designs.lovable.app/#business",
          name: "Durga Hardware and Plywood",
          description:
            "Best hardware and plywood shop in Vijayawada — premium plywood, laminates, veneers, modular kitchens, hardware accessories and profile doors from trusted brands.",
          url: "https://gold-sheen-designs.lovable.app",
          parentOrganization: { "@id": "https://gold-sheen-designs.lovable.app/#organization" },
          telephone: "+91-7842591100",
          email: "durgahardwareandkitchen@gmail.com",
          image:
            "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/14330d4c-586b-4ba2-8caf-59a3dbe700a0/id-preview-1fa098b5--7726ac25-862a-4e71-b16a-1b3788e17f02.lovable.app-1781848545532.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "27/37/11 M.G. Road, Gopala Reddy Rd, Opposite Manorama Hotel, Governor Peta",
            addressLocality: "Vijayawada",
            addressRegion: "Andhra Pradesh",
            postalCode: "520002",
            addressCountry: "IN",
          },
          geo: { "@type": "GeoCoordinates", latitude: 16.511569, longitude: 80.618147 },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "09:30",
              closes: "21:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: "Sunday",
              opens: "10:00",
              closes: "18:00",
            },
          ],
          priceRange: "₹₹",
          areaServed: "Vijayawada",
          sameAs: [
            "https://www.instagram.com/durga_hardware_plywood/reels/",
            "https://www.facebook.com/profile.php?id=61576566413635",
            "https://www.youtube.com/@DurgaHardwareandPlywood",
          ],
        }),
      },
    ],

    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/__l5e/assets-v1/26ca5f6e-1042-4ccb-9e71-475099d84969/durga-logo.png" },
      { rel: "apple-touch-icon", href: "/__l5e/assets-v1/26ca5f6e-1042-4ccb-9e71-475099d84969/durga-logo.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
