import { BadgeVariant } from "../components/ui/Badge/Badge";

export const determineStatusBadgeVariant = (status: string): BadgeVariant => {
  switch (status) {
  case "active":
    return "success";
  case "hiatus":
    return "warning";
  case "inactive":
    return "error";
  default:
    return "plain";
  }
};
