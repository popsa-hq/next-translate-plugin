import type { NextConfig } from 'next'
import type ts from 'typescript'

export interface LoaderOptions {
  basePath: string
  pagesFolder: string
  appFolder: string
  hasAppJs: boolean
  hasGetInitialPropsOnAppJs: boolean
  extensionsRgx: RegExp
  revalidate: number
  existLocalesFolder: boolean
}

export type Transformer = (
  rootNode: ts.SourceFile,
  context: ts.TransformationContext
) => ts.SourceFile

export interface ParsedFilePkg {
  program: ts.Program
  checker: ts.TypeChecker
  sourceFile: ts.SourceFile
  fileSymbol?: ts.Symbol
  transform: (transformer: Transformer) => void
  getCode: () => string
}

export interface NextConfigWithNextTranslate extends NextConfig {
  nextTranslate?: {
    basePath?: string
  }
}
