import { Popover } from '@headlessui/react';
import { X } from 'phosphor-react';

export function CloseButton() {
  return (
    <Popover.Button
      className="
        absolute top-4 right-4
        p-1
        text-zinc-500 hover:text-zinc-800
        dark:text-zinc-400 dark:hover:text-zinc-100
        transition-colors
      "
      aria-label="Fechar formulário de feedback"
    >
      <X className="w-4 h-4" weight="bold" />
    </Popover.Button>
  );
}
