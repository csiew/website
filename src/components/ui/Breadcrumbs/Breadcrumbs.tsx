import React from "react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import styles from "./Breadcrumbs.module.css";

type BreadcrumbsProps = {
  items: {
    title: string;
    href?: string;
  }[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <div className={styles.breadcrumbs}>
      {
        (items.length > 1) && (
          <Link
            href={items[items.length - 2].href ?? "/"}
            className={styles.breadcrumbsBackBtn}
          >
            <MdArrowBack />
          </Link>
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
