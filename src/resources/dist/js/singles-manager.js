/**
 * Singles Manager
 *
 * Intercepts clicks on single sources in the entry element index sidebar and
 * redirects to the single's edit form instead of the default element index
 * behaviour.
 *
 * Uses capture-phase interception so we run before Craft's element index
 * click handlers, which are attached via Vue and are not removable by simply
 * stripping HTML attributes.
 */
(function () {
    document.addEventListener('click', function (e) {
        var el = e.target && e.target.closest ? e.target.closest('[data-singles-manager-url]') : null;
        if (!el) return;

        var url = el.getAttribute('data-singles-manager-url');
        if (!url) return;

        e.preventDefault();
        e.stopImmediatePropagation();
        window.location.href = url;
    }, true /* capture phase — runs before all bubble-phase / Vue handlers */);

    // Handle breadcrumb and sidebar custom-source links: pre-select the source
    // in localStorage before navigating so the element index opens on it.
    document.addEventListener('click', function (e) {
        var el = e.target && e.target.closest
            ? e.target.closest('.singles-manager-crumb-source, .singles-manager-custom-source')
            : null;
        if (!el) return;

        e.preventDefault();
        var sourceKey = el.dataset.sourceKey;
        var pageUrl = el.dataset.pageUrl || el.href;
        if (sourceKey && typeof Craft !== 'undefined' && Craft.systemUid) {
            var storageKey = 'Craft-' + Craft.systemUid + '.elementindex.craft\\elements\\Entry';
            var state = {};
            try { state = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (_) {}
            state.selectedSource = sourceKey;
            localStorage.setItem(storageKey, JSON.stringify(state));
        }
        window.location.href = pageUrl;
    });
}());

