import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import About from '@components/home/About.astro';
import { sk } from '@i18n/translations/sk';

test('About renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(About);

  expect(result).toContain(sk.homeAbout.title);
  expect(result).toContain(sk.homeAbout.description);
  expect(result).toContain(sk.homeAbout.cta);
});
