import nextTranslate from '../src/index'
import fs from 'fs'
import path from 'path'

jest.spyOn(fs, 'readdirSync')

jest.mock('../src/utils', () => ({
  ...jest.requireActual('../src/utils'),
  existPages: jest.fn(() => true),
}))

jest.mock(
  '../i18n',
  () => ({
    locales: ['en'],
    defaultLocale: 'en',
    pagesInDir: 'src/app',
    pages: {
      '*': ['common'],
    },
  }),
  { virtual: true }
)

describe('nextTranslate', () => {
  describe('nextTranslate -> pagesInDir', () => {
    test('should detect correctly the appFolder and pagesFolder depending on the pagesInDir', () => {
      fs.readdirSync.mockImplementationOnce(() => [])

      const config = nextTranslate({})

      expect(config.webpack({})).toEqual(
        expect.objectContaining({
          module: {
            rules: expect.arrayContaining([
              expect.objectContaining({
                use: expect.objectContaining({
                  loader: '@popsa-hq/next-translate-plugin/loader',
                  options: expect.objectContaining({
                    appFolder: 'src/app/',
                    pagesFolder: 'src/pages/',
                  }),
                }),
              }),
            ]),
          },
        })
      )
    })
  })
})
