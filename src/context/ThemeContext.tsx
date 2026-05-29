import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: (e?: any) => void
}

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined)

const STORAGE_KEY = 'theme'

export function ThemeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [theme, setThemeState] =
    useState<Theme>('system')

  const [resolvedTheme, setResolvedTheme] =
    useState<'light' | 'dark'>('light')

  // =========================
  // GET SYSTEM THEME
  // =========================

  const getSystemTheme = (): 'light' | 'dark' => {
    if (
      window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
    ) {
      return 'dark'
    }

    return 'light'
  }

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    const storedTheme =
      localStorage.getItem(
        STORAGE_KEY
      ) as Theme | null

    if (
      storedTheme === 'light' ||
      storedTheme === 'dark' ||
      storedTheme === 'system'
    ) {
      setThemeState(storedTheme)
    } else {
      setThemeState('system')
    }
  }, [])

  // =========================
  // APPLY THEME
  // =========================

  // =========================
  // APPLY THEME
  // =========================

  useEffect(() => {
    const root = document.documentElement

    const systemTheme = getSystemTheme()

    const activeTheme =
      theme === 'system'
        ? systemTheme
        : theme

    setResolvedTheme(activeTheme)

    root.classList.remove(
      'light',
      'dark'
    )

    root.classList.add(activeTheme)

    root.style.colorScheme =
      activeTheme
  }, [theme])

  // =========================
  // SYSTEM THEME LISTENER
  // =========================

  useEffect(() => {
    const media =
      window.matchMedia(
        '(prefers-color-scheme: dark)'
      )

    const listener = () => {
      if (theme === 'system') {
        const systemTheme =
          getSystemTheme()

        setResolvedTheme(systemTheme)

        document.documentElement.classList.remove(
          'light',
          'dark'
        )

        document.documentElement.classList.add(
          systemTheme
        )

        document.documentElement.style.colorScheme =
          systemTheme
      }
    }

    media.addEventListener(
      'change',
      listener
    )

    return () => {
      media.removeEventListener(
        'change',
        listener
      )
    }
  }, [theme])

  // =========================
  // SET THEME
  // =========================

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(
      STORAGE_KEY,
      newTheme
    )

    setThemeState(newTheme)
  }

  // =========================
  // TOGGLE
  // =========================

  const toggleTheme = async (e?: any) => {
    const nextTheme =
      resolvedTheme === 'dark'
        ? 'light'
        : 'dark'

    // Update dynamic CSS coordinates for circular reveal
    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      document.documentElement.style.setProperty('--x', `${x}px`)
      document.documentElement.style.setProperty('--y', `${y}px`)
    } else {
      // Fallback to top right area
      document.documentElement.style.setProperty('--x', '92%')
      document.documentElement.style.setProperty('--y', '32px')
    }

    // Modern smooth transition
    if (
      'startViewTransition' in document
    ) {
      // @ts-ignore
      document.startViewTransition(() => {
        setTheme(nextTheme)
      })
    } else {
      setTheme(nextTheme)
    }
  }

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme]
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context =
    useContext(ThemeContext)

  if (!context) {
    throw new Error(
      'useTheme must be used within ThemeProvider'
    )
  }

  return context
}