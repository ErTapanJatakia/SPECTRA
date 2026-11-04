import type { NavigationItem } from "../types";

export const navigationItems: NavigationItem[] = [
  { label:"Overview", path:"/", icon:"home", group:"workspace" },
  { label:"Equipment catalogue", path:"/catalogue", icon:"layers", group:"workspace" },
  { label:"Countries & forces", path:"/countries", icon:"globe", group:"workspace" },
  { label:"3D Studio", path:"/studio-3d", icon:"box", group:"workspace" },
  { label:"Learning Academy", path:"/academy", icon:"graduation", group:"learning" },
  { label:"UN Peacekeeping", path:"/peacekeeping", icon:"shield", group:"learning" },
  { label:"Research library", path:"/research", icon:"book", group:"resources" },
  { label:"Settings", path:"/settings", icon:"settings", group:"resources" }
];

export const navigationGroups = [
  { id:"workspace", label:"Knowledge workspace" },
  { id:"learning", label:"Learning & readiness" },
  { id:"resources", label:"Resources" }
] as const;
