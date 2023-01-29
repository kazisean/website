// vite.config.ts
import { resolve as resolve2 } from "path";
import { defineConfig } from "file:///home/kazi/Documents/website/node_modules/.pnpm/vite@3.2.4/node_modules/vite/dist/node/index.js";
import Vue from "file:///home/kazi/Documents/website/node_modules/.pnpm/@vitejs+plugin-vue@3.2.0_vite@3.2.4+vue@3.2.45/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///home/kazi/Documents/website/node_modules/.pnpm/vite-plugin-pages@0.27.1_vite@3.2.4/node_modules/vite-plugin-pages/dist/index.mjs";
import generateSitemap from "file:///home/kazi/Documents/website/node_modules/.pnpm/vite-ssg-sitemap@0.4.3/node_modules/vite-ssg-sitemap/dist/index.js";
import Layouts from "file:///home/kazi/Documents/website/node_modules/.pnpm/vite-plugin-vue-layouts@0.7.0_ltio2jrs4h243s6indlqgywoku/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Components from "file:///home/kazi/Documents/website/node_modules/.pnpm/unplugin-vue-components@0.22.9_vue@3.2.45/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///home/kazi/Documents/website/node_modules/.pnpm/unplugin-auto-import@0.11.4_@vueuse+core@9.5.0/node_modules/unplugin-auto-import/dist/vite.js";
import Markdown from "file:///home/kazi/Documents/website/node_modules/.pnpm/vite-plugin-vue-markdown@0.22.1_vite@3.2.4/node_modules/vite-plugin-vue-markdown/dist/index.mjs";
import Unocss from "file:///home/kazi/Documents/website/node_modules/.pnpm/unocss@0.46.5_vite@3.2.4/node_modules/unocss/dist/vite.mjs";

// node/resolveBlog.ts
import { resolve } from "path";
import fs from "file:///home/kazi/Documents/website/node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/index.js";
import matter from "file:///home/kazi/Documents/website/node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js";
import dayjs from "file:///home/kazi/Documents/website/node_modules/.pnpm/dayjs@1.11.6/node_modules/dayjs/dayjs.min.js";
var __vite_injected_original_dirname = "/home/kazi/Documents/website/node";
var resolveBlogFile = (route) => {
  if (!route.path.startsWith("/posts") || route.path === "/posts")
    return;
  const path = resolve(__vite_injected_original_dirname, "..", route.component.slice(1));
  const md = fs.readFileSync(path, "utf-8");
  const { content, data } = matter(md);
  route.meta = Object.assign(route.meta || {}, {
    frontmatter: data,
    layout: "post",
    date: route.path.substring(7, 17),
    readingTime: readingTime(content)
  });
  return route;
};
var resolveBlogList = (routes) => {
  const blogs = routes.filter((item) => {
    var _a;
    return ((_a = item.meta) == null ? void 0 : _a.layout) === "post";
  }).map((item) => ({
    path: item.path,
    title: item.meta.frontmatter.title,
    date: item.meta.date
  })).sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
  return routes.map((item) => {
    const i = blogs.findIndex((blog) => blog.path === item.path);
    item.meta = {
      ...item.meta,
      prev: i < blogs.length ? blogs[i + 1] : null,
      next: i > 0 ? blogs[i - 1] : null
    };
    return item;
  });
};

