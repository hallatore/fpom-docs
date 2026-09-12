import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";
import { imageComparerPlugin } from "./plugins/image-comparer.js";

const sidebarOptions = {
  /*
   * For detailed instructions, see the links below:
   * https://vitepress-sidebar.cdget.com/guide/options
   */
  //
  // ============ [ RESOLVING PATHS ] ============
  // documentRootPath: '/',
  // scanStartPath: null,
  // resolvePath: null,
  // basePath: null,
  //
  // ============ [ GROUPING ] ============
  // collapsed: true,
  // collapseDepth: 2,
  // rootGroupText: 'Contents',
  // rootGroupLink: 'https://github.com/jooy2',
  // rootGroupCollapsed: false,
  //
  // ============ [ GETTING MENU TITLE ] ============
  // useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  // useFolderLinkFromIndexFile: false,
  // useFolderTitleFromIndexFile: false,
  // frontmatterTitleFieldName: 'title',
  //
  // ============ [ GETTING MENU LINK ] ============
  // useFolderLinkFromSameNameSubFile: false,
  useFolderLinkFromIndexFile: true,
  // folderLinkNotIncludesFileName: false,
  //
  // ============ [ INCLUDE / EXCLUDE ] ============
  excludePattern: ["README.md"],
  // excludeFilesByFrontmatterFieldName: 'exclude',
  // includeDotFiles: false,
  // includeEmptyFolder: false,
  // includeRootIndexFile: false,
  // includeFolderIndexFile: false,
  //
  // ============ [ STYLING MENU TITLE ] ============
  // hyphenToSpace: true,
  // underscoreToSpace: true,
  // capitalizeFirst: false,
  // capitalizeEachWords: false,
  // keepMarkdownSyntaxFromTitle: false,
  // removePrefixAfterOrdering: false,
  // prefixSeparator: '.',
  //
  // ============ [ SORTING ] ============
  // manualSortFileNameByPriority: ['first.md', 'second', 'third.md'],
  // sortFolderTo: null,
  // sortMenusByName: false,
  // sortMenusByFileDatePrefix: false,
  sortMenusByFrontmatterOrder: true,
  frontmatterOrderDefaultValue: 9999,
  // sortMenusByFrontmatterDate: false,
  // sortMenusOrderByDescending: false,
  // sortMenusOrderNumericallyFromTitle: false,
  // sortMenusOrderNumericallyFromLink: false,
  //
  // ============ [ MISC ] ============
  // debugPrint: false,
};

// https://vitepress.dev/reference/site-config
export default defineConfig(
  withSidebar(
    {
      title: "FPOM",
      description:
        "FPOM Documentation - Fast parallax occlusion mapping for Unreal Engine 5",
      head: [
        ["link", { rel: "icon", href: "/favicon.ico" }],
        [
          "meta",
          {
            property: "og:title",
            content:
              "FPOM - Fast parallax occlusion mapping for Unreal Engine 5",
          },
        ],
        [
          "meta",
          {
            property: "og:description",
            content:
              "FPOM brings fast parallax occlusion mapping to Unreal Engine 5 materials.",
          },
        ],
        [
          "meta",
          {
            property: "og:image",
            content: "https://fpom.lervik.com/thumb.jpg",
          },
        ],
        [
          "meta",
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
        ],
        [
          "meta",
          {
            name: "twitter:title",
            content:
              "FPOM - Fast parallax occlusion mapping for Unreal Engine 5",
          },
        ],
        [
          "meta",
          {
            name: "twitter:description",
            content:
              "FPOM brings fast parallax occlusion mapping to Unreal Engine 5 materials.",
          },
        ],
        [
          "meta",
          {
            name: "twitter:image",
            content: "https://fpom.lervik.com/Logo.jpg",
          },
        ],
      ],
      appearance: "force-dark",
      markdown: {
        config: (md) => {
          md.use(imageComparerPlugin);
        },
      },
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: "Home", link: "/" },
          {
            text: "Fab",
            link: "https://www.fab.com/listings/f56aea7a-337f-4b6a-8333-9e4739574370",
          },
          { text: "Discord", link: "https://discord.gg/sX48CssHWM" },
        ],
        search: {
          provider: "local",
        },
        outline: {
          level: [2, 3],
        },
        cleanUrls: true,
      },
    },
    sidebarOptions,
  ),
);
