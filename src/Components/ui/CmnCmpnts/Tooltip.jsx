import * as Tooltip from "@radix-ui/react-tooltip";

const IconTooltip = ({ children, text }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className=" bg-gray-100 text-gray-900 text-xs rounded-md px-2 py-1 shadow-lg z-[9999]"
            side="top"
            sideOffset={6}
          >
            {text}
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default IconTooltip;
