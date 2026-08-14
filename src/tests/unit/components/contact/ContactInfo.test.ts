import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import ContactInfo from '@components/contact/ContactInfo.astro';
import { sk } from '@i18n/translations/sk';

test('ContactInfo renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(ContactInfo);

  expect(result).toContain(sk.contactInfo.whatsapp);
  expect(result).toContain(sk.contactInfo.telegram);
  expect(result).toContain(sk.contactInfo.messenger);
  expect(result).toContain(sk.contactInfo.whatsappUrl);
  expect(result).toContain(sk.contactInfo.telegramUrl);
  expect(result).toContain(sk.contactInfo.messengerUrl);
});
