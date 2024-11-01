// Edit the settings below to personalize the prompt

type ColorConfig = Record<string, string>
type PromptConfig = Record<string, boolean | string | number>

export const colors: ColorConfig = {
  // Color for user name
  user: 'magentaBright',
  // Color for the @ symbol between username and host
  at: 'cyanBright',
  // Color for host name
  host: 'greenBright',
  // Color for working directory
  path: 'cyanBright',
  // Color for git status when dirty
  gitDirty: 'yellowBright',
  // Color for git status when clean
  gitClean: 'greenBright'
}

export const promptConfig: PromptConfig = {
  // Show or hide the user name
  showUser: false,
  // Show or hide the @ symbol between username and host
  showAt: false,
  // Show or hide the host name
  showHost: false,
  // Show or hide the path
  showPath: true,
  // Show or hide Git status
  showGit: true,
  // Whether a UTF-8 font is available in the terminal
  powerFont: true
  // If present, limits the length of each directory in the directory segment,
  // except for the current directory, which is always displayed in full length.
  //parentDirMaxLen: 1,
  // If present, this string is appended to directories that have been shortened by the
  // parentDirMaxLen option.
  //parentDirEllipsis: '\u2026',
  // if present, limits the number of directory levels to show in the directory segment.
  // This option is used to abbreviate the display of potentially long working directories
  //maxDirs: 4,
  // If present, this string is prepended to the directory segment to indicate that the
  // maxDirs parameter has shortened it.
  //maxDirEllipsis: '...'
}
