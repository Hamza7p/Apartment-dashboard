import { UserStatus } from "@/enums/UserStatus";
import { CheckCircle, HourglassEmpty, Cancel } from "@mui/icons-material";

export const USER_STATUS_MAP = {
  [UserStatus.approved]: {
    label: "approved",
    color: "success",
    icon: <CheckCircle fontSize="small" />,
  },
  [UserStatus.pending]: {
    label: "pending",
    color: "warning",
    icon: <HourglassEmpty fontSize="small" />,
  },
  [UserStatus.rejected]: {
    label: "rejected",
    color: "error",
    icon: <Cancel fontSize="small" />,
  },
};
