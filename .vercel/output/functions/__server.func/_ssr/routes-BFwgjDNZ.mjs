import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ArrowDown, i as ArrowRight, n as FlaskConical, r as Download } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as Bar, c as Legend, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BFwgjDNZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-sm font-medium outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-[scale,background-color,color,box-shadow,opacity] duration-150 ease-out active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg shadow-[0_0_0_1px_rgba(26,25,22,0.12)] hover:opacity-90",
			outline: "bg-transparent text-ink shadow-[0_0_0_1px_var(--color-line)] hover:bg-chip",
			ghost: "bg-transparent text-ink hover:bg-chip",
			inverse: "bg-ink text-bg hover:opacity-90"
		},
		size: {
			default: "h-11 rounded-[10px] px-4",
			sm: "h-9 rounded-md px-3 text-[13px]",
			lg: "h-12 rounded-[12px] px-5",
			icon: "size-11 rounded-[10px]"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var steps = [
	{
		id: "out",
		kicker: "01  Extracellular",
		title: "Mn²⁺ + Pi",
		body: "Orthophosphate and manganese sit in the medium as a metal-phosphate complex."
	},
	{
		id: "pita",
		kicker: "02  Membrane",
		title: "PitA / DrPitA",
		body: "Low-affinity PiT family co-transporter. Proton motive force drives Me-Pi uptake. Encoded by dr0925 in D. radiodurans."
	},
	{
		id: "mnpi",
		kicker: "03  Cytoplasm",
		title: "Mn-Pi pool",
		body: "The imported complex is already an antioxidant. It also feeds the PolyP-Mn reservoir."
	},
	{
		id: "ppk",
		kicker: "04  Storage",
		title: "PPK → PolyP-Mn",
		body: "Polyphosphate kinase polymerizes Pi. Long-chain PolyP chelates Mn²⁺ into granules — a safe warehouse."
	},
	{
		id: "ppx",
		kicker: "05  Stress release",
		title: "PPX → Mn-Pi",
		body: "Under H₂O₂ or radiation, exopolyphosphatase hydrolyzes PolyP-Mn and dumps bioavailable Mn-Pi."
	},
	{
		id: "ros",
		kicker: "06  Protection",
		title: "ROS sink",
		body: "Mn-Pi scavenges O₂⁻, •OH and H₂O₂, shielding proteins from carbonylation. Survival holds."
	}
];
function Connector({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center justify-center text-faint", className),
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
			className: "hidden size-4 lg:block",
			strokeWidth: 1.5
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
			className: "size-4 lg:hidden",
			strokeWidth: 1.5
		})]
	});
}
function PathwayFigure() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "m-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-sans text-[11px] font-medium tracking-[0.16em] text-accent uppercase",
					children: "Figure 1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-xl font-medium text-balance text-ink md:text-2xl",
					children: "The Mn-Pi enrichment circuit"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm font-sans text-xs leading-relaxed text-muted",
					children: "Side systems MntH (Mn-specific import) and FeoB (Fe²⁺ gating) keep the Mn/Fe ratio high so Fenton chemistry stays suppressed."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-0 lg:grid-cols-[1fr_auto_1fr_auto_1fr]",
				children: steps.slice(0, 3).map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "contents",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCard, { step }), i < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Connector, {}) : null]
				}, step.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "my-3 hidden items-center justify-center lg:flex",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-px bg-line" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Connector, { className: "lg:hidden" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-0 lg:grid-cols-[1fr_auto_1fr_auto_1fr]",
				children: steps.slice(3).map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "contents",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCard, {
						step,
						accent: step.id === "ros"
					}), i < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Connector, {}) : null]
				}, step.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
				className: "mt-5 max-w-3xl font-sans text-xs leading-relaxed text-muted",
				children: [
					"Knocking out ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "drpitA" }),
					" starves every downstream step: less Pi, less Mn, no PolyP surge under peroxide, more ROS, more protein carbonyls, collapse of survival. Complementation restores the circuit."
				]
			})
		]
	});
}
function StepCard({ step, accent = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("rounded-[16px] p-4 shadow-[var(--shadow-border)]", accent ? "bg-accent text-accent-fg" : "bg-surface text-ink"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("font-sans text-[10px] font-medium tracking-[0.14em] uppercase", accent ? "text-accent-fg/70" : "text-faint"),
				children: step.kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mt-2 font-display text-lg font-medium tracking-tight",
				children: step.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-2 font-sans text-sm leading-relaxed", accent ? "text-accent-fg/85" : "text-muted"),
				children: step.body
			})
		]
	});
}
var homologs = [
	{
		id: "pitA",
		name: "PitA",
		fullName: "Low-affinity metal-phosphate transporter",
		identity: 8.02,
		drId: "NP_294648.1",
		lpId: "YP_001974635.1",
		core: "Inorganic orthophosphate cage binding",
		residues: "LYS, ARG, SER, TYR",
		arrangement: "Conserved positive charges cage the phosphate substrate while the transmembrane pore co-transports a divalent metal as a Me-Pi complex.",
		leftPdb: "1PW4",
		rightPdb: "4J05",
		leftLabel: "D. radiodurans representative",
		rightLabel: "L. paracasei homolog model",
		selection: "LYS or ARG or SER or TYR",
		leftColor: "#7aa0aa",
		rightColor: "#2f4a56"
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
		arrangement: "Transmembrane helices 1 and 6 form a hydrophilic channel. Asp/Glu carboxylates build an octahedral oxygen-donor matrix that seizes Mn²⁺ and excludes Fe²⁺.",
		leftPdb: "4YGD",
		rightPdb: "5SD6",
		leftLabel: "D. radiodurans representative",
		rightLabel: "L. paracasei homolog model",
		selection: "ASP or GLU or ASN",
		leftColor: "#8b3a32",
		rightColor: "#c0754a"
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
		arrangement: "An electropositive cavity (Lys, Arg) balances the polyphosphate backbone so catalytic histidines can transfer phosphate from ATP.",
		leftPdb: "1XDP",
		rightPdb: "1XDO",
		leftLabel: "D. radiodurans representative",
		rightLabel: "Homolog catalytic fold",
		selection: "HIS or LYS or ARG",
		leftColor: "#6b4c7a",
		rightColor: "#4a3d5c"
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
		arrangement: "Carboxylate triads clamp two catalytic metals. The metals hold the terminal phosphate and activate a bridging water for nucleophilic cleavage.",
		leftPdb: "1U64",
		rightPdb: "1U6D",
		leftLabel: "D. radiodurans representative",
		rightLabel: "L. paracasei homolog model",
		selection: "ASP or GLU",
		leftColor: "#b59a4a",
		rightColor: "#3d5a4c"
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
		arrangement: "Cytosolic G-domain loops couple nucleotide binding to gate mechanics, keeping intracellular iron low so Fenton chemistry does not overrun the Mn shield.",
		leftPdb: "3SS8",
		rightPdb: "2HSZ",
		leftLabel: "D. radiodurans representative",
		rightLabel: "L. paracasei homolog model",
		selection: "THR or LYS or ASP",
		leftColor: "#c0754a",
		rightColor: "#8b3a32"
	}
];
var paperStats = {
	piWt: .8,
	piMut: .6,
	piDropPct: 27,
	mnWt: .7,
	mnMut: .6,
	mnDropPct: 14.3,
	survival60: 4.8,
	survival90: .7,
	rosFold: 1.4,
	carbonylFold: 1.7,
	carbonylMut: 21.1,
	pBefore: 2.3,
	pAfter: 2.8,
	mnBefore: 3.7,
	mnAfter: 4.6,
	sodFold: 1.6,
	polypFold: 1.7
};
var paradoxPoints = [
	{
		letter: "A",
		title: "Kinetic bottleneck",
		body: "MnSOD has a fixed kcat and saturates under intense ROS. Small-molecule Mn(II) complexes with phosphate, lactate, or bicarbonate are not confined to one compartment. They form a mobile, high-capacity chemical sink that keeps working after the enzyme is overwhelmed."
	},
	{
		letter: "B",
		title: "Physical shielding",
		body: "MnSOD dismutes superoxide in bulk water. Mn(II) coordinated to PolyP and nucleic acids sits on the molecules that actually need protecting. The complex is a local wrap, not a dissolved catalyst."
	},
	{
		letter: "C",
		title: "Fenton control",
		body: "Superoxide wrecks [4Fe-4S] clusters and dumps free Fe²⁺, which then makes hydroxyl radical with H₂O₂. Excess Mn(II) occupies those labile sites as a structural surrogate, so iron is never released to run the Fenton cascade."
	},
	{
		letter: "D",
		title: "PolyP synergy",
		body: "PPK polymerizes orthophosphate into long-chain PolyP. Those polyanions scaffold Mn(II) into granules: non-toxic storage, on-demand release by PPX when oxidative stress hits."
	}
];
var navItems = [
	{
		id: "point",
		label: "The point"
	},
	{
		id: "pathway",
		label: "Pathway"
	},
	{
		id: "homology",
		label: "Homologs"
	},
	{
		id: "gallery",
		label: "Active sites"
	},
	{
		id: "findings",
		label: "DrPitA paper"
	},
	{
		id: "paradox",
		label: "LAB paradox"
	},
	{
		id: "synthesis",
		label: "Synthesis"
	}
];
var NGL_SRC = "https://cdn.jsdelivr.net/npm/ngl@2.0.0-dev.37/dist/ngl.js";
var loading = null;
function loadNgl() {
	if (typeof window === "undefined") return Promise.reject(/* @__PURE__ */ new Error("NGL is browser-only"));
	if (window.NGL) return Promise.resolve(window.NGL);
	if (loading) return loading;
	loading = new Promise((resolve, reject) => {
		const existing = document.querySelector(`script[src="${NGL_SRC}"]`);
		if (existing && window.NGL) {
			resolve(window.NGL);
			return;
		}
		const script = existing ?? document.createElement("script");
		script.src = NGL_SRC;
		script.async = true;
		script.onload = () => {
			if (window.NGL) resolve(window.NGL);
			else reject(/* @__PURE__ */ new Error("NGL failed to initialize"));
		};
		script.onerror = () => reject(/* @__PURE__ */ new Error("Failed to load NGL"));
		if (!existing) document.head.appendChild(script);
	});
	return loading;
}
function StructureViewer({ pdbId, selection, color, label }) {
	const divId = `ngl-${(0, import_react.useId)().replace(/:/g, "")}`;
	const hostRef = (0, import_react.useRef)(null);
	const [status, setStatus] = (0, import_react.useState)("loading");
	const [message, setMessage] = (0, import_react.useState)("Fetching coordinates from RCSB…");
	(0, import_react.useEffect)(() => {
		const el = hostRef.current;
		if (!el) return;
		let disposed = false;
		let stage = null;
		const onResize = () => stage?.handleResize();
		setStatus("loading");
		setMessage(`Loading ${pdbId}…`);
		loadNgl().then((NGL) => {
			if (disposed) return;
			stage = new NGL.Stage(el, { backgroundColor: "#101214" });
			window.addEventListener("resize", onResize);
			return stage.loadFile(`https://files.rcsb.org/download/${pdbId}.pdb`);
		}).then((comp) => {
			if (!comp || disposed) return;
			comp.addRepresentation("cartoon", {
				sele: "protein",
				colorScheme: "chainindex",
				opacity: .85
			});
			comp.addRepresentation("spacefill", {
				sele: selection,
				color
			});
			comp.autoView();
			setStatus("ready");
		}).catch((err) => {
			if (disposed) return;
			setStatus("error");
			setMessage(err instanceof Error ? err.message : `Could not load ${pdbId}`);
		});
		return () => {
			disposed = true;
			window.removeEventListener("resize", onResize);
			stage?.dispose();
		};
	}, [
		pdbId,
		selection,
		color
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 rounded-[8px] bg-chip px-3 py-1.5 text-center font-sans text-xs font-medium text-ink",
			children: [
				label,
				" · PDB ",
				pdbId
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-[14px] bg-stage shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: hostRef,
				id: divId,
				className: "h-[280px] w-full md:h-[380px]"
			}), status !== "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center bg-stage px-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-sans text-sm text-chip",
					children: status === "error" ? message : "Rendering fold…"
				})
			}) : null]
		})]
	});
}
function ActiveSiteGallery() {
	const [active, setActive] = (0, import_react.useState)("pitA");
	const pair = homologs.find((h) => h.id === active) ?? homologs[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "tablist",
		"aria-label": "Homolog systems",
		className: "no-print -mx-1 flex gap-1 overflow-x-auto px-1 pb-2",
		children: homologs.map((h) => {
			const selected = h.id === active;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "tab",
				"aria-selected": selected,
				onClick: () => setActive(h.id),
				className: cn("h-11 shrink-0 rounded-[10px] px-4 font-sans text-sm font-medium transition-[background-color,color,scale] duration-150 ease-out active:scale-[0.96]", selected ? "bg-accent text-accent-fg" : "bg-chip text-ink hover:bg-line"),
				children: [h.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-2 font-mono text-[11px] opacity-70",
					children: [h.identity.toFixed(1), "%"]
				})]
			}, h.id);
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 rounded-[22px] bg-surface p-4 shadow-[var(--shadow-border)] md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-sans text-[11px] font-medium tracking-[0.16em] text-accent uppercase",
							children: pair.fullName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-2xl font-medium text-ink",
							children: pair.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-sans text-sm leading-relaxed text-muted",
							children: pair.arrangement
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid min-w-[200px] grid-cols-2 gap-x-4 gap-y-2 font-sans text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-faint",
							children: "Coordinating residues"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono text-ink",
							children: pair.residues
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-faint",
							children: "Global identity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "font-mono text-ink",
							children: [pair.identity.toFixed(2), "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-faint",
							children: "D. radiodurans"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono text-ink",
							children: pair.drId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-faint",
							children: "L. paracasei"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono text-ink",
							children: pair.lpId
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-5 md:grid-cols-2 no-print",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructureViewer, {
					pdbId: pair.leftPdb,
					selection: pair.selection,
					color: pair.leftColor,
					label: pair.leftLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructureViewer, {
					pdbId: pair.rightPdb,
					selection: pair.selection,
					color: pair.rightColor,
					label: pair.rightLabel
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-sans text-xs leading-relaxed text-muted no-print",
				children: "Cartoon is the protein fold, colored by chain. Spacefill marks the conserved active-site chemistry. Drag to orbit, scroll to zoom. Structures are representative homolog crystals from the PDB, used to inspect local geometry rather than claim identical sequences."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "print-only mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 font-sans text-[11px] font-medium tracking-[0.14em] text-accent uppercase",
					children: "All five pockets"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 font-sans text-xs leading-relaxed text-muted",
					children: homologs.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium text-ink",
							children: [h.name, "."]
						}),
						" ",
						h.residues,
						".",
						" ",
						h.arrangement,
						" PDB ",
						h.leftPdb,
						" / ",
						h.rightPdb,
						"."
					] }, h.id))
				})]
			})
		]
	})] });
}
var ionData = [{
	name: "Phosphate",
	WT: paperStats.piWt,
	Mutant: paperStats.piMut
}, {
	name: "Manganese",
	WT: paperStats.mnWt,
	Mutant: paperStats.mnMut
}];
var stressData = [
	{
		name: "ROS",
		WT: 1,
		Mutant: paperStats.rosFold
	},
	{
		name: "Carbonyls",
		WT: 1,
		Mutant: paperStats.carbonylFold
	},
	{
		name: "PolyP",
		WT: paperStats.polypFold,
		Mutant: 1
	},
	{
		name: "O₂⁻ sink",
		WT: paperStats.sodFold,
		Mutant: 1
	}
];
var tooltipStyle = {
	background: "#fbf9f3",
	border: "1px solid #d6d0c4",
	borderRadius: 10,
	fontSize: 12,
	color: "#1a1916"
};
function FindingsCharts() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-w-0 gap-4 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
			title: "Intracellular Mn and Pi",
			caption: "Restricted medium. ΔdrpitA loses 27% free phosphate and 14% manganese. Iron is unchanged — DrPitA is not an Fe importer.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: ionData,
				barGap: 6,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: {
							fill: "var(--color-muted)",
							fontSize: 12
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						width: 32,
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "WT",
						fill: "var(--color-accent)",
						radius: [
							4,
							4,
							0,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "Mutant",
						fill: "var(--color-rule)",
						radius: [
							4,
							4,
							0,
							0
						]
					})
				]
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
			title: "Stress phenotype, relative to wild type",
			caption: "After 30 mM H₂O₂ the mutant piles up ROS and carbonyls and fails to assemble the PolyP warehouse the wild type builds.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: stressData,
				barGap: 6,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						width: 32,
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "WT",
						fill: "var(--color-accent)",
						radius: [
							4,
							4,
							0,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "Mutant",
						fill: "var(--color-rule)",
						radius: [
							4,
							4,
							0,
							0
						]
					})
				]
			}) })
		})]
	});
}
function ClientChart({ children }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setReady(true);
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-[220px] w-full min-w-0",
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-[220px] w-full min-w-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children
		})
	});
}
function ChartCard({ title, caption, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "m-0 min-w-0 rounded-[22px] bg-surface p-4 shadow-[var(--shadow-border)] md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-medium text-ink",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 min-w-0",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "mt-3 font-sans text-xs leading-relaxed text-muted",
				children: caption
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#point",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg",
				children: "Skip to the point"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[1080px] overflow-x-hidden px-4 pb-24 pt-8 md:px-8 md:pt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						id: "point",
						kicker: "The argument",
						title: "Sequence is noise. Geometry is the function.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThePoint, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						id: "pathway",
						kicker: "Figure 1",
						title: "How the shield is stocked",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathwayFigure, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						id: "homology",
						kicker: "Alignment",
						title: "Five systems, all under 10% identity",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomologyTable, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						id: "gallery",
						kicker: "Structure",
						title: "Side-by-side active sites",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-6 max-w-2xl font-sans text-base leading-relaxed text-muted",
							children: "Global alignments score like random sequence. Local coordination geometries do not. Residues in spacefill are the conserved chemistry that still binds Mn, cages phosphate, and hydrolyzes PolyP after billions of years of divergence."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveSiteGallery, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						id: "findings",
						kicker: "Xie et al., 2026",
						title: "DrPitA is the missing importer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperFindings, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						id: "paradox",
						kicker: "Physiology",
						title: "Why lactic acid bacteria still hoard manganese",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paradox, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						id: "synthesis",
						kicker: "Close",
						title: "What this actually says",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Synthesis, {})
					})
				]
			})
		]
	});
}
function TopBar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "no-print sticky top-0 z-40 border-b border-line/80 bg-bg/90 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1080px] items-center gap-3 px-4 py-3 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, {
					className: "size-4 shrink-0 text-accent",
					strokeWidth: 1.75
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hidden font-display text-sm font-medium tracking-tight text-ink sm:block",
					children: "Mn-Pi Atlas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "ml-auto hidden items-center gap-1 lg:flex",
					"aria-label": "Report sections",
					children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#${item.id}`,
						className: "rounded-md px-2.5 py-2 font-sans text-xs font-medium text-muted transition-[color,background-color] duration-150 hover:bg-chip hover:text-ink",
						children: item.label
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					className: "ml-auto lg:ml-2",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/mn-pi-atlas.pdf",
						download: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Download PDF"]
					})
				})
			]
		})
	});
}
function Cover() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "print-page mb-16 border-b border-rule pb-12 md:mb-20 md:pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-sans text-[11px] font-medium tracking-[0.2em] text-accent uppercase",
				children: "Comparative structural physiology"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 max-w-4xl font-display text-[2.15rem] leading-[1.12] font-medium tracking-[-0.03em] text-ink md:text-6xl",
				children: "The manganese-polyphosphate shield, conserved in geometry if not in sequence."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 max-w-2xl font-display text-xl leading-snug text-muted italic md:text-2xl",
				children: [
					"A living report on how ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Deinococcus radiodurans" }),
					" and",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Lactobacillus paracasei" }),
					" run the same non-enzymatic antioxidant program."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 font-sans text-sm md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Primary paper",
						value: "Xie et al., AEM 2026"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Systems",
						value: "PitA · MntH · PPK · PPX · FeoB"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Identity range",
						value: "8.02–10.03%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Format",
						value: "Interactive + printable PDF"
					})
				]
			})
		]
	});
}
function Meta({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-[11px] tracking-[0.12em] text-faint uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 font-medium text-ink",
		children: value
	})] });
}
function Section({ id, kicker, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id,
		className: "print-page mb-16 scroll-mt-24 md:mb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-sans text-[11px] font-medium tracking-[0.18em] text-accent uppercase",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 max-w-3xl font-display text-3xl font-medium tracking-[-0.02em] text-ink md:text-4xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children
			})
		]
	});
}
function ThePoint() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5 font-sans text-[17px] leading-[1.65] text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "D. radiodurans" }), " survives ionizing radiation that would erase most cells. The textbook explanation is DNA repair. The quieter, and in some ways more important, explanation is chemistry: the cell stocks millimolar manganese complexed with phosphate and metabolites, and those small-molecule Mn-Pi complexes scavenge superoxide, hydroxyl radical, and hydrogen peroxide before proteins carbonylate."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "L. paracasei" }), " is a dairy lactic acid bacterium, not a radioresistant freak. Its genome still encodes the same five machines — PitA, MntH, PPK, PPX, FeoB — but a needle alignment against the Deinococcus proteins returns identities of 8–10%. That is the range where BLAST stops being a reliable friend. Function, however, is not stored in the global string. It is stored in a handful of coordinating side chains whose 3D arrangement still builds an octahedral Mn cage, a phosphate pocket, and a bimetallic PolyP clamp."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"That is the point. Extreme sequence divergence can hide a conserved active-site geometry. The geometry is why a cheese isolate can run the same Mn-Pi antioxidant program that lets an extremophile walk away from 10 kGy of gamma rays. Xie et al. (2026) close the last gap in the Deinococcus circuit: DrPitA, encoded by ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "dr0925" }),
					", is the importer that actually fills the warehouse."
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-[22px] bg-accent p-6 text-accent-fg md:p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-sans text-[11px] font-medium tracking-[0.16em] text-accent-fg/70 uppercase",
					children: "Hold this"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-2xl leading-snug font-medium",
					children: "Identity under 10% is not evidence of unrelated function. It is evidence that the alignment is looking at the wrong layer."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 font-sans text-sm leading-relaxed text-accent-fg/80",
					children: "Look at the coordinating residues, not the rest of the chain. Asp/Glu carboxylates for Mn. Lys/Arg for polyphosphate. A PiT-family pore for Me-Pi co-transport. Those motifs survive. The rest of the protein is free to drift."
				})
			]
		})]
	});
}
function HomologyTable() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto rounded-[22px] bg-surface shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[720px] border-collapse text-left font-sans text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
					className: "sr-only",
					children: "Global sequence identity of five Mn-Pi systems between D. radiodurans and L. paracasei"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line text-[11px] tracking-[0.12em] text-faint uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 font-medium",
							children: "System"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 font-medium",
							children: "D. radiodurans"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 font-medium",
							children: "L. paracasei"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 font-medium",
							children: "Identity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 font-medium",
							children: "Conserved core"
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: homologs.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line last:border-b-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-ink",
								children: h.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 text-xs text-muted",
								children: h.fullName
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4 font-mono text-xs text-ink",
							children: h.drId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4 font-mono text-xs text-ink",
							children: h.lpId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityBar, { value: h.identity })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4 text-muted",
							children: h.core
						})
					]
				}, h.id)) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-5 py-4 text-xs leading-relaxed text-muted",
			children: "Needle global alignments on genome-extracted homologs. Typical “same protein” identities sit well above 30%. These numbers would be discarded as noise if the 3D pockets were not superposable."
		})]
	});
}
function IdentityBar({ value }) {
	const width = Math.min(100, value / 30 * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 w-24 overflow-hidden rounded-full bg-chip",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full rounded-full bg-accent",
				style: { width: `${width}%` }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-mono text-xs tabular-nums text-ink",
			children: [value.toFixed(2), "%"]
		})]
	});
}
function PaperFindings() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl space-y-4 font-sans text-[17px] leading-[1.65] text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Xie, Dai, Tian and colleagues asked a blunt question: how does",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "D. radiodurans" }),
					" actually enrich Mn-Pi? They found a PiT-family homolog at ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "dr0925" }),
					", 30% identical to ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Thermotoga maritima" }),
					" ",
					"PiT, with the canonical GXXDXAN / PXSSXH and HGXND / PXSTTH motifs sitting in a predicted 10-helix membrane protein. A C-terminal mGFP fusion lights up the cell envelope, not the cytoplasm."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Delete ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "drpitA" }),
					" and the phenotype is a starved warehouse. Restricted medium: phosphate down 27%, manganese down 14%, iron untouched. Inhibition zones shrink on 1 M Mn²⁺ (the mutant cannot take the metal up, so it is paradoxically less sensitive). Spike TGY with 1 µM MnCl₂ and wild-type intracellular Mn more than doubles; the mutant does not move. Under 60 mM H₂O₂ survival falls to 4.8% of wild type; at 90 mM it is 0.7%. Complementation brings survival back."
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: `${paperStats.piDropPct}%`,
						label: "Less intracellular Pi",
						hint: "0.8 → 0.6 µmol/mL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: `${paperStats.survival60}%`,
						label: "Survival vs WT at 60 mM H₂O₂",
						hint: "Falls to 0.7% at 90 mM"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: `${paperStats.rosFold}×`,
						label: "ROS after 30 mM H₂O₂",
						hint: "DHE probe, 30 min"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: `${paperStats.carbonylFold}×`,
						label: "Protein carbonyls",
						hint: `${paperStats.carbonylMut} nmol/mg in the mutant`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindingsCharts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl space-y-4 font-sans text-[17px] leading-[1.65] text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"After peroxide, wild-type cells raise phosphorus from 2.3 to 2.8 µmol/mg and manganese from 3.7 to 4.6 nmol/mg. The mutant does not. Superoxide scavenging in the wild-type lysate jumps 1.6-fold; PolyP fluorescence 1.7-fold. The mutant’s PolyP granules never appear. Transcription of ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "ppk" }),
					" and ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "ppx" }),
					" goes up anyway — a compensatory shout at an empty cupboard."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: "Other Mn routes (MntH, MntABC) still operate, which is why residual manganese remains. DrPitA is not the only door. It is the door that stocks the phosphate half of the complex, and without that half the PolyP-Mn reservoir cannot be built."
				})]
			})
		]
	});
}
function Stat({ value, label, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[16px] bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl font-medium tracking-tight text-ink",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-sans text-sm font-medium text-ink",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-sans text-xs text-muted",
				children: hint
			})
		]
	});
}
function Paradox() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-8 max-w-3xl font-sans text-[17px] leading-[1.65] text-ink",
		children: "Lactic acid bacteria already encode MnSOD. Why, then, does flooding them with inorganic Mn(II) still save lives? The enzyme and the small-molecule pool are not redundant. They fail in different places."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "grid gap-4 md:grid-cols-2",
		children: paradoxPoints.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-[22px] bg-surface p-5 shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-sm font-medium text-accent",
				children: [
					item.letter,
					". ",
					item.title
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-sans text-sm leading-relaxed text-muted",
				children: item.body
			})]
		}, item.letter))
	})] });
}
function Synthesis() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl space-y-4 font-sans text-[17px] leading-[1.65] text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Put the paper and the comparative atlas on the same bench.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "D. radiodurans" }),
					" uses DrPitA to import Mn-Pi, PPK to warehouse it as PolyP-Mn, and PPX to release the antioxidant when ROS arrives. MntH tops up manganese; FeoB keeps iron from poisoning the chemistry.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "L. paracasei" }),
					" keeps the same five pockets, even though a sequence alignment would tell you the proteins are unrelated."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The blank page in the original report was this figure of the circuit, and the structural gallery that shows why the circuit can be inherited without inheriting the sequence. Print this page. The 3D canvases will not travel; the argument will." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "max-w-3xl border-l-2 border-accent pl-5 font-display text-2xl leading-snug font-medium text-ink",
				children: "The shield is not a gene. It is a coordination geometry that two distant lineages still know how to build."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl font-sans text-xs leading-relaxed text-faint",
				children: "Sources: Xie et al., Appl. Environ. Microbiol. 2026, 92:e02107-25 (DrPitA). Internal comparative report on L. paracasei ATCC 334 vs D. radiodurans homologs. Representative PDB entries as listed in the gallery. Save as PDF from the toolbar to keep a typeset copy."
			})
		]
	});
}
//#endregion
export { Home as component };
