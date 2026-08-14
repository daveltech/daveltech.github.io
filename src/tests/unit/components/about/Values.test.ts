import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Values from '@components/about/Values.astro';
import { sk } from '@i18n/translations/sk';

test('Values renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Values);

  expect(result).toContain(sk.aboutValues.title);
  for (const column of sk.aboutValues.values) {
    for (const value of column) {
      expect(result).toContain(value.name);
    }
  }
});
