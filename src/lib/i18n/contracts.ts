export type SupportedLocale = "en" | "sv";

export type TranslationDomain =
  | "common"
  | "product"
  | "checkout"
  | "legal"
  | "assistant";

export type TranslationEntry = {
  key: string;
  value: string;
  reviewed: boolean;
  domain: TranslationDomain;
};

export type TranslationDraftTask = {
  sourceLocale: SupportedLocale;
  targetLocale: SupportedLocale;
  domain: TranslationDomain;
  entries: TranslationEntry[];
};
