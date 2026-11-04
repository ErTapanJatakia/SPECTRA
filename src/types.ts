export type DomainStatus = "foundation" | "planned";

export interface KnowledgeDomain {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  scope: string[];
  icon: string;
  status: DomainStatus;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  group: "workspace" | "learning" | "resources";
}
