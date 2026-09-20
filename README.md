# Mn-Pi Atlas

Interactive report on the manganese-phosphate oxidative shield shared by
*Deinococcus radiodurans* and *Lactobacillus paracasei*.

**Live:** [https://devastotra-stack.github.io/mn-pi-atlas/](https://devastotra-stack.github.io/mn-pi-atlas/)

Sequence identity across PitA, MntH, PPK, PPX and FeoB sits at 8 to 10 percent.
The coordinating geometries still match. The atlas walks that argument with a
live PolyP-Mn clock (Dai et al., 2021), DrPitA phenotypes (Xie et al., 2026),
and side-by-side PDB active sites.

## Run

```bash
npm install
npm run dev
```

Then open the app at the printed local URL (port 8080).

```bash
npm run typecheck
npm run build
```

GitHub Pages static export:

```bash
npm run build:pages
```

## What is in here

- **Pathway** of Mn-Pi import, PolyP storage, and PPX release
- **Dynamics lab**: pedagogical ODE of wild type, Δppk, Δppx, ΔpitA
- **Homolog table** and NGL.js gallery of conserved active-site residues
- **Printable PDF** via Download PDF in the toolbar

## Sources

- Xie et al., *Appl. Environ. Microbiol.* 2026, 92:e02107-25 (DrPitA)
- Dai et al., *Appl. Environ. Microbiol.* 2021, 87:e02785-20 (PolyP-Mn clock)
