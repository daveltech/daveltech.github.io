import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Footer from '@components/layout/Footer.astro';
import { sk } from '@i18n/translations/sk';

test('Footer renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Footer);

  expect(result).toContain(sk.layoutFooter.company);
  expect(result).toContain(sk.layoutFooter.services);
  expect(result).toContain(sk.layoutFooter.regulatory);

  expect(result).toContain(sk.layoutFooter.links.home);
  expect(result).toContain(sk.layoutFooter.links.about);
  expect(result).toContain(sk.layoutFooter.links.pricing);
  expect(result).toContain(sk.layoutFooter.links.contact);
  expect(result).toContain(sk.layoutFooter.links.legal);
  expect(result).toContain(sk.layoutFooter.companyName);
  expect(result).toContain(sk.layoutFooter.copyright);
});
