import { screen, render } from "@testing-library/react"; // (or /dom, /vue, ...)import { renderHook, act } from "@testing-library/react-hooks";
import { DataProvider } from "../../api/DataContext";
import Admin from "./Admin";

test("should render", () => {
  const wrapper = ({ children }) => (
    <DataProvider storageKey="courses">{children}</DataProvider>
  );
  render(<Admin />, { wrapper });
  screen.getByText(/^backup/i);
  screen.getByText(/restore/i);
});
