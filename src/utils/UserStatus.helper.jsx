import { UserStatus } from "@/enums/UserStatus";
import { CheckCircle, HourglassEmpty, Cancel } from "@mui/icons-material";

export const USER_STATUS_MAP = {
  [UserStatus.approved]: {
    label: "Approved",
    color: "success",
    icon: <CheckCircle fontSize="small" />,
  },
  [UserStatus.pending]: {
    label: "Pending",
    color: "warning",
    icon: <HourglassEmpty fontSize="small" />,
  },
  [UserStatus.rejected]: {
    label: "Rejected",
    color: "error",
    icon: <Cancel fontSize="small" />,
  },
};
