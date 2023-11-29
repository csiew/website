import Link from "next/link";
import React from "react";
import Button from "../Button";
import { MdArrowBack } from "react-icons/md";

type BreadcrumbsProps = {
  items: {
    title: string;
    href?: string;
  }[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <div className="breadcrumbs">
      {
        (items.length > 1) && (
          <Button
            iconOnly
            className="breadcrumbs-back-btn"
            variant="link"
            url={items[items.length - 2].href}
          >
            <MdArrowBack />
          </Button>
        )
      }
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
