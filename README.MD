# UNiFEST

**A campus events hub for FAST-NUCES Islamabad**

UNiFEST is a responsive, multi-page website concept that brings university events, campus societies, announcements, and event-planning resources together in one place. This project was created as the final project for the Introduction to Information and Communication Technology (IICT) course.

## Project information

|                       |                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------- |
| **Course**            | Introduction to Information and Communication Technology (IICT)                    |
| **University**        | FAST National University of Computer and Emerging Sciences (FAST-NUCES), Islamabad |
| **Program and batch** | BS Artificial Intelligence, 2026 Batch                                             |
| **Project**           | UNiFEST — University Events Website                                                |

## Features

- **Home:** featured events and announcements, a countdown, a winners carousel, and a sample team-registration form.
- **Events:** browse events by category and open a modal with event details.
- **News:** explore department news through tabs and expandable articles, with a campus photo gallery and sponsor section.
- **Societies:** view society leads, browse a society directory, and see a sample events schedule.
- **Resources:** explore venue information, event-planning guidance, downloadable templates, and an interactive FAQ.
- **Contact:** find campus contact and location information, and try the feedback and event-proposal forms.
- **Shared interface:** responsive navigation, light/dark theme toggle, dialogs, and keyboard-friendly tab controls.

## Technology

- HTML5
- Sass (SCSS) and CSS
- Vanilla JavaScript
- [Parcel](https://parceljs.org/) for the development server and production bundling
- Sass, PostCSS, Autoprefixer, and cssnano for stylesheet compilation and optimization
- Google Fonts and Ionicons for typography and icons

## Getting started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm.

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run start
```

This compiles the Sass styles, watches for style changes, and starts the Parcel development server. Open the local URL printed by Parcel in your terminal.

### Build for production

```bash
npm run build
```

The production build compiles, prefixes, and minifies the CSS, then bundles the site into `dist/`.

### Other available commands

| Command                | Purpose                                                       |
| ---------------------- | ------------------------------------------------------------- |
| `npm run serve`        | Start Parcel for the home page and the pages in `src/pages/`. |
| `npm run sass:dev`     | Compile Sass into `src/styles/css/` for development.          |
| `npm run watch:sass`   | Watch Sass files and recompile on changes.                    |
| `npm run compile:css`  | Compile Sass without source maps.                             |
| `npm run prefix:css`   | Add browser prefixes to the compiled CSS.                     |
| `npm run compress:css` | Minify the compiled CSS.                                      |
| `npm run build:css`    | Compile, prefix, and minify the CSS.                          |
| `npm run build:site`   | Bundle the HTML pages and site assets into `dist/`.           |

## Project structure

```text
.
├── index.html                 # Home page
├── src/
│   ├── pages/                 # News, events, societies, resources, and contact
│   ├── scripts/               # Page interactions and shared behavior
│   ├── styles/
│   │   ├── sass/              # Sass source files
│   │   └── css/               # Compiled stylesheets
│   ├── images/                # Logos, event photography, and other imagery
│   └── files/                 # Downloadable event-planning templates
├── package.json               # Dependencies and development/build commands
└── dist/                      # Generated production site
```

## Project team

| Name           | Roll number | Role        |
| -------------- | ----------- | ----------- |
| Abdul Basit    | 26i-0082    | Team leader |
| Haffad Hussain | 26i-0065    | Team member |
| Faiq Munir     | 26i-0088    | Team member |

## Scope and limitations

UNiFEST is a front-end academic project. Page content, event listings, and society details are provided as static example content. Forms demonstrate client-side validation and confirmation states only: they do not send or save submissions, process payments, or upload files to a server. A backend and any required integrations would need to be added before using the site for real registrations or event operations.
