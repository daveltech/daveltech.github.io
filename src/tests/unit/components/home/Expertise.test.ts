import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Expertise from '@components/home/Expertise.astro';
import { sk } from '@i18n/translations/sk';

test('Expertise renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Expertise);

  expect(result).toContain(sk.homeExpertise.title);
  for (const expertise of sk.homeExpertise.expertises) {
    expect(result).toContain(expertise.name);
  }
});
