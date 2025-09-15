// Header.jsx
import { motion, AnimatePresence } from "framer-motion";
import { SortDesc, MoreHorizontal } from "lucide-react";
import FlyoutMenu from "./FlyOutMenu";
import {
  messageSortOptions,
  channelSortOptions,
  teamSortOptions,
  messageMoreOptions,
  channelMoreOptions,
  teamMoreOptions,
  messageActions,
  channelActions,
  teamActions,
} from "./Constants";

const Header = ({ msg, openMenu, setOpenMenu, fetchMessages }) => {
  const sectionKey = msg.toLowerCase().includes("message")
    ? "messages"
    : msg.toLowerCase().includes("channel")
    ? "channels"
    : "team";

  const sortOptions =
    sectionKey === "messages"
      ? messageSortOptions
      : sectionKey === "channels"
      ? channelSortOptions
      : teamSortOptions;

  const moreOptions =
    sectionKey === "messages"
      ? messageMoreOptions
      : sectionKey === "channels"
      ? channelMoreOptions
      : teamMoreOptions;

  const moreActions =
    sectionKey === "messages"
      ? messageActions
      : sectionKey === "channels"
      ? channelActions
      : teamActions;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-center justify-between px-3 mb-4 relative"
    >
      <h2 className="text-lg font-semibold">{msg}</h2>

      <div className="flex items-center gap-3 text-gray-500 relative">
        {/* Sort */}
        <div className="relative">
          <SortDesc
            onClick={() =>
              setOpenMenu(openMenu === `${sectionKey}-sort` ? null : `${sectionKey}-sort`)
            }
            className="cursor-pointer h-5 w-5 hover:text-black"
          />
          <AnimatePresence>
            {openMenu === `${sectionKey}-sort` && (
              <FlyoutMenu
                options={sortOptions}
                onSelect={(id) => {
                  fetchMessages(id);
                  setOpenMenu(null);
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* More */}
        <div className="relative">
          <MoreHorizontal
            onClick={() =>
              setOpenMenu(openMenu === `${sectionKey}-more` ? null : `${sectionKey}-more`)
            }
            className="cursor-pointer h-5 w-5 hover:text-black"
          />
          <AnimatePresence>
            {openMenu === `${sectionKey}-more` && (
              <FlyoutMenu
                options={moreOptions}
                onSelect={(id) => {
                  if (moreActions[id]) moreActions[id]();
                  setOpenMenu(null);
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
