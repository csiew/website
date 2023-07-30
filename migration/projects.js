const fs = require("fs");
const { Pool } = require("pg");
const { v4 } = require("uuid");
const config = require("./config");

const manifest = [
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
        "Shell",
        "HTML",
        "JavaScript"
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
        "Shell",
        "HTML",
        "JavaScript"
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
        "Swift",
        "UIKit"
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
        "JavaScript",
        "TypeScript",
        "React",
        "NextJS",
        "SvelteKit",
        "VueJS"
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
        "Python",
        "Shell",
        "HTML"
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
        "JavaScript",
        "HTML"
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
        "Python"
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
      status: "hiatus",
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
        "Python"
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
        "JavaScript",
        "HTML"
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
      status: "hiatus",
      duration: {
        start: "2020",
        end: "2021"
      },
      assets: {
        screenshots: ["/cast.png"]
      },
      stack: [
        "JavaScript",
        "VueJS"
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
        "JavaScript",
        "React"
      ],
      filePath: "brioche.md",
      tags: [
        "react",
        "javascript",
        "library"
      ]
    }
  ],
  [
    "brioche",
    {
      title: "Tab Shelf",
      subtitle: "Manage your Chrome tabs from the side panel",
      status: "active",
      duration: {
        start: "2023",
      },
      links: {
        website: "https://tabshelf.clarencesiew.com",
      },
      stack: [
        "TypeScript",
        "React",
      ],
      filePath: "tab-shelf.md",
      tags: [
        "react",
        "typescript",
        "extension",
        "chrome"
      ]
    }
  ]
];

const projects = [];
const manifestFormatted = manifest.map((m) => ({
  ...m[1],
  urlSlug: m[0]
}));

for (const projectManifest of manifestFormatted) {
  const project = { ...projectManifest };
  const content = fs.readFileSync(`content/projects/${project.filePath}`, { encoding: "utf-8" });
  project.body = btoa(content);
  delete project["filePath"];
  projects.push(project);
}

const pool = new Pool(config);

Promise.all(
  projects.map((project) => {
    return pool.query(
      "INSERT INTO public.item (id, content_type, body) VALUES ($1, $2, $3)",
      [v4(), "project", project]
    );
  })
);
