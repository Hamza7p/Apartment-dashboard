import InsertChartIcon from '@mui/icons-material/InsertChart';
import UsersIcon from '@mui/icons-material/Group';
import ProfileIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const dashboardPages = [
    {
        name: "Dashboard",
        key: "dashboard",
        href: "/",
        icon: <InsertChartIcon />
    },
    {
        name: "Users",
        key: "users",
        href: "/users",
        icon: <UsersIcon />
    },
    {
        name: "Profile",
        key: "profile",
        href: "/profile",
        icon: <ProfileIcon />
    }
]