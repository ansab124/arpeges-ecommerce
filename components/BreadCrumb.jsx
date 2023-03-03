import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Breadcrumb = ({ children }) => {
  return (
    <ul className="breadcrumbs">
      <li className="breadcrumbs-item">
        <span className="breadcrumbs-item-icon">
          <FaHome size={20} />
        </span>
        <span>ACCUEIL</span>
        <MdOutlineKeyboardArrowRight size={20} />
      </li>
      {children}
    </ul>
  );
};

export const BreadcrumbItem = ({
  href,
  children,
  startIcon,
  isLast = false,
}) => {
  return (
    <li className="breadcrumbs-item">
      {startIcon && <span className="breadcrumbs-item-icon">{startIcon}</span>}
      {href ? (
        <Link href={href}>
          <a href={href}>{children}</a>
        </Link>
      ) : (
        <span>{children}</span>
      )}
      {!isLast && <MdOutlineKeyboardArrowRight size={20} />}
    </li>
  );
};

export default Breadcrumb;
