type ColorConfig = Record<string, string>
type PromptConfig = Record<string, boolean | string | number>

export const colors: ColorConfig = {
  user: 'magentaBright',
  at: 'cyanBright',
  host: 'greenBright',
  remoteHost: 'redBright',
  path: 'cyanBright',
  gitDirty: 'yellowBright',
  gitClean: 'greenBright'
}

export const promptConfig: PromptConfig = {
  showUser: true,
  showAt: true,
  showHost: true,
  showPath: true,
  showGit: true,
  powerFont: true
  //parentDirMaxLen: 1,
  //parentDirEllipsis: '\u2026',
  //maxDirs: 4,
  //maxDirEllipsis: '...'
}
