import { Popover } from '@headlessui/react';
import { ChatTeardropDots } from 'phosphor-react';

function Widget() {
  return (
    <Popover className="fixed bottom-5 right-5">
      <Popover.Panel>Popover</Popover.Panel>

      <Popover.Button className="bg-brand-500 hover:bg-brand-400 rounded-full p-3 text-white flex group">
        <ChatTeardropDots className="w-6 h-6" />

        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
          <span className="ml-2"></span>
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  );
}

export { Widget };
