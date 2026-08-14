import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Companies from '@components/home/Companies.astro';
import { sk } from '@i18n/translations/sk';

test('Companies renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Companies);

  expect(result).toContain(sk.homeCompanies.title);
  for (const company of sk.homeCompanies.companies) {
    expect(result).toContain(company.name);
  }
});
