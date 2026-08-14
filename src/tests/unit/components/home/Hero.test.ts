import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Hero from '@components/home/Hero.astro';
import { sk } from '@i18n/translations/sk';

test('Hero renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Hero);

  expect(result).toContain(sk.homeHero.description);
});
