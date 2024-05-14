export const getThemeFromMediaQuery = () => {
  // Check if the user prefers dark mode
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export const getLocalStoredTheme = () => {
  // Get the theme from local storage
  const theme = localStorage.getItem('theme');
  // If the theme is dark and in local storage, return it
  if (theme === 'dark') return theme;
  if (theme === 'light') return theme;

  // If the theme is not stored or dark, and the user prefers dark mode, return dark
  return 'system';
}

export const setTheme = (theme: string) => {
  document.documentElement.classList.remove('light', 'dark');

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    return;
  }

  if (theme === 'light') {
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
    return;
  }

  if (theme === 'system') {
    document.documentElement.classList.add(getThemeFromMediaQuery());
    localStorage.setItem('theme', 'system');
    return;
  }
}