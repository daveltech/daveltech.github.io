import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import PricingTable from '@components/pricing/PricingTable.astro';
import { sk } from '@i18n/translations/sk';

test('PricingTable renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(PricingTable);

  for (const pricing of sk.pricingTable.pricings) {
    expect(result).toContain(pricing.description);
    for (const feature of pricing.features) {
      expect(result).toContain(feature);
    }
  }
});
