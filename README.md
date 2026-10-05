# Finding Home — Lab 2: Events in Motion

An extension of the original Lab 1 scroll story. Plain HTML, CSS, and JavaScript; no build step. All illustrated scenes are CSS; no image files are needed.

## Try the interactions
1. Click/tap wish-list priorities in The Dream: the selected buttons and matching property cards change.
2. Choose a home: the card is highlighted, the showing/offer text updates, and the page moves to the showing.
3. Use Previous/Next or focus the room controls and press left/right arrows: the room name, description, counter, and scene colours change.
4. Send a practice offer: the status changes immediately, then a simulated acceptance appears after 1.8 seconds and updates the keys chapter.

## Technical requirements
- DOM manipulation: textContent, hidden, dataset, classList, disabled, and aria-pressed.
- Event listeners: click (mouse/touch and native keyboard activation), keydown, scroll, and resize.
- BOM: window.setTimeout/clearTimeout, window.matchMedia, scrollY, innerHeight, and requestAnimationFrame.
- Retains Lab 1 parallax, layered layouts, transforms, transitions, and progressive reveal. Reduced-motion preference disables parallax.
- Every property and offer is fictional. Nothing is transmitted or submitted.

## Publish separately for Lab 2
Keep your completed Lab 1 repository unchanged. Create a new public repository called Lab2-Events-in-Motion. Upload index.html, style.css, script.js, and README.md directly at its root (not the ZIP or enclosing folder). Use the commit message Class Progress; this records today's real commit, not a past class attendance date. In Settings → Pages, choose Deploy from a branch, main, /(root), then Save. After deployment, test the interactions and submit the new repository URL and the exact live URL GitHub displays.

## Quick checks
Check wish-list filtering, choose each home, test both room buttons and arrow keys, send an offer and wait for acceptance, change the selection and send again, and test on a narrow screen. Refresh and scroll the entire story. No setup or dependencies are required to run locally: open index.html.
