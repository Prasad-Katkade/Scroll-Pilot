# Scroll Nav & Indicator

Scroll Nav Indicator is a React.js library designed to enhance web page accessibility. It provides a scroll indicator that visualizes how much a user has scrolled and offers easy navigation options for moving between sections on a web page.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Features

- **Scroll Indicator:** A visual representation of the user's scrolling progress.
- **Section Navigation:** Easily navigate between different sections of a web page.
- **Customization:** Customize the component to match your website's design and requirements.
- **Built on React.js and Material-UI:** Utilizes the power of React.js and Material-UI for seamless integration into your web projects.

## Installation

You can install the Scroll Nav Indicator library using npm:

```sh
npm install scroll-nav-indicator
```

## How to use ?

Simply import the **ScrollPilot** from **scroll-nav-indicator**

```jsx static
import { ScrollPilot } from 'scroll-nav-indicator';

function App() {
  return (
    <div>
      {/* Your content here */}
      <ScrollPilot />
      {/* More content */}
    </div>
  );
}
```

## Configuration and Props

You can fully customize the **ScrollPilot** Component

```jsx static
// Sections list contains Label and Section ID
const sections = [
  {
    label: "Section 1",
    section: "#section1"
  },
  {
    label: "Section 2",
    section: "#section2"
  }
];

const config = {
  index: sections, // Pass your sections list here
  getScrollCompletionVal: (val) => {}, // Returns the value of scrolling progress (ranging between 1 - 100)
  onNavClicked: (val) => {}, // Callback function triggered when the user clicks on a navigation link from the popup
  aesthetics: {
    icon: <>Hi !</>, // Displays an icon at the center of the indicator
    tooltipTxt: "", // Shows text on hover over the indicator
    location: "bottom-right", // Sets the position of the indicator and navigation popup
    size: 50, // Sets the size of the indicator
    hideOnScroll: true, // Hides the indicator while the user is scrolling
    indicatorBackgroundColor: "#ffffff", // Sets the background color of the indicator
    indicatorProgressColor: "#181818", // Sets the progress color of the indicator
    margins: {
      // Applies margins from the sides (e.g., if the location is "bottom-right", it will apply 80px from the bottom and right side)
      desktop: 80,
      mobile: 40 // Customize margins for responsive design
    },
    popupWidths: {
      // Sets the width for the navigation popup
      desktop: "200px",
      mobile: "180px"
    },
    popupBackgroundColor: "#ffffff", // Sets the background color of the navigation popup
    popupLinksColor: "#181818" // Sets the color for navigation links inside the popup
  }
};

// Pass config as a prop to the component
function App() {
  return (
    <div>
      {/* Your content here */}
      <ScrollPilot config={config} />
    </div>
  );
}
```

## Configuration Details

| Attribute                 | Type                  | Default Value | Description                                                             |
|---------------------------|-----------------------|---------------|-------------------------------------------------------------------------|
| index                     | Array of objects     | []            | Builds an index based on your sections and displays it in a popup when clicked on the indicator. Links will navigate to sections based on given section IDs. |
| getScrollCompletionVal()  | Function              | ()            | Provides the value (%) of the user's scrolling progress, ranging between 1 - 100. |
| onNavClicked()            | Function              | ()            | Callback function triggered when the user clicks on a navigation link from the popup. |
| icon                      | HTML Content          | <>Hi !</>     | Displays provided HTML content (e.g., text, images, SVG, and icons) at the center of the indicator. |
| location                  | String                |"bottom-right" | Applies position to indicator, you can specify any value between these <br>1] top-left <br>2] top-right <br>3] bottom-left <br>4] bottom-right |
| tooltipTxt                | String                | " "           | Shows the given tooltip text on hover over the indicator. |
| size                      | Number or String      | 50            | The size of the indicator. You can specify it as a number with a pixel unit or as a string with a CSS unit (e.g., '3rem'). |
| hideOnScroll              | Boolean               | True          | Hides the indicator while the user is scrolling. |
| indicatorBackgroundColor   | String                | #FFFFFF       | Changes the background color of the indicator. |
| indicatorProgressColor    | String                | #181818       | Changes the circular progress color of the indicator. |
| margins                   | Object {desktop, mobile} | {desktop: 80, mobile: 40} | Applies margins from the sides based on the given location (e.g., "bottom-right"). Desktop and mobile attributes are provided to maintain margin based on devices. |
| popupWidths               | Object {desktop, mobile} | {desktop: "200px", mobile: "180px"} | Sets the width of the navigation popup. Desktop and mobile attributes are provided to maintain width based on devices. |
| popupBackgroundColor       | String                | #FFFFFF       | Changes the background color of the navigation popup. |
| popupLinksColor           | String                | #181818       | Changes the color of navigation links inside the popup. |

