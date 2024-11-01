import { gitStatus, gitStatusFlags } from './git-status'
import { PromptInput, setPrompt } from '../../prompt'
import { colorize } from './colors'
import { ucfirst } from './utils'

let colors: Record<string, string>
let promptConfig: Record<string, boolean | string | number>
const GIT_SYMBOL = '\ue0a0'

async function gitSection(isRemote: boolean) {
  let gstatus = await gitStatus(isRemote)
  if (!gstatus) return ''
  let flags = gitStatusFlags(gstatus, { unicode: promptConfig.powerFont as boolean })
  if (flags) flags = ' ' + flags
  let gitColor = gstatus.dirty ? colors.gitDirty : colors.gitClean
  let gitSymbol = promptConfig.powerFont ? GIT_SYMBOL + ' ' : ''
  let status = ' (' + gitSymbol + gstatus.branch + flags + ') '
  return colorize(gitColor, status)
}

function cutDirName(dirName: string, maxLength: number, ellipsis: string) {
  let suffixLen = ellipsis ? ellipsis.length : 0
  if (dirName.length <= maxLength + suffixLen) return dirName
  dirName = dirName.substring(0, maxLength)
  if (ellipsis) dirName += ellipsis
  return dirName
}

function makePath(cwd: string) {
  let dirs = cwd.split('/')
  let leafDir = dirs[dirs.length - 1]
  let maxLen = promptConfig.parentDirMaxLen as number
  let ellipsis = promptConfig.parentDirEllipsis as string
  if (maxLen) {
    dirs = dirs.map(d => (d == leafDir ? d : cutDirName(d, maxLen, ellipsis)))
  }
  let maxDirs = promptConfig.maxDirs as number
  let prefix = promptConfig.maxDirEllipsis as string
  if (maxDirs && maxDirs < dirs.length) {
    dirs = dirs.slice(dirs.length - maxDirs, dirs.length)
    if (prefix) dirs = [prefix, ...dirs]
  }
  return dirs.join('/')
}

function segment(name: string, value: string) {
  if (!promptConfig['show' + ucfirst(name)]) return ''
  return colorize(colors[name], value)
}

async function prompt({ cwd, username, hostname, isRemote }: PromptInput) {
  let userAtHost = segment('user', username) + segment('at', '@')
  if (promptConfig.showHost) {
    let hostCol = isRemote ? colors.remoteHost : colors.host
    userAtHost += colorize(hostCol, hostname)
  }
  let path = ''
  if (promptConfig.showPath) path = colorize(colors.path, makePath(cwd))
  let git = '> '
  if (promptConfig.showGit) git = (await gitSection(!!isRemote)) || '> '
  return userAtHost + ' ' + path + git
}

function setDefaults() {
  colors = {
    user: 'magentaBright',
    at: 'cyanBright',
    host: 'greenBright',
    remoteHost: 'redBright',
    path: 'cyan',
    gitDirty: 'yellow',
    gitClean: 'green'
  }
  promptConfig = {
    showUser: true,
    showAt: true,
    showHost: true,
    showPath: true,
    showGit: true,
    powerFont: false
    //parentDirMaxLen: 1,
    //parentDirEllipsis: '\u2026',
    //maxDirs: 4,
    //maxDirEllipsis: '...'
  }
}

function main() {
  setDefaults()
  setPrompt(prompt)
}

main()