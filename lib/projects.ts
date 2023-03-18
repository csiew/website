import { BadgeVariant } from "../components/ui/Badge";

export const determineStatusBadgeVariant = (status: string): BadgeVariant => {
  switch (status) {
  case "active":
    return "success";
  case "hiatus":
    return "warning";
  case "inactive":
  default:
    return "plain";
  }
};
