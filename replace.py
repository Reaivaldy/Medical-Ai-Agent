import sys
import os

filepath = 'c:/Users/reari/Downloads/AI agent/frontend/src/App.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    s = f.read()

replacements = {
    'Open Design — Vol. 01 · Issue Nº 26': 'Health AI — Vol. 01 · Issue Nº 01',
    'Skills · Systems · Agents · BYOK · Local-first': 'Wellness · Diagnostics · Privacy · Local-first',
    'OD / 2026': 'HEALTH / 2026',
    'Design · Intelligence': 'Medicine · Intelligence',
    '<span className=\'brand-mark\'>Ø</span>': '<img src="./assets/health_logo.png" alt="" style={{width: "24px", height: "24px", marginRight: "8px"}} />',
    'Open Design': 'Health AI',
    'Designing <em>intelligence</em> with skills, <em>taste,</em> and <em>code</em>': 'Navigating <em>health</em> with intelligence, <em>care,</em> and <em>precision</em>',
    'The open-source alternative to Anthropic&rsquo;s Claude Design. 12 coding agents — Claude, Codex, Cursor, Gemini and friends — drive 31 composable skills and 72 brand-grade design systems. Generate web pages, slide decks, mobile prototypes, images, even short videos — all running on your own laptop.': 'The open-source medical intelligence platform. Get expert-level diagnostic insights, wellness tracking, and medical literature analysis seamlessly. Backed by verified data and cutting-edge Gemini 2.5 architecture — all running locally with strict privacy protocols.',
    '<b>skills</b>shippable': '<b>Available</b>24 / 7',
    '<b>systems</b>portable': '<b>Journals</b>10K+',
    '<b>CLIs</b>BYO agent': '<b>Privacy</b>Local-first',
    '31': '24/7',
    '72': '10K+',
    '12': '1',
    'Skills, systems, and surfaces <em>for creative</em> intelligence': 'Intelligence and care <em>for clinical</em> decisions',
    'We blend human taste with whichever agent you already trust to ship interfaces, decks, and editorial pages that feel intentional, expressive, and alive.': 'We blend human empathy with rigorous clinical reasoning to support diagnostics, wellness tracking, and physiological data analysis.',
    'From <em>signals</em> to systems': 'From <em>symptoms</em> to solutions',
    'A living archive of <em>experiments</em> in skills, decks, and machine-made form': 'A living archive of <em>insights</em> in medicine, diagnostics, and human wellness',
    'Skills that turn briefs into <em>memorable</em> shippable <em>artifacts</em>': 'Intelligence that turns symptoms into <em>actionable</em> medical <em>insights</em>',
    'The open-source alternative to Claude Design.': 'The open-source local health assistant.'
}

for k, v in replacements.items():
    s = s.replace(k, v)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(s)

print("Replacement complete.")
