import { defineConfig, fontProviders } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import compress from '@playform/compress';
import tailwindcss from '@tailwindcss/vite';
import { defaultLocale, locales, prefixDefaultLocale } from '@i18n/utils';

// https://astro.build/config
export default defineConfig({
  site: 'https://daveltech.github.io',
  base: '/',

  fonts: [
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.fontsource(),
      weights: [400, 500, 700],
      styles: ['normal'],
    },
  ],

  i18n: {
    defaultLocale,
    locales,
    routing: {
      prefixDefaultLocale,
    },
  },

  image: {
    responsiveStyles: false,
  },

  integrations: [
    alpinejs({
      entrypoint: '/src/scripts/entrypoint',
    }),
    sitemap({
      i18n: {
        defaultLocale,
        locales: Object.fromEntries(locales.map((locale) => [locale, locale])),
      },
      filter: (page) => !page.includes('/404'),
    }),
    compress({
      CSS: false,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: false,
      JSON: false,
      SVG: true,
    }),
  ],

  security: {
    csp: {
      scriptDirective: {
        resources: ["'self'"],
        hashes: [
          'sha256-QdsQr8DYqqAbXiHb2YTZ0RKtdorAfl82xF9ul9WqSOE=', // All pages
          'sha256-C59c8HcKZIibc5cbv5pL4CZMNfRqD8kiMvSm1W7ESnA=', // index
        ],
      },
      styleDirective: {
        resources: ["'self'"],
        hashes: [
          'sha256-sXN0/vchusiwcIhpMvppSCPHBnjUxI+M2IqthXNpDUQ=', // All pages
        ],
      },
      directives: [
        "default-src 'self'",
        "img-src 'self'",
        "font-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "connect-src 'self'",
        "frame-src 'none'",
        'upgrade-insecure-requests',
      ],
    },
  },

  markdown: {
    syntaxHighlight: 'prism',
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        alpinejs: '@alpinejs/csp',
      },
    },
  },
});
