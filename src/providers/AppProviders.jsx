import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/reactQueryClient";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import ThemeProvider from "./ThemeProvider";
import I18nSync from "@/components/I18nSync";

export default function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <I18nSync>
            {children}
          </I18nSync>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>

  );
}

  // <QueryClientProvider client={queryClient}>
  // </QueryClientProvider>