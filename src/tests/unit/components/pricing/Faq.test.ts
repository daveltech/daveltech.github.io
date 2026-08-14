import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Faq from '@components/pricing/Faq.astro';
import { sk } from '@i18n/translations/sk';

test('Faq renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Faq);

  expect(result).toContain(sk.pricingFaq.title);
  for (const question of sk.pricingFaq.questions) {
    expect(result).toContain(question.title);
  }
});
