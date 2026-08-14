import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import ContactForm from '@components/contact/ContactForm.astro';
import { sk } from '@i18n/translations/sk';

test('ContactForm renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(ContactForm);

  expect(result).toContain(sk.contactInfo.companyTitle);
  expect(result).toContain(sk.contactInfo.companyName);
  expect(result).toContain(sk.contactInfo.companyAddress);
  expect(result).toContain(sk.contactInfo.phone);
  expect(result).toContain(sk.contactInfo.email);
});
