import Lesson from "../Lesson/Lesson";
import Courses from "../Course/Courses";
import Unterrichtsprotokoll from "../PDFs/Unterrichtsprotokoll";
import Anwesenheitsliste from "../PDFs/Anwesenheitsliste";
import FahrtkostenExcel from "../PDFs/FahrtkostenExcel/FahrtkostenExcel";
import Admin from "../Admin/Admin";
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
  {
    name: "Anwesenheitsliste",
    component: Anwesenheitsliste,
    icon: AccountsIcon,
    path: "/anwesenheitsliste",
  },
  {
    name: "FahrtkostenExcel",
    component: FahrtkostenExcel,
    icon: AccountsIcon,
    path: "/fahrtkostenexcel",
  },
  {
    name: "Admin",
    component: Admin,
    icon: AccountsIcon,
    path: "/admin",
  },
];