// node/readingTime.ts
var getNumCN = (text) => {
  return (text.match(/[\u4E00-\u9FA5]/g) || []).length;
};
var getNumEN = (text) => {
  return (text.replace(/[\u4E00-\u9FA5]/g, "").match(
    /[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g
  ) || []).length;
};
var excludeCodeBlock = (text) => {
  return text.replace(/```[\s\S]*?```/g, "");
};
var excludeTexBlock = (text) => {
  return text.replace(/\$\$[\s\S]*?\$\$/g, "");
};
var readingTime = (text, options) => {
  options = options || {};
  options.wordsPerMinuteCN = options.wordsPerMinuteCN || 300;
  options.wordsPerMinuteEN = options.wordsPerMinuteEN || 200;
  if (options.excludeCodeBlock)
    text = excludeCodeBlock(text);
  if (options.excludeTexBlock)
    text = excludeTexBlock(text);
  const cntCN = getNumCN(text || "");
  const cntEN = getNumEN(text || "");
  let minutes = cntCN / options.wordsPerMinuteCN + cntEN / options.wordsPerMinuteEN;
  minutes = minutes < 1 ? 1 : Math.ceil(Number(minutes.toFixed(2)));
  return {
    minutes,
    words: cntCN + cntEN
  };
};

// node/installMarkdownPlugins.ts
import Shiki from "file:///home/kazi/Documents/website/node_modules/.pnpm/markdown-it-shiki@0.6.1/node_modules/markdown-it-shiki/dist/index.mjs";
import LinkAttributes from "file:///home/kazi/Documents/website/node_modules/.pnpm/markdown-it-link-attributes@4.0.1/node_modules/markdown-it-link-attributes/index.js";
import TOC from "file:///home/kazi/Documents/website/node_modules/.pnpm/markdown-it-table-of-contents@0.6.0/node_modules/markdown-it-table-of-contents/index.js";
import anchor from "file:///home/kazi/Documents/website/node_modules/.pnpm/markdown-it-anchor@8.6.5/node_modules/markdown-it-anchor/dist/markdownItAnchor.js";
import { slugify } from "file:///home/kazi/Documents/website/node_modules/.pnpm/@renovamen+utils@0.1.0/node_modules/@renovamen/utils/dist/index.mjs";
var installMarkdownPlugins = (md) => {
  md.use(Shiki, {
    theme: {
      light: "github-light",
      dark: "github-dark-dimmed"
    }
  });
  md.use(anchor, {
    slugify,
    permalink: anchor.permalink.linkInsideHeader({
      symbol: "#",
      renderAttrs: () => ({ "aria-hidden": "true" })
    })
  });
  md.use(LinkAttributes, {
    matcher: (link) => /^https?:\/\//.test(link),
    attrs: {
      target: "_blank",
      rel: "noopener"
    }
  });
  md.use(TOC, {
    includeLevel: [2, 3],
    slugify
  });
};

// vite.config.ts
var __vite_injected_original_dirname2 = "/home/kazi/Documents/website";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${resolve2(__vite_injected_original_dirname2, "src")}/`
    }
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true
    }),
    Pages({
      pagesDir: "pages",
      extensions: ["vue", "md"],
      extendRoute: (route) => resolveBlogFile(route),
      onRoutesGenerated: (routes) => resolveBlogList(routes)
    }),
    Layouts(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue/macros",
        "@vueuse/head",
        "@vueuse/core"
      ],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables"],
      vueTemplate: true
    }),
    Components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts"
    }),
    Unocss(),
    Markdown({
      wrapperClasses: "prose prose-lg m-auto text-left",
      headEnabled: true,
      markdownItSetup: (md) => installMarkdownPlugins(md)
    })
  ],
  ssgOptions: {
    script: "async",
    formatting: "minify",
    onFinished: () => generateSitemap()
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibm9kZS9yZXNvbHZlQmxvZy50cyIsICJub2RlL3JlYWRpbmdUaW1lLnRzIiwgIm5vZGUvaW5zdGFsbE1hcmtkb3duUGx1Z2lucy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2themkvRG9jdW1lbnRzL3dlYnNpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2themkvRG9jdW1lbnRzL3dlYnNpdGUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUva2F6aS9Eb2N1bWVudHMvd2Vic2l0ZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBWdWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IFBhZ2VzIGZyb20gXCJ2aXRlLXBsdWdpbi1wYWdlc1wiO1xuaW1wb3J0IGdlbmVyYXRlU2l0ZW1hcCBmcm9tIFwidml0ZS1zc2ctc2l0ZW1hcFwiO1xuaW1wb3J0IExheW91dHMgZnJvbSBcInZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzXCI7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcbmltcG9ydCBNYXJrZG93biBmcm9tIFwidml0ZS1wbHVnaW4tdnVlLW1hcmtkb3duXCI7XG5pbXBvcnQgVW5vY3NzIGZyb20gXCJ1bm9jc3Mvdml0ZVwiO1xuaW1wb3J0IHtcbiAgcmVzb2x2ZUJsb2dGaWxlLFxuICByZXNvbHZlQmxvZ0xpc3QsXG4gIGluc3RhbGxNYXJrZG93blBsdWdpbnNcbn0gZnJvbSBcIi4vbm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwifi9cIjogYCR7cmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpfS9gXG4gICAgfVxuICB9LFxuXG4gIHBsdWdpbnM6IFtcbiAgICBWdWUoe1xuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLFxuICAgICAgcmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZVxuICAgIH0pLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2hhbm5vZXJ1L3ZpdGUtcGx1Z2luLXBhZ2VzXG4gICAgUGFnZXMoe1xuICAgICAgcGFnZXNEaXI6IFwicGFnZXNcIixcbiAgICAgIGV4dGVuc2lvbnM6IFtcInZ1ZVwiLCBcIm1kXCJdLFxuICAgICAgZXh0ZW5kUm91dGU6IChyb3V0ZSkgPT4gcmVzb2x2ZUJsb2dGaWxlKHJvdXRlKSxcbiAgICAgIG9uUm91dGVzR2VuZXJhdGVkOiAocm91dGVzKSA9PiByZXNvbHZlQmxvZ0xpc3Qocm91dGVzKVxuICAgIH0pLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0pvaG5DYW1waW9uSnIvdml0ZS1wbHVnaW4tdnVlLWxheW91dHNcbiAgICBMYXlvdXRzKCksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tYXV0by1pbXBvcnRcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgXCJ2dWVcIixcbiAgICAgICAgXCJ2dWUtcm91dGVyXCIsXG4gICAgICAgIFwidnVlL21hY3Jvc1wiLFxuICAgICAgICBcIkB2dWV1c2UvaGVhZFwiLFxuICAgICAgICBcIkB2dWV1c2UvY29yZVwiXG4gICAgICBdLFxuICAgICAgZHRzOiBcInNyYy9hdXRvLWltcG9ydHMuZC50c1wiLFxuICAgICAgZGlyczogW1wic3JjL2NvbXBvc2FibGVzXCJdLFxuICAgICAgdnVlVGVtcGxhdGU6IHRydWVcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50c1xuICAgIENvbXBvbmVudHMoe1xuICAgICAgLy8gYWxsb3cgYXV0byBsb2FkIG1hcmtkb3duIGNvbXBvbmVudHMgdW5kZXIgYC4vc3JjL2NvbXBvbmVudHMvYFxuICAgICAgZXh0ZW5zaW9uczogW1widnVlXCIsIFwibWRcIl0sXG4gICAgICAvLyBhbGxvdyBhdXRvIGltcG9ydCBhbmQgcmVnaXN0ZXIgY29tcG9uZW50cyB1c2VkIGluIG1hcmtkb3duXG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLm1kJC9dLFxuICAgICAgZHRzOiBcInNyYy9jb21wb25lbnRzLmQudHNcIlxuICAgIH0pLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3Vub2Nzc1xuICAgIC8vIHNlZSB1bm9jc3MuY29uZmlnLnRzIGZvciBjb25maWdcbiAgICBVbm9jc3MoKSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlLXBsdWdpbi12dWUtbWFya2Rvd25cbiAgICAvLyBEb24ndCBuZWVkIHRoaXM/IFRyeSB2aXRlc3NlLWxpdGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlc3NlLWxpdGVcbiAgICBNYXJrZG93bih7XG4gICAgICB3cmFwcGVyQ2xhc3NlczogXCJwcm9zZSBwcm9zZS1sZyBtLWF1dG8gdGV4dC1sZWZ0XCIsXG4gICAgICBoZWFkRW5hYmxlZDogdHJ1ZSxcbiAgICAgIG1hcmtkb3duSXRTZXR1cDogKG1kKSA9PiBpbnN0YWxsTWFya2Rvd25QbHVnaW5zKG1kKVxuICAgIH0pXG4gIF0sXG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtc3NnXG4gIHNzZ09wdGlvbnM6IHtcbiAgICBzY3JpcHQ6IFwiYXN5bmNcIixcbiAgICBmb3JtYXR0aW5nOiBcIm1pbmlmeVwiLFxuICAgIG9uRmluaXNoZWQ6ICgpID0+IGdlbmVyYXRlU2l0ZW1hcCgpXG4gIH1cbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9rYXppL0RvY3VtZW50cy93ZWJzaXRlL25vZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2themkvRG9jdW1lbnRzL3dlYnNpdGUvbm9kZS9yZXNvbHZlQmxvZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9rYXppL0RvY3VtZW50cy93ZWJzaXRlL25vZGUvcmVzb2x2ZUJsb2cudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnMtZXh0cmFcIjtcbmltcG9ydCBtYXR0ZXIgZnJvbSBcImdyYXktbWF0dGVyXCI7XG5pbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5pbXBvcnQgeyByZWFkaW5nVGltZSB9IGZyb20gXCIuXCI7XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlQmxvZ0ZpbGUgPSAocm91dGU6IGFueSkgPT4ge1xuICBpZiAoIXJvdXRlLnBhdGguc3RhcnRzV2l0aChcIi9wb3N0c1wiKSB8fCByb3V0ZS5wYXRoID09PSBcIi9wb3N0c1wiKSByZXR1cm47XG5cbiAgY29uc3QgcGF0aCA9IHJlc29sdmUoX19kaXJuYW1lLCBcIi4uXCIsIHJvdXRlLmNvbXBvbmVudC5zbGljZSgxKSk7XG4gIGNvbnN0IG1kID0gZnMucmVhZEZpbGVTeW5jKHBhdGgsIFwidXRmLThcIik7XG4gIGNvbnN0IHsgY29udGVudCwgZGF0YSB9ID0gbWF0dGVyKG1kKTtcblxuICByb3V0ZS5tZXRhID0gT2JqZWN0LmFzc2lnbihyb3V0ZS5tZXRhIHx8IHt9LCB7XG4gICAgZnJvbnRtYXR0ZXI6IGRhdGEsXG4gICAgbGF5b3V0OiBcInBvc3RcIixcbiAgICBkYXRlOiByb3V0ZS5wYXRoLnN1YnN0cmluZyg3LCAxNyksXG4gICAgcmVhZGluZ1RpbWU6IHJlYWRpbmdUaW1lKGNvbnRlbnQpXG4gIH0pO1xuXG4gIHJldHVybiByb3V0ZTtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlQmxvZ0xpc3QgPSAocm91dGVzOiBhbnlbXSkgPT4ge1xuICBjb25zdCBibG9ncyA9IHJvdXRlc1xuICAgIC5maWx0ZXIoKGl0ZW06IGFueSkgPT4gaXRlbS5tZXRhPy5sYXlvdXQgPT09IFwicG9zdFwiKVxuICAgIC5tYXAoKGl0ZW06IGFueSkgPT4gKHtcbiAgICAgIHBhdGg6IGl0ZW0ucGF0aCxcbiAgICAgIHRpdGxlOiBpdGVtLm1ldGEuZnJvbnRtYXR0ZXIudGl0bGUsXG4gICAgICBkYXRlOiBpdGVtLm1ldGEuZGF0ZVxuICAgIH0pKVxuICAgIC5zb3J0KChhOiBhbnksIGI6IGFueSkgPT4gZGF5anMoYi5kYXRlKS51bml4KCkgLSBkYXlqcyhhLmRhdGUpLnVuaXgoKSk7XG5cbiAgcmV0dXJuIHJvdXRlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICBjb25zdCBpID0gYmxvZ3MuZmluZEluZGV4KChibG9nKSA9PiBibG9nLnBhdGggPT09IGl0ZW0ucGF0aCk7XG5cbiAgICBpdGVtLm1ldGEgPSB7XG4gICAgICAuLi5pdGVtLm1ldGEsXG4gICAgICBwcmV2OiBpIDwgYmxvZ3MubGVuZ3RoID8gYmxvZ3NbaSArIDFdIDogbnVsbCxcbiAgICAgIG5leHQ6IGkgPiAwID8gYmxvZ3NbaSAtIDFdIDogbnVsbFxuICAgIH07XG5cbiAgICByZXR1cm4gaXRlbTtcbiAgfSk7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9rYXppL0RvY3VtZW50cy93ZWJzaXRlL25vZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2themkvRG9jdW1lbnRzL3dlYnNpdGUvbm9kZS9yZWFkaW5nVGltZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9rYXppL0RvY3VtZW50cy93ZWJzaXRlL25vZGUvcmVhZGluZ1RpbWUudHNcIjtleHBvcnQgaW50ZXJmYWNlIFJlYWRpbmdUaW1lT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgQ2hpbmVzZSB3b3JkcyBwZXIgbWludXRlIGEgdXNlciBjYW4gcmVhZFxuICAgKlxuICAgKiBAZGVmYXVsdCAzMDBcbiAgICovXG4gIHdvcmRzUGVyTWludXRlQ04/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBFbmdsaXNoIHdvcmRzIHBlciBtaW51dGUgYSB1c2VyIGNhbiByZWFkXG4gICAqXG4gICAqIEBkZWZhdWx0IDIwMFxuICAgKi9cbiAgd29yZHNQZXJNaW51dGVFTj86IG51bWJlcjtcblxuICAvKipcbiAgICogRXhjbHVkZXMgYWxsIGNvbnRlbnQgaW5zaWRlIGNvZGUgYmxvY2tzIG9yIG5vdFxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZXhjbHVkZUNvZGVCbG9jaz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4Y2x1ZGVzIGFsbCBjb250ZW50IGluc2lkZSB0ZXggYmxvY2tzIG9yIG5vdFxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZXhjbHVkZVRleEJsb2NrPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFkaW5nVGltZSB7XG4gIC8qKlxuICAgKiBFeHBlY3QgcmVhZGluZyB0aW1lIChudW1iZXIgb2YgbWludXRlcylcbiAgICovXG4gIG1pbnV0ZXM6IG51bWJlcjtcbiAgLyoqXG4gICAqIE51bWJlciBvZiB3b3JkcyBvZiB0aGUgcGFnZVxuICAgKi9cbiAgd29yZHM6IG51bWJlcjtcbn1cblxuY29uc3QgZ2V0TnVtQ04gPSAodGV4dDogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuICh0ZXh0Lm1hdGNoKC9bXFx1NEUwMC1cXHU5RkE1XS9nKSB8fCBbXSkubGVuZ3RoO1xufTtcblxuY29uc3QgZ2V0TnVtRU4gPSAodGV4dDogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIChcbiAgICB0ZXh0XG4gICAgICAucmVwbGFjZSgvW1xcdTRFMDAtXFx1OUZBNV0vZywgXCJcIilcbiAgICAgIC5tYXRjaChcbiAgICAgICAgL1thLXpBLVowLTlfXFx1MDM5Mi1cXHUwM2M5XFx1MDQwMC1cXHUwNEZGXSt8W1xcdTRFMDAtXFx1OUZGRlxcdTM0MDAtXFx1NGRiZlxcdWY5MDAtXFx1ZmFmZlxcdTMwNDAtXFx1MzA5ZlxcdWFjMDAtXFx1ZDdhZlxcdTA0MDAtXFx1MDRGRl0rfFtcXHUwMEU0XFx1MDBDNFxcdTAwRTVcXHUwMEM1XFx1MDBGNlxcdTAwRDZdK3xcXHcrL2dcbiAgICAgICkgfHwgW11cbiAgKS5sZW5ndGg7XG59O1xuXG5jb25zdCBleGNsdWRlQ29kZUJsb2NrID0gKHRleHQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL2BgYFtcXHNcXFNdKj9gYGAvZywgXCJcIik7XG59O1xuXG5jb25zdCBleGNsdWRlVGV4QmxvY2sgPSAodGV4dDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvXFwkXFwkW1xcc1xcU10qP1xcJFxcJC9nLCBcIlwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZWFkaW5nVGltZSA9IChcbiAgdGV4dDogc3RyaW5nLFxuICBvcHRpb25zPzogUmVhZGluZ1RpbWVPcHRpb25zXG4pOiBSZWFkaW5nVGltZSA9PiB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIC8vIHVzZSBkZWZhdWx0IHZhbHVlcyBpZiBuZWNlc3NhcnlcbiAgb3B0aW9ucy53b3Jkc1Blck1pbnV0ZUNOID0gb3B0aW9ucy53b3Jkc1Blck1pbnV0ZUNOIHx8IDMwMDtcbiAgb3B0aW9ucy53b3Jkc1Blck1pbnV0ZUVOID0gb3B0aW9ucy53b3Jkc1Blck1pbnV0ZUVOIHx8IDIwMDtcblxuICAvLyBleGNsdWRlIGFsbCBjb250ZW50IGluc2lkZSBjb2RlIGJsb2Nrc1xuICBpZiAob3B0aW9ucy5leGNsdWRlQ29kZUJsb2NrKSB0ZXh0ID0gZXhjbHVkZUNvZGVCbG9jayh0ZXh0KTtcbiAgLy8gZXhjbHVkZSBhbGwgY29udGVudCBpbnNpZGUgdGV4IGJsb2Nrc1xuICBpZiAob3B0aW9ucy5leGNsdWRlVGV4QmxvY2spIHRleHQgPSBleGNsdWRlVGV4QmxvY2sodGV4dCk7XG5cbiAgLy8gbnVtYmVyIG9mIGNoaW5lc2Ugd29yZHMgYW5kIGVuZ2xpc2ggd29yZHNcbiAgY29uc3QgY250Q04gPSBnZXROdW1DTih0ZXh0IHx8IFwiXCIpO1xuICBjb25zdCBjbnRFTiA9IGdldE51bUVOKHRleHQgfHwgXCJcIik7XG5cbiAgLy8gY29tcHV0ZSByZWFkaW5nIHRpbWVcbiAgbGV0IG1pbnV0ZXMgPVxuICAgIGNudENOIC8gb3B0aW9ucy53b3Jkc1Blck1pbnV0ZUNOICsgY250RU4gLyBvcHRpb25zLndvcmRzUGVyTWludXRlRU47XG4gIG1pbnV0ZXMgPSBtaW51dGVzIDwgMSA/IDEgOiBNYXRoLmNlaWwoTnVtYmVyKG1pbnV0ZXMudG9GaXhlZCgyKSkpO1xuXG4gIHJldHVybiB7XG4gICAgbWludXRlcyxcbiAgICB3b3JkczogY250Q04gKyBjbnRFTlxuICB9O1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUva2F6aS9Eb2N1bWVudHMvd2Vic2l0ZS9ub2RlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9rYXppL0RvY3VtZW50cy93ZWJzaXRlL25vZGUvaW5zdGFsbE1hcmtkb3duUGx1Z2lucy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9rYXppL0RvY3VtZW50cy93ZWJzaXRlL25vZGUvaW5zdGFsbE1hcmtkb3duUGx1Z2lucy50c1wiO2ltcG9ydCBTaGlraSBmcm9tIFwibWFya2Rvd24taXQtc2hpa2lcIjtcbmltcG9ydCBMaW5rQXR0cmlidXRlcyBmcm9tIFwibWFya2Rvd24taXQtbGluay1hdHRyaWJ1dGVzXCI7XG4vLyBAdHMtZXhwZWN0LWVycm9yIG1pc3NpbmcgdHlwZXNcbmltcG9ydCBUT0MgZnJvbSBcIm1hcmtkb3duLWl0LXRhYmxlLW9mLWNvbnRlbnRzXCI7XG5pbXBvcnQgYW5jaG9yIGZyb20gXCJtYXJrZG93bi1pdC1hbmNob3JcIjtcbmltcG9ydCB0eXBlIE1hcmtkb3duSXQgZnJvbSBcIm1hcmtkb3duLWl0XCI7XG5pbXBvcnQgeyBzbHVnaWZ5IH0gZnJvbSBcIkByZW5vdmFtZW4vdXRpbHNcIjtcblxuZXhwb3J0IGNvbnN0IGluc3RhbGxNYXJrZG93blBsdWdpbnMgPSAobWQ6IE1hcmtkb3duSXQpID0+IHtcbiAgbWQudXNlKFNoaWtpLCB7XG4gICAgdGhlbWU6IHtcbiAgICAgIGxpZ2h0OiBcImdpdGh1Yi1saWdodFwiLFxuICAgICAgZGFyazogXCJnaXRodWItZGFyay1kaW1tZWRcIlxuICAgIH1cbiAgfSk7XG5cbiAgbWQudXNlKGFuY2hvciwge1xuICAgIHNsdWdpZnksXG4gICAgcGVybWFsaW5rOiBhbmNob3IucGVybWFsaW5rLmxpbmtJbnNpZGVIZWFkZXIoe1xuICAgICAgc3ltYm9sOiBcIiNcIixcbiAgICAgIHJlbmRlckF0dHJzOiAoKSA9PiAoeyBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiIH0pXG4gICAgfSlcbiAgfSk7XG5cbiAgbWQudXNlKExpbmtBdHRyaWJ1dGVzLCB7XG4gICAgbWF0Y2hlcjogKGxpbms6IHN0cmluZykgPT4gL15odHRwcz86XFwvXFwvLy50ZXN0KGxpbmspLFxuICAgIGF0dHJzOiB7XG4gICAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgICByZWw6IFwibm9vcGVuZXJcIlxuICAgIH1cbiAgfSk7XG5cbiAgbWQudXNlKFRPQywge1xuICAgIGluY2x1ZGVMZXZlbDogWzIsIDNdLFxuICAgIHNsdWdpZnlcbiAgfSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUSxTQUFTLFdBQUFBLGdCQUFlO0FBQzlSLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sY0FBYztBQUNyQixPQUFPLFlBQVk7OztBQ1RrUSxTQUFTLGVBQWU7QUFDN1MsT0FBTyxRQUFRO0FBQ2YsT0FBTyxZQUFZO0FBQ25CLE9BQU8sV0FBVztBQUhsQixJQUFNLG1DQUFtQztBQU1sQyxJQUFNLGtCQUFrQixDQUFDLFVBQWU7QUFDN0MsTUFBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLFFBQVEsS0FBSyxNQUFNLFNBQVM7QUFBVTtBQUVqRSxRQUFNLE9BQU8sUUFBUSxrQ0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLENBQUMsQ0FBQztBQUM5RCxRQUFNLEtBQUssR0FBRyxhQUFhLE1BQU0sT0FBTztBQUN4QyxRQUFNLEVBQUUsU0FBUyxLQUFLLElBQUksT0FBTyxFQUFFO0FBRW5DLFFBQU0sT0FBTyxPQUFPLE9BQU8sTUFBTSxRQUFRLENBQUMsR0FBRztBQUFBLElBQzNDLGFBQWE7QUFBQSxJQUNiLFFBQVE7QUFBQSxJQUNSLE1BQU0sTUFBTSxLQUFLLFVBQVUsR0FBRyxFQUFFO0FBQUEsSUFDaEMsYUFBYSxZQUFZLE9BQU87QUFBQSxFQUNsQyxDQUFDO0FBRUQsU0FBTztBQUNUO0FBRU8sSUFBTSxrQkFBa0IsQ0FBQyxXQUFrQjtBQUNoRCxRQUFNLFFBQVEsT0FDWCxPQUFPLENBQUMsU0FBVztBQXpCeEI7QUF5QjJC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
