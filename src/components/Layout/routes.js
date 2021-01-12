import Lesson from "../Lesson/Lesson";
import Courses from "../Course/Courses";
import Unterrichtsprotokoll from "../PDFs/Unterrichtsprotokoll";
import AccountsIcon from "@material-ui/icons/Cloud";

export const routes = [
  { name: "Lessons", component: Lesson, icon: AccountsIcon, path: "/" },
  { name: "Courses", component: Courses, icon: AccountsIcon, path: "/courses" },
  {
    name: "Unterrichtsprotokoll",
    component: Unterrichtsprotokoll,
    icon: AccountsIcon,
    path: "/unterrichtsprotokoll",
  },
];
