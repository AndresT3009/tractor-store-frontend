import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          // Fase 3-4: la shell puede depender de todos; los MFEs pueden depender de
          // shared-catalog, ts-design-system y design-tokens pero no entre ellos; shared-catalog y
          // design-tokens no dependen de nada (son la base del grafo).
          depConstraints: [
            {
              sourceTag: 'scope:shell',
              onlyDependOnLibsWithTags: [
                'scope:shell',
                'scope:shared-catalog',
                'scope:ts-design-system',
                'scope:design-tokens',
                'scope:mfe-explore',
                'scope:mfe-decide',
                'scope:mfe-checkout',
              ],
            },
            {
              sourceTag: 'scope:mfe-explore',
              onlyDependOnLibsWithTags: [
                'scope:mfe-explore',
                'scope:shared-catalog',
                'scope:ts-design-system',
                'scope:design-tokens',
              ],
            },
            {
              sourceTag: 'scope:mfe-decide',
              onlyDependOnLibsWithTags: [
                'scope:mfe-decide',
                'scope:shared-catalog',
                'scope:ts-design-system',
                'scope:design-tokens',
              ],
            },
            {
              sourceTag: 'scope:mfe-checkout',
              onlyDependOnLibsWithTags: [
                'scope:mfe-checkout',
                'scope:shared-catalog',
                'scope:ts-design-system',
                'scope:design-tokens',
              ],
            },
            {
              sourceTag: 'scope:ts-design-system',
              onlyDependOnLibsWithTags: [
                'scope:ts-design-system',
                'scope:shared-catalog',
                'scope:design-tokens',
              ],
            },
            {
              sourceTag: 'scope:shared-catalog',
              onlyDependOnLibsWithTags: ['scope:shared-catalog'],
            },
            {
              sourceTag: 'scope:design-tokens',
              onlyDependOnLibsWithTags: ['scope:design-tokens'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
