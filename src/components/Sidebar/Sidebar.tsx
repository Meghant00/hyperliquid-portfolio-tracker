import { Link, useLocation } from "react-router";

const Sidebar = () => {
  const location = useLocation();

  const sidebarItems = [
    { iconClass: "bxf bx-dashboard", title: "Dashboard", path: "/" },
    {
      iconClass: "bxf bx-pie-chart-alt-2",
      title: "Trade Distribution",
      path: "/trade-distribution",
    },
  ];

  const activeItemClass = "tw:bg-primary-light tw:text-turquoise-100 ";

  return (
    <aside className="tw:w-full tw:bg-black-200 tw:h-[calc(100dvh-56px)] tw:py-4 tw:px-3 tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-4 tw:sticky tw:left-0 tw:xl:w-70 tw:xl:border-r tw:xl:border-r-hyperliquid-gray-100">
      {sidebarItems.map((sidebarItem) => {
        return (
          <Link
            to={sidebarItem.path}
            className={`tw:flex tw:flex-row tw:items-center tw:justify-start tw:gap-2 tw:rounded-lg tw:w-full tw:h-10 tw:px-4 tw:transition-all tw:duration-150 tw:ease-linear tw:hover:bg-primary-light tw:hover:text-turquoise-100 ${location.pathname === sidebarItem.path && activeItemClass}`}
            key={sidebarItem.title}
          >
            <i className={`${sidebarItem.iconClass} tw:text-lg`}></i>
            <span className="tw:text-sm tw:font-medium">
              {sidebarItem.title}
            </span>
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;
