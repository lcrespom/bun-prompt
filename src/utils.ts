type AnyObject = Record<string, any>

/**
 * Returns the input string with its first character in uppercase
 * @param {string} str The input string
 * @returns the converted string
 */
export function ucfirst(str: string) {
  if (str == '') return str
  return str.charAt(0).toUpperCase() + str.substr(1)
}

/**
 * Returns true if s1 starts with s2 in a case insensitive way.
 * @param {string} s1 The full string to be checked
 * @param {string} s2 The starting string
 */
export function startsWithCaseInsensitive(s1: string, s2: string) {
  return s1.toLocaleLowerCase().startsWith(s2.toLocaleLowerCase())
}

/**
 * Counts the number of common characters at the start of two strings
 * @param {string} str1
 * @param {string} str2
 */
export function commonInitialChars(str1: string, str2: string) {
  let len = Math.min(str1.length, str2.length)
  let i
  for (i = 0; i < len; i++) {
    if (str1[i] !== str2[i]) break
  }
  return i
}

/**
 * Removes the last n chars of a string
 * @param {string} str the input string
 * @param {number} numch amount of chars to remove from end
 */
export function cutLastChars(str: string, numch: number) {
  return str.substr(0, str.length - numch)
}

/**
 * Creates a cache for the results of a given function
 * @param {Function} func the function to memoize
 * @returns a new function that gets values from the cache when available
 */
export function memoize(func: Function) {
  let cache: Record<string, Function> = {}
  return function () {
    let key = JSON.stringify(arguments)
    if (cache[key] !== undefined) {
      return cache[key]
    } else {
      let val = func.apply(null, arguments)
      cache[key] = val
      return val
    }
  }
}

/**
 * Removes repeated items from an array
 * @param {Array} arr the input array
 */
export function removeRepeatedItems(arr: Array<any>) {
  return Array.from(new Set(arr))
}

/**
 * Extracts a nested property from an object
 * @param {object} obj the object to extract the property from
 * @param {string} name the property name, which may contain '.' to
 * 	express multiple levels of property nesting, just like the standard
 *  JS object notation.
 * @returns the property value, or undefined if the property is not present.
 */
export function getProp(obj: AnyObject, name: string): any {
  let names = name.split('.')
  for (let n of names) {
    obj = obj[n]
    if (obj === undefined) return obj
  }
  return obj
}

/**
 * Sets the value to a nested property of an object.
 * @param {object} obj the object to update
 * @param {string} name the property name, which may contain '.' to
 * 	express multiple levels of property nesting, just like the standard
 *  JS object notation. If a property at any level does not exist, it is
 *  created.
 * @param {any} value the value to set
 */
export function setProp(obj: AnyObject, name: string, value: any) {
  let names = name.split('.')
  let pname = names.pop()
  for (let n of names) {
    if (obj[n] === undefined) obj[n] = {}
    obj = obj[n]
  }
  obj[pname!] = value
}

/**
 * Returns an object where property names become values and vice-versa.
 * For example:
 *   reverseObject({ foo: 'bar', x: 3 }) returns { bar: 'foo', '3': x }
 * @param {object} obj The target object
 * @returns the reversed object
 */
export function reverseObject(obj: AnyObject) {
  return Object.keys(obj).reduce((a, k) => ((a[obj[k]] = k), a), {} as AnyObject)
}
