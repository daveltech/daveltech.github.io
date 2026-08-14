import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Heading from '@components/about/Heading.astro';
import { sk } from '@i18n/translations/sk';

test('Heading renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Heading);

  expect(result).toContain(sk.aboutHeading.title);
  expect(result).toContain(sk.aboutHeading.description);
});
