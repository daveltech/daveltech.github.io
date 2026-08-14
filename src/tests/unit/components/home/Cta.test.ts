import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Cta from '@components/home/Cta.astro';
import { sk } from '@i18n/translations/sk';

test('Cta renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Cta);

  expect(result).toContain(sk.homeCta.description);
  expect(result).toContain(sk.homeCta.contact);
  expect(result).toContain(sk.homeCta.pricing);
});
