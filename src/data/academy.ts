export type QuizOption = { id: string; text: string };
export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
};
export type Lesson = {
  id: string;
  title: string;
  durationMinutes: number;
  objectives: string[];
  sections: { heading: string; body: string }[];
  questions: QuizQuestion[];
};
export type LearningPathway = {
  id: string;
  title: string;
  level: "Foundation" | "Intermediate";
  estimatedMinutes: number;
  summary: string;
  outcomes: string[];
  lessons: Lesson[];
};

export const learningPathways: LearningPathway[] = [
  {
    id: "responsible-technology-literacy",
    title: "Responsible Defence Technology Literacy",
    level: "Foundation",
    estimatedMinutes: 20,
    summary: "Build a careful, source-aware framework for understanding publicly documented defence technologies without drifting into operational instruction.",
    outcomes: ["Distinguish identification from operational guidance", "Evaluate the provenance and limits of public sources", "Recognise why uncertainty and review dates matter"],
    lessons: [
      {
        id: "technology-literacy-basics",
        title: "Technology literacy and responsible scope",
        durationMinutes: 8,
        objectives: ["Explain the purpose of non-operational technology education", "Identify content that belongs outside a public learning atlas"],
        sections: [
          { heading: "Understand before evaluating", body: "Technology literacy starts with accurate identification, historical context, broad classification and an understanding of institutional roles. A public reference should explain what a system is and how its documented history is understood—not teach someone how to employ it operationally." },
          { heading: "A deliberate boundary", body: "SPECTRA is a supplementary educational resource. It excludes procedural weapon-use instruction, targeting or firing calculations, weapon modification, tactical attack guidance and offensive cyber instructions. Public availability alone does not make material appropriate for publication." },
          { heading: "Context is part of accuracy", body: "A platform's designation, operator, manufacturer, development history and current status are different claims. Keep them separate, cite each carefully and avoid turning a partial source into a universal statement." }
        ],
        questions: [
          { id: "scope-1", prompt: "Which activity best fits a non-operational learning atlas?", options: [{ id:"a", text:"Explaining a platform's historical context and broad classification" }, { id:"b", text:"Providing a firing solution" }, { id:"c", text:"Describing a tactical attack sequence" }], correctOptionId:"a", explanation:"Historical context and broad classification support understanding without providing operational instructions." },
          { id: "scope-2", prompt: "Does public availability alone mean material is suitable for inclusion?", options: [{ id:"a", text:"Yes, if a search engine can find it" }, { id:"b", text:"No; safety, accuracy, rights and educational value still need review" }, { id:"c", text:"Yes, if it is more than five years old" }], correctOptionId:"b", explanation:"Public accessibility does not replace safety, editorial, legal or rights review." }
        ]
      },
      {
        id: "source-provenance",
        title: "Source provenance and confidence",
        durationMinutes: 12,
        objectives: ["Differentiate primary and supporting sources", "Use confidence labels without overstating certainty"],
        sections: [
          { heading: "Match the source to the claim", body: "Official government or intergovernmental publications can be primary evidence for an official designation or policy. Manufacturer documentation may be primary for a product name or published specification, but it is not automatically independent evidence for comparative performance claims." },
          { heading: "Confidence is not a popularity contest", body: "Verified means a specific claim is supported by a suitable primary source. Corroborated means multiple credible sources support it. Estimated identifies an approximation or incomplete documentation. Disputed signals credible conflict. Explain uncertainty rather than hiding it." },
          { heading: "Keep the record reviewable", body: "Record the publisher, title, source type, URL, access date, publication date where known, reuse status and the date the record was last checked. Link to third-party material by default; do not assume that a public page or image is reusable." }
        ],
        questions: [
          { id: "source-1", prompt: "A manufacturer page is used to confirm a product's official model name. How should it be treated?", options: [{ id:"a", text:"As a primary source for that specific product-identification claim" }, { id:"b", text:"As independent proof of every performance comparison" }, { id:"c", text:"As proof of current operator status in every country" }], correctOptionId:"a", explanation:"Source authority is claim-specific. A manufacturer can be primary for its own product designation without independently proving unrelated claims." },
          { id: "source-2", prompt: "Two credible sources materially disagree about a fact. What is the responsible editorial response?", options: [{ id:"a", text:"Choose the more dramatic figure" }, { id:"b", text:"Average the claims and present the result as verified" }, { id:"c", text:"Mark the issue as disputed or omit the claim until resolved" }], correctOptionId:"c", explanation:"Material disagreement should remain visible as uncertainty; do not manufacture precision." }
        ]
      }
    ]
  },
  {
    id: "equipment-records-and-classification",
    title: "Equipment Records & Classification",
    level: "Foundation",
    estimatedMinutes: 15,
    summary: "Learn how to read structured equipment records and distinguish origin, development, manufacture and operation.",
    outcomes: ["Separate origin and development relationships", "Distinguish manufacturers from operators", "Interpret status and verification metadata cautiously"],
    lessons: [
      {
        id: "reading-equipment-records",
        title: "Reading an equipment record",
        durationMinutes: 7,
        objectives: ["Interpret the main identity fields", "Recognise why relationships are stored separately"],
        sections: [
          { heading: "Identity before interpretation", body: "A stable record identifier is not the same as a display name or alias. Designations can change and aliases can vary. Stable identifiers help link records without treating a marketing name as a permanent database key." },
          { heading: "Four relationships, four meanings", body: "Origin country, development country, manufacturer and operator organisation answer different questions. A country associated with design is not necessarily the current operator. A manufacturer is not necessarily the developer. Leave unsupported relationships unassigned rather than inferring them." },
          { heading: "Status changes over time", body: "Public status can be date-sensitive. Acquisition, retirement, export, upgrades and organisational changes can make an older statement stale. Use effective dates and re-check important relationships before publication." }
        ],
        questions: [
          { id: "record-1", prompt: "A country is documented as the origin of a system. What does that establish by itself?", options: [{ id:"a", text:"That every unit is currently operated by that country" }, { id:"b", text:"Only the documented origin relationship—not current worldwide operator status" }, { id:"c", text:"That the country is also the sole manufacturer" }], correctOptionId:"b", explanation:"Origin, development, manufacture and operation are separate relationships." },
          { id: "record-2", prompt: "What should an editor do when no reliable source identifies the current operator?", options: [{ id:"a", text:"Infer the operator from the country of origin" }, { id:"b", text:"Copy an unverified social-media claim" }, { id:"c", text:"Leave the relationship unassigned or mark it unconfirmed" }], correctOptionId:"c", explanation:"Missing evidence is not a reason to guess. An explicit unknown is more accurate than a fabricated relationship." }
        ]
      }
    ]
  },
  {
    id: "peacekeeping-foundations",
    title: "Peacekeeping Foundations",
    level: "Foundation",
    estimatedMinutes: 15,
    summary: "An introductory, non-certifying overview of peacekeeping principles, civilian protection and professional conduct.",
    outcomes: ["Describe the three basic peacekeeping principles", "Recognise the importance of mandate awareness", "Identify professional conduct and civilian protection as core responsibilities"],
    lessons: [
      {
        id: "peacekeeping-principles",
        title: "Principles, mandate and conduct",
        durationMinutes: 7,
        objectives: ["Name the foundational principles", "Explain why mandate and conduct awareness matter"],
        sections: [
          { heading: "Three foundational principles", body: "United Nations peacekeeping is commonly framed around consent of the parties, impartiality, and non-use of force except in self-defence and defence of the mandate. These principles are interrelated and must be understood in the context of the mission mandate and applicable policy." },
          { heading: "Mandate awareness", body: "A mission mandate defines the authorised tasks and responsibilities of a peacekeeping operation. A general educational overview cannot replace mission-specific directives, national instructions, rules of engagement or authorised pre-deployment training." },
          { heading: "Professional responsibility", body: "Respect for human rights, protection of civilians, accountability, discipline and conduct are central to credible peacekeeping. Personnel must follow applicable law, official instructions and reporting procedures." }
        ],
        questions: [
          { id: "peace-1", prompt: "Which set names the three commonly stated basic UN peacekeeping principles?", options: [{ id:"a", text:"Speed, secrecy and surprise" }, { id:"b", text:"Consent of the parties, impartiality, and non-use of force except in self-defence and defence of the mandate" }, { id:"c", text:"Neutrality, territorial expansion and unrestricted force" }], correctOptionId:"b", explanation:"These are the three foundational principles commonly used to explain UN peacekeeping." },
          { id: "peace-2", prompt: "Can a general online learning module replace mission-specific authorised training?", options: [{ id:"a", text:"No; it is supplementary and cannot replace official instructions or qualifications" }, { id:"b", text:"Yes, if the learner passes the quiz" }, { id:"c", text:"Yes, if the learner has professional experience" }], correctOptionId:"a", explanation:"SPECTRA is not an official UN programme, national qualification or substitute for authorised training." }
        ]
      }
    ]
  }
];
