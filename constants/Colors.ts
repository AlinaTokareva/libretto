/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const palette = {
  dark: ['hsla(77, 50%, 35%, 1)', 'hsla(77, 50%, 38%, 1)', 'hsla(77, 50%, 41%, 1)', 'hsla(77, 50%, 43%, 1)', 'hsla(77, 50%, 46%, 1)', 'hsla(77, 50%, 49%, 1)', 'hsla(77, 50%, 52%, 1)', 'hsla(77, 50%, 54%, 1)', 'hsla(77, 50%, 57%, 1)', 'hsla(77, 50%, 60%, 1)', 'hsla(250, 50%, 90%, 1)', 'hsla(250, 50%, 95%, 1)',],
  light: ['hsla(77, 50%, 45%, 1)', 'hsla(77, 50%, 47%, 1)', 'hsla(77, 50%, 49%, 1)', 'hsla(77, 50%, 52%, 1)', 'hsla(77, 50%, 54%, 1)', 'hsla(77, 50%, 56%, 1)', 'hsla(77, 50%, 58%, 1)', 'hsla(77, 50%, 61%, 1)', 'hsla(77, 50%, 63%, 1)', 'hsla(77, 50%, 65%, 1)', 'hsla(250, 50%, 95%, 1)', 'hsla(250, 50%, 95%, 1)',],
}

const tintColorLight = 'hsla(77, 50%, 35%, 1)'
const tintColorDark = '#fff'

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
}
