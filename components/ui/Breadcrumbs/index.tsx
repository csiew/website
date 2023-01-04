import Link from "next/link";
import React from "react";

type BreadcrumbsProps = {
  items: {
    title: string;
    href?: string;
  }[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <div className="breadcrumbs">
      <ul>
        {
          items.map((i) => {
            return (
              <li key={i.title}>
                {
                  i.href
                    ? <Link href={i.href}>{i.title}</Link>
                    : <span>{i.title}</span>
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Breadcrumbs;
