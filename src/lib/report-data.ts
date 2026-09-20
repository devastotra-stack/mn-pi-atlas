export type HomologId = "mntH" | "ppk" | "ppx" | "pitA" | "feoB";

export type Homolog = {
  id: HomologId;
  name: string;
  fullName: string;
  identity: number;
  drId: string;
  lpId: string;
  core: string;
  residues: string;
  arrangement: string;
  leftPdb: string;
  rightPdb: string;
  leftLabel: string;
  rightLabel: string;
  selection: string;
  leftColor: string;
  rightColor: string;
};

export const homologs: Homolog[] = [
  {
    id: "pitA",
    name: "PitA",
    fullName: "Low-affinity metal-phosphate transporter",
    identity: 8.02,
    drId: "NP_294648.1",
    lpId: "YP_001974635.1",
    core: "Inorganic orthophosphate cage binding",
    residues: "LYS, ARG, SER, TYR",
    arrangement:
      "Conserved positive charges cage the phosphate substrate while the transmembrane pore co-transports a divalent metal as a Me-Pi complex.",
    leftPdb: "1PW4",
    rightPdb: "4J05",
    leftLabel: "D. radiodurans representative",
    rightLabel: "L. paracasei homolog model",
    selection: "LYS or ARG or SER or TYR",
    leftColor: "#7aa0aa",
    rightColor: "#2f4a56",
  },
  {
    id: "mntH",
    name: "MntH",
    fullName: "Nramp-family manganese transporter",
    identity: 10.03,
    drId: "NP_295432.1",
    lpId: "YP_001975416.1",
    core: "Octahedral Mn²⁺ binding (Asp-Glu-Asn core)",
    residues: "ASP, GLU, ASN",
    arrangement:
      "Transmembrane helices 1 and 6 form a hydrophilic channel. Asp/Glu carboxylates build an octahedral oxygen-donor matrix that seizes Mn²⁺ and excludes Fe²⁺.",
    leftPdb: "4YGD",
    rightPdb: "5SD6",
    leftLabel: "D. radiodurans representative",
    rightLabel: "L. paracasei homolog model",
    selection: "ASP or GLU or ASN",
    leftColor: "#8b3a32",
    rightColor: "#c0754a",
  },
  {
    id: "ppk",
    name: "PPK",
    fullName: "Polyphosphate kinase",
    identity: 8.4,
    drId: "NP_294244.1",
    lpId: "YP_001974797.1",
    core: "Poly-P alignment cleft, phosphohistidine intermediate",
    residues: "HIS, LYS, ARG",
    arrangement:
      "An electropositive cavity (Lys, Arg) balances the polyphosphate backbone so catalytic histidines can transfer phosphate from ATP.",
    leftPdb: "1XDP",
    rightPdb: "1XDO",
    leftLabel: "D. radiodurans representative",
    rightLabel: "Homolog catalytic fold",
    selection: "HIS or LYS or ARG",
    leftColor: "#6b4c7a",
    rightColor: "#4a3d5c",
  },
  {
    id: "ppx",
    name: "PPX",
    fullName: "Exopolyphosphatase",
    identity: 9.72,
    drId: "NP_294314.1",
    lpId: "YP_001974354.1",
    core: "Bimetallic Mg/Mn center coordination",
    residues: "ASP, GLU",
    arrangement:
      "Carboxylate triads clamp two catalytic metals. The metals hold the terminal phosphate and activate a bridging water for nucleophilic cleavage.",
    leftPdb: "1U64",
    rightPdb: "1U6D",
    leftLabel: "D. radiodurans representative",
    rightLabel: "L. paracasei homolog model",
    selection: "ASP or GLU",
    leftColor: "#b59a4a",
    rightColor: "#3d5a4c",
  },
  {
    id: "feoB",
    name: "FeoB",
    fullName: "Ferrous iron transporter",
    identity: 8.77,
    drId: "NP_294942.1",
    lpId: "YP_001974823.1",
    core: "Walker-like G-domain nucleotide regulatory switch",
    residues: "THR, LYS, ASP",
    arrangement:
      "Cytosolic G-domain loops couple nucleotide binding to gate mechanics, keeping intracellular iron low so Fenton chemistry does not overrun the Mn shield.",
    leftPdb: "3SS8",
    rightPdb: "2HSZ",
    leftLabel: "D. radiodurans representative",
    rightLabel: "L. paracasei homolog model",
    selection: "THR or LYS or ASP",
    leftColor: "#c0754a",
    rightColor: "#8b3a32",
  },
];

export const paperStats = {
  piWt: 0.8,
  piMut: 0.6,
  piDropPct: 27,
  mnWt: 0.7,
  mnMut: 0.6,
  mnDropPct: 14.3,
  survival60: 4.8,
  survival90: 0.7,
  rosFold: 1.4,
  carbonylFold: 1.7,
  carbonylMut: 21.1,
  pBefore: 2.3,
  pAfter: 2.8,
  mnBefore: 3.7,
  mnAfter: 4.6,
  sodFold: 1.6,
  polypFold: 1.7,
};

export const paradoxPoints = [
  {
    letter: "A",
    title: "Kinetic bottleneck",
    body: "MnSOD has a fixed kcat and saturates under intense ROS. Small-molecule Mn(II) complexes with phosphate, lactate, or bicarbonate are not confined to one compartment. They form a mobile, high-capacity chemical sink that keeps working after the enzyme is overwhelmed.",
  },
  {
    letter: "B",
    title: "Physical shielding",
    body: "MnSOD dismutes superoxide in bulk water. Mn(II) coordinated to PolyP and nucleic acids sits on the molecules that actually need protecting. The complex is a local wrap, not a dissolved catalyst.",
  },
  {
    letter: "C",
    title: "Fenton control",
    body: "Superoxide wrecks [4Fe-4S] clusters and dumps free Fe²⁺, which then makes hydroxyl radical with H₂O₂. Excess Mn(II) occupies those labile sites as a structural surrogate, so iron is never released to run the Fenton cascade.",
  },
  {
    letter: "D",
    title: "PolyP synergy",
    body: "PPK polymerizes orthophosphate into long-chain PolyP. Those polyanions scaffold Mn(II) into granules: non-toxic storage, on-demand release by PPX when oxidative stress hits.",
  },
];

export const navItems = [
  { id: "point", label: "The point" },
  { id: "pathway", label: "Pathway" },
  { id: "homology", label: "Homologs" },
  { id: "gallery", label: "Active sites" },
  { id: "findings", label: "DrPitA paper" },
  { id: "paradox", label: "LAB paradox" },
  { id: "synthesis", label: "Synthesis" },
] as const;
