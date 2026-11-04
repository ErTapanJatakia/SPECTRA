import domainTaxonomy from "../../content/taxonomy/domains.json";
import type { KnowledgeDomain } from "../types";

const presentation: Record<string, Omit<KnowledgeDomain, "id" | "slug" | "title">> = {
  "domain-infantry": {
    number:"01", shortTitle:"Infantry & Small Arms",
    description:"Identification, historical context, publicly documented general characteristics, protective equipment and safety awareness.",
    scope:["Equipment identification","Historical development","Protective equipment","General technical literacy"], icon:"crosshair", status:"planned"
  },
  "domain-land": {
    number:"02", shortTitle:"Land Systems",
    description:"Armoured vehicles, artillery classifications, engineering, mobility and logistics systems.",
    scope:["Armoured platforms","Artillery classification","Military engineering","Logistics and mobility"], icon:"land", status:"planned"
  },
  "domain-aerospace": {
    number:"03", shortTitle:"Aerospace & UAVs",
    description:"Aircraft, helicopters, UAVs, drones and other unmanned platforms.",
    scope:["Aircraft classifications","Unmanned platforms","Aerospace technology","Platform history"], icon:"plane", status:"planned"
  },
  "domain-surveillance": {
    number:"04", shortTitle:"Surveillance & Intelligence",
    description:"Radar, sensors, reconnaissance technologies, imaging and satellite observation.",
    scope:["Radar and sensors","Imaging systems","Reconnaissance concepts","Satellite observation"], icon:"radar", status:"planned"
  },
  "domain-naval": {
    number:"05", shortTitle:"Naval & Maritime",
    description:"Naval platforms, maritime security, naval aviation and maritime-awareness technologies.",
    scope:["Vessel classifications","Maritime security","Naval aviation","Maritime awareness"], icon:"ship", status:"planned"
  },
  "domain-c4isr": {
    number:"06", shortTitle:"C4ISR & Electronic",
    description:"Command systems, communications, navigation, interoperability and high-level electronic-systems awareness.",
    scope:["Command and control","Communications","Navigation","Interoperability"], icon:"radio", status:"planned"
  },
  "domain-cyber": {
    number:"07", shortTitle:"Cyber & Digital Defence",
    description:"Defensive cybersecurity, military network protection, digital resilience and cyber threat intelligence.",
    scope:["Defensive cybersecurity","Network resilience","Threat intelligence","Information assurance"], icon:"shield", status:"planned"
  },
  "domain-peacekeeping": {
    number:"08", shortTitle:"UN Peacekeeping",
    description:"Supplementary mission familiarisation, protection of civilians, safety and legal and ethical awareness.",
    scope:["Peacekeeping principles","Protection of civilians","Legal and ethical awareness","WAM awareness"], icon:"globe", status:"planned"
  },
  "domain-academy": {
    number:"09", shortTitle:"Learning Academy",
    description:"Structured learning pathways, lessons, knowledge checks and local learner progress.",
    scope:["Learning programmes","Lessons","Knowledge assessments","Progress tracking"], icon:"graduation", status:"planned"
  },
  "domain-research": {
    number:"10", shortTitle:"Research & Technology",
    description:"Historical developments, robotics, autonomy, artificial intelligence and defence technology research.",
    scope:["Technology history","Robotics and autonomy","Artificial intelligence","Research references"], icon:"microscope", status:"planned"
  }
};

export const domains: KnowledgeDomain[] = domainTaxonomy.map((record) => ({
  ...record,
  ...presentation[record.id]
}));

export function getDomainBySlug(slug: string | undefined): KnowledgeDomain | undefined {
  return domains.find((domain) => domain.slug === slug);
}
