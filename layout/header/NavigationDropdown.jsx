import Link from "next/link";
import React from "react";

const NavigationDropdown = ({ menuList }) => {
  console.log({ menuList });
  return (
    <ul className="menu-list ">
      {menuList.map((menu) => {
        return (
          <li key={menu.label} className="menu-list-item">
            {menu.href ? (
              <Link passHref href={menu.href}>
                <a className="text-decoration-none">
                  {menu.icon} {menu.label}
                </a>
              </Link>
            ) : (
              <a className="text-decoration-none">
                {" "}
                {menu.icon} {menu.label}
              </a>
            )}
            {menu.children && (
              <div className="sub_menu">
                {menu.children.map((item, index) => {
                  return (
                    <div key={item.title} className="sub_menu_section">
                      <h4 className="sub_menu_section-heading">{item.title}</h4>
                      <ul className="sub_menu_section_list">
                        {item?.menu?.map((item) => (
                          <li
                            key={item.label}
                            className="sub_menu_section_list-item"
                          >
                            <Link passHref href={item?.href}>
                              <a>{item.label}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationDropdown;
