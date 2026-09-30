# Portfolio release — September 30, 2026

## Changes
- Added GIPHY commercial case study, eight selected animated stickers with lifetime views and search/use-case descriptions, and seven WeThe15 concept GIFs.
- Added GIPHY to homepage and Projects, with a near-white cover, GIPHY logo, colourful original stickers, and larger metrics.
- Projects now has accessible UX/UI & Product Design and Illustration & Other tabs. The latter contains GIPHY, Psyche Likee, and Consulting pitch storyboard. Reduced heading spacing brings tabs higher.
- GIPHY introduction and closing sections align with the sticker grid. GIFs autoplay; reduced-motion preferences show stills.
- Psyche Likee uses the original animated cover and all ten source gallery visuals.
- Vox City includes all thirteen original gallery visuals and its original Vimeo prototype video.
- Uptraded includes all eleven original gallery visuals in source order and its original Vimeo video.
- Single-column, larger galleries for Vox City, LSAT Demon, TrueSVG, Witco, iCompare, Uptraded, SpiderWatch, Eloqa, and SwappyBooks. Full-size image viewer retained.

## Source and metric provenance
Reference imagery comes from Raf's original Webflow case studies. Per-sticker lifetime counts were checked September 30, 2026. Monthly headline metrics cover Aug 30–Sep 30, 2026. Views measure reach, not unique people or messages. Search descriptions identify measured analytics, public tags, and editorial suggestions. WeThe15 is a proposed collection, not an adopted campaign.

## Publishing
GitHub repository: Rafs84/rafsdesign-portfolio. GitHub Pages publishes main to rafsdesign.com. The workflow now deploys tracked index.html, projects, assets, and giphy directly, replacing assembly from the older split archive. Historical site-parts remain for reference.

## Validation
Checked tab switching, gallery columns and full-size viewer, ordered imported images, Vimeo player loading, GIF autoplay, and introductory text alignment in the local preview. Production links and deployment are checked after publishing.

## Future updates
Use this repository as the website source. Keep source-images.json and GIPHY selection.json manifests with assets. Refresh dated metrics deliberately. Local preview: node preview.cjs (local workspace only). Do not publish screenshot previews or synced ChatGPT reference files.

## Completed deployment
Published September 30, 2026. Website release commit: `599626d`. Successful GitHub Pages run: https://github.com/Rafs84/rafsdesign-portfolio/actions/runs/36745471151. Live GIPHY page and project tab markup verified on https://rafsdesign.com.

Homepage follow-up: removed the GIPHY card from Selected projects. GIPHY remains available in Projects → Illustration & Other and at /giphy/.

Case-study layout follow-up: all project labels now sit above the narrative, matching GIPHY. Removed the sidebar column; text and gallery share the same section alignment.

Project navigation follow-up: Next project follows each Projects tab’s displayed order, wrapping the last card to the first in that tab. Illustration order: GIPHY → Psyche Likee → Consulting pitch storyboard → GIPHY. Product design follows its twelve-card order.

Added Mish Mish to Illustration & Other: original cover and both original gallery images, concise personal-project case study. Navigation order now continues Consulting pitch storyboard → Mish Mish → GIPHY.

Added standalone WeThe15 illustration case study with seven original campaign GIFs. Identified as an unadopted concept. Illustration navigation continues Mish Mish → WeThe15 → GIPHY.

Added Piano Carnival last in UX/UI & Product Design with all four original images in source order, in a single-column gallery. Navigation: SwappyBooks → Piano Carnival → LSAT Demon.

Piano Carnival card thumbnail now uses the original blog listing image (707x530.png); case-study cover and gallery unchanged.

Removed the duplicate Piano Carnival detail cover. Mish Mish now displays all three source images in their original order, in a single-column gallery with unrestricted image height.
