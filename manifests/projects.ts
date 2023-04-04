import { Project, TechStack } from "./@types";

export const projectManifest = new Map<string, Project>([
  [
    "illume-os",
    {
      title: "illume OS",
      subtitle: "Linux distribution targeted at older hardware",
      status: "inactive",
      duration: {
        start: "2011",
        end: "2017"
      },
      links: {
        website: "https://illume-os.firebaseapp.com/"
      },
      stack: [
        TechStack.Shell,
        TechStack.HTML,
        TechStack.JavaScript
      ],
      filePath: "illume-os.md",
      tags: ["linux", "distribution", "icewm", "debian"]
    }
  ],
  [
    "antorca-linux",
    {
      title: "Antorca Linux",
      subtitle: "More polished rebranding and continuation of illume OS",
      status: "inactive",
      duration: {
        start: "2017",
        end: "2019"
      },
      links: {
        website: "https://antorca.github.io/linux/"
      },
      assets: {
        screenshots: ["/antorca_linux.png"]
      },
      stack: [
        TechStack.Shell,
        TechStack.HTML,
        TechStack.JavaScript
      ],
      filePath: "antorca-linux.md",
      tags: [
        "linux",
        "distribution",
        "xfce",
        "debian",
        "ubuntu"
      ]
    }
  ],
  [
    "transitsafe",
    {
      title: "TransitSafe",
      subtitle: "Public transport alerts for the little things",
      status: "inactive",
      duration: {
        start: "2017",
        end: "2019"
      },
      stack: [
        TechStack.Swift,
        TechStack.UIKit
      ],
      filePath: "transitsafe.md",
      tags: [
        "ios",
        "apps",
        "swift",
        "uikit",
        "university"
      ]
    }
  ],
  [
    "website",
    {
      title: "Website",
      subtitle: "This very website",
      status: "active",
      duration: {
        start: "2015",
        end: "Present"
      },
      stack: [
        TechStack.JavaScript,
        TechStack.TypeScript,
        TechStack.React,
        TechStack.NextJS,
        TechStack.SvelteKit,
        TechStack.VueJS
      ],
      filePath: "website.md",
      tags: [
        "webdev",
        "javascript",
        "typescript",
        "react",
        "nextjs",
        "svelte", "sveltekit",
        "vuejs",
        "firebase",
        "cms"
      ]
    }
  ],
  [
    "md2magic",
    {
      title: "md2magic",
      subtitle: "Experimental toy static site generator",
      status: "inactive",
      duration: {
        start: "2018",
        end: "2020"
      },
      links: {
        repository: "https://github.com/csiew/md2magic"
      },
      stack: [
        TechStack.Python,
        TechStack.Shell,
        TechStack.HTML
      ],
      filePath: "md2magic.md",
      tags: [
        "experimental",
        "python",
        "ssg"
      ]
    }
  ],
  [
    "cardo",
    {
      title: "Cardo",
      subtitle: "Experimental client-side frontend library",
      status: "inactive",
      duration: {
        start: "2020",
        end: "2020"
      },
      stack: [
        TechStack.JavaScript,
        TechStack.HTML
      ],
      filePath: "cardo.md",
      tags: [
        "experimental",
        "javascript",
        "library"
      ]
    }
  ],
  [
    "podzol",
    {
      title: "Podzol",
      subtitle: "Podcasts in your terminal",
      status: "active",
      duration: {
        start: "2020",
        end: "Present"
      },
      links: {
        repository: "https://github.com/csiew/Podzol"
      },
      stack: [
        TechStack.Python
      ],
      filePath: "podzol.md",
      tags: [
        "podcasts",
        "python",
        "json"
      ]
    }
  ],
  [
    "biscuitwm",
    {
      title: "BiscuitWM",
      subtitle: "Experimental window manager based on the Python version of TinyWM",
      status: "inactive",
      duration: {
        start: "2020",
        end: "2021"
      },
      links: {
        website: "https://csiew.github.io/BiscuitWM",
        repository: "https://github.com/csiew/BiscuitWM"
      },
      assets: {
        screenshots: ["/biscuitwm.png"]
      },
      stack: [
        TechStack.Python
      ],
      filePath: "biscuitwm.md",
      tags: [
        "experimental",
        "python",
        "windowmanager",
        "linux",
        "x11"
      ]
    }
  ],
  [
    "hoddle",
    {
      title: "Hoddle",
      subtitle: "Toy window manager within a web page",
      status: "inactive",
      duration: {
        start: "2020",
        end: "2020"
      },
      links: {
        website: "https://csiew.github.io/Hoddle",
        repository: "https://github.com/csiew/Hoddle"
      },
      assets: {
        screenshots: ["/hoddle.png"]
      },
      stack: [
        TechStack.JavaScript,
        TechStack.HTML
      ],
      filePath: "hoddle.md",
      tags: [
        "experimental",
        "javascript",
        "library"
      ]
    }
  ],
  [
    "cast",
    {
      title: "Cast",
      subtitle: "Podcast web app",
      status: "inactive",
      duration: {
        start: "2020",
        end: "2021"
      },
      assets: {
        screenshots: ["/cast.png"]
      },
      stack: [
        TechStack.JavaScript,
        TechStack.VueJS
      ],
      filePath: "cast.md",
      tags: [
        "podcasts",
        "webdev",
        "node",
        "javascript",
        "vuejs",
        "ejs"
      ]
    }
  ],
  [
    "brioche",
    {
      title: "Brioche",
      subtitle: "UI library for React projects",
      status: "inactive",
      duration: {
        start: "2020",
        end: "2021"
      },
      links: {
        website: "https://www.npmjs.com/package/brioche",
        repository: "https://github.com/csiew/brioche"
      },
      stack: [
        TechStack.JavaScript,
        TechStack.React
      ],
      filePath: "brioche.md",
      tags: [
        "react",
        "javascript",
        "library"
      ]
    }
  ]
]);
