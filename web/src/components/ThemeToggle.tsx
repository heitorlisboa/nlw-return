import { useLayoutEffect, useState } from 'react';
import { Switch } from '@headlessui/react';

function ThemeToggle() {
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);

  function handleToggleDarkTheme(enabled: boolean) {
    setDarkThemeEnabled(enabled);

    const methodToCall = enabled ? 'add' : 'remove';
    document.documentElement.classList[methodToCall]('dark');
    localStorage.setItem('theme', enabled ? 'dark' : 'light');
  }

  useLayoutEffect(() => {
    const prefersDarkTheme =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    handleToggleDarkTheme(prefersDarkTheme);
  }, []);

  return (
    <Switch.Group>
      <div
        className="
          flex items-center gap-2
          fixed top-4 right-4 sm:top-8 sm-top-8
        "
      >
        <Switch.Label>Ativar tema escuro</Switch.Label>
        <Switch
          checked={darkThemeEnabled}
          onChange={handleToggleDarkTheme}
          className="
            inline-flex items-center
            relative
            h-6 w-11
            rounded-full
            transition-colors
            bg-zinc-200 dark:bg-brand-500
          "
        >
          <span
            className="
              inline-block h-4 w-4
              bg-white
              rounded-full
              transform
              transition-transform
              translate-x-1 dark:translate-x-6
            "
          />
        </Switch>
      </div>
    </Switch.Group>
  );
}

export { ThemeToggle };
