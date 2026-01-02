import { useI18n } from "@/hooks/useI18n";

/**
 * Component to sync i18n with Redux language state
 * This should be rendered inside Redux Provider
 */
export default function I18nSync({ children }) {
  useI18n(); // Sync i18n with Redux
  return children;
}

