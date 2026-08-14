import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Header from '@components/layout/Header.astro';
import { sk } from '@i18n/translations/sk';

test('Header renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Header);

  expect(result).toContain(sk.layoutHeader.home);
  expect(result).toContain(sk.layoutHeader.about);
  expect(result).toContain(sk.layoutHeader.pricing);
  expect(result).toContain(sk.layoutHeader.contact);
});
