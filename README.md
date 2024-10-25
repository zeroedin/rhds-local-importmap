## Install

```bash
nvm use
npm ci
npm run start
```


Also tested with `@cpelements/elements` and `@patternfly/elements` as depedencies

```bash
npm install --save @cpelements/elements --ignore-scripts    #needed ignore scripts to get around a postinstall action
npm install --save @patternfly/elements
```

Modify the import map:
```
<script type="importmap">
    {
      "imports": {
        "@cpelements/elements/": "/assets/packages/@cpelements/elements@2.0.0-alpha.46/elements/",
        "@rhds/elements/": "/assets/packages/@rhds/elements@2.1.0/elements/",
        "@patternfly/elements/": "/assets/packages/@patternfly/elements@4.0.2/",
        "@patternfly/pfe-core": "/assets/packages/@patternfly/pfe-core@4.0.4/core.js",
        "@rhds/tokens/": "/assets/packages/@rhds/tokens@2.1.0/",
        "@rhds/icons/": "/assets/packages/@rhds/icons@1.1.2/"
      },
      "scopes": {
        "/assets/packages/": {
          "@floating-ui/core": "/assets/packages/@floating-ui/core@1.6.8/dist/floating-ui.core.mjs",
          "@floating-ui/dom": "/assets/packages/@floating-ui/dom@1.6.11/dist/floating-ui.dom.mjs",
          "@floating-ui/utils": "/assets/packages/@floating-ui/utils@0.2.8/dist/floating-ui.utils.mjs",
          "@floating-ui/utils/dom": "/assets/packages/@floating-ui/utils@0.2.8/dist/floating-ui.utils.dom.mjs",
          "@lit/context": "/assets/packages/@lit/context@1.1.3/development/index.js",
          "@lit/reactive-element": "/assets/packages/@lit/reactive-element@2.0.4/development/reactive-element.js",
          "@lit/reactive-element/decorators/": "/assets/packages/@lit/reactive-element@2.0.4/development/decorators/",
          "@patternfly/pfe-core/": "/assets/packages/@patternfly/pfe-core@4.0.4/",
          "@patternfly/pfe-core/ssr-shims.js": "/assets/packages/@patternfly/pfe-core@4.0.4/core.js",
          "@rhds/elements/lib/": "/assets/packages/@rhds/elements@2.1.0/lib/",
          "@rhds/elements/": "/assets/packages/@rhds/elements@2.1.0/elements/",
          "@rhds/icons/ui/": "/assets/packages/@rhds/icons@1.1.2/ui/",
          "@rhds/tokens/css/": "/assets/packages/@rhds/tokens@2.1.0/css/",
          "@rhds/tokens/media.js": "/assets/packages/@rhds/tokens@2.1.0/js/media.js",
          "lit": "/assets/packages/lit@3.2.1/index.js",
          "lit-element/lit-element.js": "/assets/packages/lit-element@4.1.1/development/lit-element.js",
          "lit-html": "/assets/packages/lit-html@3.2.1/development/lit-html.js",
          "lit-html/": "/assets/packages/lit-html@3.2.1/development/",
          "lit/": "/assets/packages/lit@3.2.1/",
          "prism-esm": "/assets/packages/prism-esm@1.29.0-fix.6/prism.js",
          "prism-esm/components/": "/assets/packages/prism-esm@1.29.0-fix.6/components/",
          "tslib": "/assets/packages/tslib@2.8.0/tslib.es6.mjs",
          "@glidejs/glide/dist/glide.modular.esm.js": "/assets/packages/@glidejs/glide@3.6.2/dist/glide.modular.esm.js"
        }
      }
    }
  </script>
  ```

  add some imports

  ```
  import '@patternfly/elements/pf-card/pf-card.js';
  import '@cpelements/elements/cp-slider/cp-slider.js';
  ```

  *NOTE:* I have not tested the full suite of patternfly or cpelements so the importmap may need further adjustmenet depending on the components used.