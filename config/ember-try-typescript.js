module.exports = {
  useYarn: true,
  command: 'tsc --noEmit',
  scenarios: [
    {
      name: 'ts-3.7',
      npm: {
        typescript: '~3.7',
      },
    },
    {
      name: 'ts-3.8',
      npm: {
        typescript: '~3.8',
      },
    },
    {
      name: 'ts-3.9',
      npm: {
        typescript: '~3.9',
      },
    },
    {
      name: 'ts-4.0',
      npm: {
        typescript: '~4.0',
      },
    },
    {
      name: 'ts-4.1',
      npm: {
        typescript: '~4.1',
      },
    },
    {
      name: 'ts-4.2',
      npm: {
        typescript: '~4.2',
      },
    },
    {
      name: 'ts-4.3',
      npm: {
        typescript: '~4.3',
      },
    },
    {
      name: 'ts-4.4',
      npm: {
        typescript: '~4.4',
      },
    },
    {
      name: 'ts-next',
      npm: {
        devDependencies: {
          typescript: 'next',
        },
      },
    },
  ],
};
