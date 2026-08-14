import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Team from '@components/about/Team.astro';
import { sk } from '@i18n/translations/sk';

test('Team renders correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Team);

  expect(result).toContain(sk.aboutTeam.title);
  for (const member of sk.aboutTeam.members) {
    expect(result).toContain(member.name);
    expect(result).toContain(member.job);
  }
});
