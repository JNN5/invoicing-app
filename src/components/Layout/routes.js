import Lesson from "../Lesson/Lesson";
import Courses from "../Course/Courses";
import AccountsIcon from "@material-ui/icons/Cloud";

export const routes = [
  { name: "Courses", component: Courses, icon: AccountsIcon, path: "/courses" },
  { name: "Lessons", component: Lesson, icon: AccountsIcon, path: "/" },
];
