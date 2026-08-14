import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Services from '@components/home/Services.astro';
import { sk } from '@i18n/translations/sk';

test('Services renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Services);

  expect(result).toContain(sk.homeServices.title);
  for (const service of sk.homeServices.services) {
    expect(result).toContain(service.name);
  }
});
