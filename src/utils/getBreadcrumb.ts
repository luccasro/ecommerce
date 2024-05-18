import { headerLinks } from "./headerLinks";

export const breadcrumbs = [...headerLinks];
export const getBreadcrumb = (key: string) => {
  return breadcrumbs.find((breadcrumb) => breadcrumb.key === key)?.name;
};
