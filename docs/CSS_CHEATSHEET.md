## CSS Cheatsheet

### Global Variables & Base Styles

These are defined in your `:root` selector and applied globally or as base styles for the `body` and `#app`.

* **Default Fonts:**
    * `font-family: 'Roboto', sans-serif;`
    * Imported Fonts: `Josefin Sans`, `Quicksand` (via Google Fonts URL)
* **Base Text:**
    * `line-height: 1.25;`
    * `font-weight: 400;`
    * `color-scheme: light dark;`
* **Default Page Colors (Light Mode):**
    * `color: #26282d;` (Default text color)
    * `background-color: #cdcaca;` (Default background)

---

#### Custom CSS Variables (`--CC-` prefix)

These are your custom design tokens. Use them with `var(--CC-variable-name)`.

* **Fonts:**
    * `--CC-font-family: 'Roboto', sans-serif;`
* **Colors:**
    * `--CC-color-blue: #024d7c;`
    * `--CC-color-blue-light: #eef7fe;`
    * `--CC-color-blue-dark: #002d4c;`
    * `--CC-color-blue-gray: #b0c4d4;`
    * `--CC-color-gray: #b0b0b0;`
    * `--CC-color-gray-light: #f0f0f0;`
    * `--CC-color-gray-dark: #7d7d7d;`
    * `--CC-color-gray-darker: #4d4d4d;`
    * `--CC-color-focus: #21d795;`
    * `--CC-color-focus-light: #98f0d6;`
    * `--CC-color-required: #a41d33;`
    * `--CC-color-success: #4caf50;`
    * `--CC-color-warning: #ff9800;`
    * `--CC-color-error: #f44336;`
    * `--CC-color-text: #26282d;`
    * `--CC-color-text-light: #f0f0f0;`
    * `--CC-color-green-light: #d4f0d6;`
    * `--CC-color-green-dark: #4caf50;`
    * `--CC-color-red-light: #f7cace;`
    * `--CC-color-red-dark: #d02216;`

---

#### Body & App Base Styles

* **`body`:**
    * `margin: 0;`
    * `padding: 1rem 2rem;`
    * `max-width: 1500px;` (for content)
    * `display: flex;`
    * `justify-content: center;` (centers content horizontally)
    * `min-width: 480px;` (minimum browser width)
    * `min-height: 100vh;` (full viewport height)
    * `margin: 0 auto;` (centers the body itself if max-width is hit)
* **`#app`:**
    * `width: 100%;` (takes full width of its parent)
    * `text-align: center;`

---

### Utility Classes (`cc-` prefix)

These classes can be applied directly to HTML elements to quickly style them. Spacing units are based on `rem` (root em), where `1rem` typically equals `16px` by default.

---

#### Display & Position Utilities

| Class             | Property & Value    | Description                         |
| :---------------- | :------------------ | :---------------------------------- |
| `.cc-d-flex`      | `display: flex;`    | Renders element as a flex container. |
| `.cc-d-grid`      | `display: grid;`    | Renders element as a grid container. |
| `.cc-d-block`     | `display: block;`   | Renders element as a block-level box. |
| `.cc-d-inline`    | `display: inline;`  | Renders element as an inline-level box. |
| `.cc-d-inline-block`| `display: inline-block;` | Renders as inline but with block properties. |
| `.cc-d-table`     | `display: table;`   | Renders element like a `<table>` tag. |
| `.cc-d-contents`  | `display: contents;`| Makes children participate without wrapper. |
| `.cc-d-none`      | `display: none;`    | Hides element completely.            |

---

| Class               | Property & Value     | Description                          |
| :------------------ | :------------------- | :----------------------------------- |
| `.cc-position-static` | `position: static;`  | Default positioning.                 |
| `.cc-position-relative`| `position: relative;` | Positioned relative to itself.       |
| `.cc-position-absolute`| `position: absolute;` | Positioned relative to nearest positioned ancestor. |
| `.cc-position-fixed` | `position: fixed;`   | Positioned relative to viewport.     |
| `.cc-position-sticky`| `position: sticky;`  | Positioned based on scroll position. |

---

| Class           | Property & Value | Description                                  |
| :-------------- | :--------------- | :------------------------------------------- |
| `.cc-top-0`     | `top: 0;`        | Positions element at top edge.               |
| `.cc-top-100`   | `top: 100%;`     | Positions element at 100% from top.          |
| `.cc-top-auto`  | `top: auto;`     | Default `top` value.                         |
| `.cc-bottom-0`  | `bottom: 0;`     | Positions element at bottom edge.            |
| `.cc-bottom-100`| `bottom: 100%;`  | Positions element at 100% from bottom.       |
| `.cc-bottom-auto`| `bottom: auto;`  | Default `bottom` value.                      |
| `.cc-left-0`    | `left: 0;`       | Positions element at left edge.              |
| `.cc-left-100`  | `left: 100%;`    | Positions element at 100% from left.         |
| `.cc-left-auto` | `left: auto;`    | Default `left` value.                        |
| `.cc-right-0`   | `right: 0;`      | Positions element at right edge.             |
| `.cc-right-100` | `right: 100%;`   | Positions element at 100% from right.        |
| `.cc-right-auto`| `right: auto;`   | Default `right` value.                       |

---

| Class          | Property & Value | Description              |
| :------------- | :--------------- | :----------------------- |
| `.cc-float-left` | `float: left;`   | Floats element to the left. |
| `.cc-float-right`| `float: right;`  | Floats element to the right. |
| `.cc-float-none` | `float: none;`   | Removes float.            |

---

| Class               | Property & Value | Description               |
| :------------------ | :--------------- | :------------------------ |
| `.cc-overflow-auto` | `overflow: auto;`| Adds scrollbars if content overflows. |
| `.cc-overflow-hidden`| `overflow: hidden;`| Clips content that overflows. |
| `.cc-overflow-visible`| `overflow: visible;`| Content overflows outside box. |
| `.cc-overflow-scroll`| `overflow: scroll;`| Always adds scrollbars.   |
| `.cc-overflow-x-auto`| `overflow-x: auto;`| Horizontal scroll if needed. |
| `.cc-overflow-x-hidden`| `overflow-x: hidden;`| Horizontal clip.         |
| `.cc-overflow-x-visible`| `overflow-x: visible;`| Horizontal overflow.      |
| `.cc-overflow-x-scroll`| `overflow-x: scroll;`| Always horizontal scroll. |
| `.cc-overflow-y-auto`| `overflow-y: auto;`| Vertical scroll if needed. |
| `.cc-overflow-y-hidden`| `overflow-y: hidden;`| Vertical clip.           |
| `.cc-overflow-y-visible`| `overflow-y: visible;`| Vertical overflow.        |
| `.cc-overflow-y-scroll`| `overflow-y: scroll;`| Always vertical scroll.  |

---

#### Flexbox & Grid Utilities

| Class               | Property & Value       | Description                    |
| :------------------ | :--------------------- | :----------------------------- |
| `.cc-place-items-start`| `place-items: start;`   | Aligns and justifies items to the start. |
| `.cc-place-items-center`| `place-items: center;` | Aligns and justifies items to the center. |
| `.cc-place-items-end`   | `place-items: end;`    | Aligns and justifies items to the end.   |
| `.cc-place-items-stretch`| `place-items: stretch;`| Stretches items to fill available space. |
| `.cc-place-items-normal`| `place-items: normal;` | Resets `place-items` to its default. |

---

| Class                 | Property & Value          | Description                    |
| :-------------------- | :------------------------ | :----------------------------- |
| `.cc-align-items-start` | `align-items: flex-start;`| Aligns items to the start of the cross-axis. |
| `.cc-align-items-center`| `align-items: center;`    | Aligns items to the center of the cross-axis. |
| `.cc-align-items-end`   | `align-items: flex-end;`  | Aligns items to the end of the cross-axis.   |

---

| Class                   | Property & Value          | Description                        |
| :---------------------- | :------------------------ | :--------------------------------- |
| `.cc-justify-start`     | `justify-content: flex-start;`| Aligns items to the start of the main-axis. |
| `.cc-justify-center`    | `justify-content: center;`  | Aligns items to the center of the main-axis. |
| `.cc-justify-end`       | `justify-content: flex-end;`| Aligns items to the end of the main-axis. |
| `.cc-justify-between`   | `justify-content: space-between;`| Distributes items evenly with space between. |
| `.cc-justify-around`    | `justify-content: space-around;`| Distributes items evenly with space around. |
| `.cc-justify-evenly`    | `justify-content: space-evenly;`| Distributes items evenly with equal space around. |

---

| Class                | Property & Value       | Description                     |
| :------------------- | :--------------------- | :------------------------------ |
| `.cc-flex-wrap`      | `flex-wrap: wrap;`     | Items wrap to new lines.        |
| `.cc-flex-nowrap`    | `flex-wrap: nowrap;`   | Items stay on single line.      |
| `.cc-flex-row`       | `flex-direction: row;` | Items arrange in a row.         |
| `.cc-flex-row-reverse`| `flex-direction: row-reverse;`| Items arrange in a reversed row. |
| `.cc-flex-column`    | `flex-direction: column;`| Items arrange in a column.      |
| `.cc-flex-column-reverse`| `flex-direction: column-reverse;`| Items arrange in a reversed column. |
| `.cc-flex-grow-0`    | `flex-grow: 0;`        | Item doesn't grow.              |
| `.cc-flex-grow-1`    | `flex-grow: 1;`        | Item grows to fill space.       |
| `.cc-flex-shrink-0`  | `flex-shrink: 0;`      | Item doesn't shrink.            |
| `.cc-flex-shrink-1`  | `flex-shrink: 1;`      | Item shrinks if needed.         |
| `.cc-flex-flow-row`  | `flex-flow: row wrap;` | Shorthand for row direction and wrap. |
| `.cc-flex-row-nowrap`| `flex-flow: row nowrap;`| Shorthand for row direction and no wrap. |
| `.cc-flex-flow-column`| `flex-flow: column wrap;`| Shorthand for column direction and wrap. |
| `.cc-flex-column-nowrap`| `flex-flow: column nowrap;`| Shorthand for column direction and no wrap. |
| `.cc-flex-basis-auto`| `flex-basis: auto;`    | Item's preferred size is auto.  |

---

| Class (`.cc-gap-X`) | Gap Value (rem) | Class (`.cc-column-gap-X`) | Column Gap Value (rem) | Class (`.cc-row-gap-X`) | Row Gap Value (rem) |
| :------------------ | :-------------- | :------------------------- | :--------------------- | :-------------------- | :------------------ |
| `.cc-gap-0`         | `0`             | `.cc-column-gap-0`         | `0`                    | `.cc-row-gap-0`       | `0`                 |
| `.cc-gap-1`         | `0.25`          | `.cc-column-gap-1`         | `0.25`                 | `.cc-row-gap-1`       | `0.25`              |
| `.cc-gap-2`         | `0.5`           | `.cc-column-gap-2`         | `0.5`                  | `.cc-row-gap-2`       | `0.5`               |
| `.cc-gap-3`         | `0.75`          | `.cc-column-gap-3`         | `0.75`                 | `.cc-row-gap-3`       | `0.75`              |
| `.cc-gap-4`         | `1`             | `.cc-column-gap-4`         | `1`                    | `.cc-row-gap-4`       | `1`                 |
| `.cc-gap-5`         | `1.25`          | `.cc-column-gap-5`         | `1.25`                 | `.cc-row-gap-5`       | `1.25`              |
| `.cc-gap-6`         | `1.5`           | `.cc-column-gap-6`         | `1.5`                  | `.cc-row-gap-6`       | `1.5`               |
| `.cc-gap-7`         | `1.75`          | `.cc-column-gap-7`         | `1.75`                 | `.cc-row-gap-7`       | `1.75`              |
| `.cc-gap-8`         | `2`             | `.cc-column-gap-8`         | `2`                    | `.cc-row-gap-8`       | `2`                 |
| `.cc-gap-9`         | `2.25`          | `.cc-column-gap-9`         | `2.25`                 | `.cc-row-gap-9`       | `2.25`              |
| `.cc-gap-10`        | `2.5`           | `.cc-column-gap-10`        | `2.5`                  | `.cc-row-gap-10`      | `2.5`               |

---

#### Spacing Utilities (Margin & Padding)

* `X` ranges from 0 to 10. `0 = 0`, `1 = 0.25rem`, `2 = 0.5rem`, ..., `10 = 2.5rem`.
* Negative values are used for negative margins (e.g., `-0.25rem` for `cc-m--1`).

| Class   | Property & Value   | Description                 |
| :------ | :----------------- | :-------------------------- |
| `.cc-m-X` | `margin: Xrem;`    | Margin on all sides.        |
| `.cc-m-auto`| `margin: auto;`  | Centers block horizontally. |
| `.cc-m--X`| `margin: -Xrem;` | Negative margin all sides.  |

| Class   | Property & Value       | Description                    |
| :------ | :--------------------- | :----------------------------- |
| `.cc-mx-X`| `margin-left/right: Xrem;`| Margin on x-axis (left/right). |
| `.cc-mx-auto`| `margin-left/right: auto;`| Centers horizontally.         |
| `.cc-mx--X`| `margin-left/right: -Xrem;`| Negative margin on x-axis.    |

| Class   | Property & Value       | Description                    |
| :------ | :--------------------- | :----------------------------- |
| `.cc-my-X`| `margin-top/bottom: Xrem;`| Margin on y-axis (top/bottom). |
| `.cc-my-auto`| `margin-top/bottom: auto;`| Centers vertically.            |
| `.cc-my--X`| `margin-top/bottom: -Xrem;`| Negative margin on y-axis.    |

| Class   | Property & Value   | Description                 |
| :------ | :----------------- | :-------------------------- |
| `.cc-mt-X`| `margin-top: Xrem;`| Margin on top.              |
| `.cc-mt-auto`| `margin-top: auto;`| Auto margin on top.         |
| `.cc-mt--X`| `margin-top: -Xrem;`| Negative margin on top.     |

| Class   | Property & Value   | Description                 |
| :------ | :----------------- | :-------------------------- |
| `.cc-mb-X`| `margin-bottom: Xrem;`| Margin on bottom.          |
| `.cc-mb-auto`| `margin-bottom: auto;`| Auto margin on bottom.    |
| `.cc-mb--X`| `margin-bottom: -Xrem;`| Negative margin on bottom. |

| Class   | Property & Value   | Description                 |
| :------ | :----------------- | :-------------------------- |
| `.cc-ml-X`| `margin-left: Xrem;`| Margin on left.             |
| `.cc-ml-auto`| `margin-left: auto;`| Auto margin on left.       |
| `.cc-ml--X`| `margin-left: -Xrem;`| Negative margin on left.    |

| Class   | Property & Value   | Description                  |
| :------ | :----------------- | :--------------------------- |
| `.cc-mr-X`| `margin-right: Xrem;`| Margin on right.            |
| `.cc-mr-auto`| `margin-right: auto;`| Auto margin on right.      |
| `.cc-mr--X`| `margin-right: -Xrem;`| Negative margin on right.   |

| Class         | Property & Value     | Description                                |
| :------------ | :------------------- | :----------------------------------------- |
| `.cc-mxy-X-auto`| `margin: Xrem auto;` | Vertical margin `Xrem`, horizontal auto. |
| `.cc-mxy-auto-X`| `margin: auto Xrem;` | Vertical auto, horizontal margin `Xrem`. |

---

| Class   | Property & Value    | Description                  |
| :------ | :------------------ | :--------------------------- |
| `.cc-p-X` | `padding: Xrem;`    | Padding on all sides.        |

| Class   | Property & Value       | Description                    |
| :------ | :--------------------- | :----------------------------- |
| `.cc-px-X`| `padding-left/right: Xrem;`| Padding on x-axis (left/right). |

| Class   | Property & Value       | Description                    |
| :------ | :--------------------- | :----------------------------- |
| `.cc-py-X`| `padding-top/bottom: Xrem;`| Padding on y-axis (top/bottom). |

| Class   | Property & Value    | Description              |
| :------ | :------------------ | :----------------------- |
| `.cc-pt-X`| `padding-top: Xrem;`| Padding on top.          |
| `.cc-pb-X`| `padding-bottom: Xrem;`| Padding on bottom.     |
| `.cc-pl-X`| `padding-left: Xrem;`| Padding on left.         |
| `.cc-pr-X`| `padding-right: Xrem;`| Padding on right.        |

---

#### Text Utilities

| Class             | Property & Value  | Description                |
| :---------------- | :---------------- | :------------------------- |
| `.cc-text-left`   | `text-align: left;`| Aligns text to the left.   |
| `.cc-text-center` | `text-align: center;`| Centers text.              |
| `.cc-text-right`  | `text-align: right;`| Aligns text to the right.  |
| `.cc-text-justify`| `text-align: justify;`| Justifies text.            |
| `.cc-text-nowrap` | `white-space: nowrap;`| Prevents text from wrapping. |
| `.cc-text-wrap`   | `white-space: normal;`| Allows text to wrap normally. |
| `.cc-text-break-words`| `word-break: break-word;`| Breaks long words to prevent overflow. |
| `.cc-text-break-all`| `word-break: break-all;`| Breaks words at any character. |
| `.cc-text-upper`  | `text-transform: uppercase;`| Transforms text to uppercase. |
| `.cc-text-lower`  | `text-transform: lowercase;`| Transforms text to lowercase. |
| `.cc-text-capitalize`| `text-transform: capitalize;`| Capitalizes first letter of each word. |

---

| Class (`.cc-text-X`) | Font Size (rem/px) |
| :------------------- | :----------------- |
| `.cc-text-xs`        | `0.75rem` (12px)   |
| `.cc-text-sm`        | `0.875rem` (14px)  |
| `.cc-text-base`      | `1rem` (16px)      |
| `.cc-text-lg`        | `1.125rem` (18px)  |
| `.cc-text-xl`        | `1.25rem` (20px)   |

---

| Class                 | Property & Value | Description              |
| :-------------------- | :--------------- | :----------------------- |
| `.cc-font-inherit-style`| `font-style: inherit;`| Inherits font style.    |
| `.cc-font-normal`     | `font-style: normal;`| Normal font style.      |
| `.cc-font-italic`     | `font-style: italic;`| Italic font style.      |
| `.cc-font-oblique`    | `font-style: oblique;`| Oblique font style.    |
| `.cc-font-bold`       | `font-weight: bold;`| Bold font weight.       |

| Class                 | Property & Value | Description               |
| :-------------------- | :--------------- | :------------------------ |
| `.cc-font-inherit-weight`| `font-weight: inherit;`| Inherits font weight.  |
| `.cc-font-light`      | `font-weight: 300;`| Light font weight.       |
| `.cc-font-medium`     | `font-weight: 500;`| Medium font weight.      |
| `.cc-font-semibold`   | `font-weight: 600;`| Semi-bold font weight.   |
| `.cc-font-extrabold`  | `font-weight: 800;`| Extra-bold font weight.  |

---

| Class               | Property & Value       | Description                    |
| :------------------ | :--------------------- | :----------------------------- |
| `.cc-text-d-none`   | `text-decoration: none;`| Removes text decoration.        |
| `.cc-text-d-ul`     | `text-decoration: underline;`| Underlines text.               |
| `.cc-text-d-ul-dot` | `text-decoration: underline dotted;`| Underlines with dotted line. |
| `.cc-text-d-ul-wavy`| `text-decoration: underline wavy;`| Underlines with wavy line.   |
| `.cc-text-d-ul-dash`| `text-decoration: underline dashed;`| Underlines with dashed line. |
| `.cc-text-d-ul-double`| `text-decoration: underline double;`| Underlines with double line. |
| `.cc-text-d-strike` | `text-decoration: line-through;`| Strikes through text.        |

---

#### Background Color Utilities

| Class               | Property & Value        | Description             |
| :------------------ | :---------------------- | :---------------------- |
| `.cc-bg-white`      | `background-color: #fff;`| White background.       |
| `.cc-bg-black`      | `background-color: #000;`| Black background.       |
| `.cc-bg-transparent`| `background-color: transparent;`| Transparent background. |
| `.cc-bg-success`    | `background-color: var(--CC-color-success);`| Success color background. |
| `.cc-bg-warning`    | `background-color: var(--CC-color-warning);`| Warning color background. |
| `.cc-bg-error`      | `background-color: var(--CC-color-error);`| Error color background.   |
| `.cc-bg-gray`       | `background-color: var(--CC-color-gray);`| Gray color background.    |
| `.cc-bg-gray-light` | `background-color: var(--CC-color-gray-light);`| Light gray background.  |
| `.cc-bg-gray-dark`  | `background-color: var(--CC-color-gray-dark);`| Dark gray background.   |
| `.cc-bg-blue`       | `background-color: var(--CC-color-blue);`| Blue background.          |
| `.cc-bg-blue-light` | `background-color: var(--CC-color-blue-light);`| Light blue background.  |
| `.cc-bg-blue-dark`  | `background-color: var(--CC-color-blue-dark);`| Dark blue background.   |
| `.cc-bg-blue-gray`  | `background-color: var(--CC-color-blue-gray);`| Blue-gray background.   |
| `.cc-bg-green-light`| `background-color: #d4f0d6;`| Light green background. |
| `.cc-bg-green-dark` | `background-color: #4caf50;`| Dark green background.  |
| `.cc-bg-red-light`  | `background-color: #f7cace;`| Light red background.   |
| `.cc-bg-red-dark`   | `background-color: #d02216;`| Dark red background.    |

---

#### Text Color Utilities

| Class           | Property & Value | Description              |
| :-------------- | :--------------- | :----------------------- |
| `.cc-text-white`| `color: #fff;`   | White text.              |
| `.cc-text-black`| `color: #000;`   | Black text.              |
| `.cc-text-gray-dark`| `color: var(--CC-color-gray-dark);`| Dark gray text.         |
| `.cc-text-gray` | `color: var(--CC-color-gray);`| Gray text.               |

---

#### Border Utilities

| Class (`.cc-border-X`) | Border Value                                    | Description                  |
| :--------------------- | :---------------------------------------------- | :--------------------------- |
| `.cc-border-0`         | `border: none;`                                 | No border.                   |
| `.cc-border-top-0`     | `border-top: none;`                             | No top border.               |
| `.cc-border-right-0`   | `border-right: none;`                           | No right border.             |
| `.cc-border-bottom-0`  | `border-bottom: none;`                          | No bottom border.            |
| `.cc-border-left-0`    | `border-left: none;`                            | No left border.              |
| `.cc-border`           | `border: 1px solid var(--CC-color-gray);`      | 1px solid gray border on all sides. |
| `.cc-border-top`       | `border-top: 1px solid var(--CC-color-gray);`  | 1px solid gray top border.    |
| `.cc-border-right`     | `border-right: 1px solid var(--CC-color-gray);`| 1px solid gray right border.  |
| `.cc-border-bottom`    | `border-bottom: 1px solid var(--CC-color-gray);`| 1px solid gray bottom border. |
| `.cc-border-left`      | `border-left: 1px solid var(--CC-color-gray);`| 1px solid gray left border.   |

---

| Class (`.cc-border-radius-X`) | Border-Radius Value (rem/px) | Description                 |
| :---------------------------- | :--------------------------- | :-------------------------- |
| `.cc-border-radius-0`         | `0`                          | No border radius.           |
| `.cc-border-radius-1`         | `0.125rem` (2px)             | Small radius.               |
| `.cc-border-radius-2`         | `0.25rem` (4px)              | Standard radius.            |
| `.cc-border-radius-3`         | `0.5rem` (8px)               | Medium radius.              |
| `.cc-border-radius-4`         | `0.75rem` (12px)             | Larger radius.              |
| `.cc-border-radius-5`         | `1rem` (16px)                | Even larger radius.         |
| `.cc-border-radius-6`         | `1.25rem` (20px)             | Big radius.                 |
| `.cc-border-radius-7`         | `1.5rem` (24px)              | Very big radius.            |
| `.cc-border-radius-8`         | `1.75rem` (28px)             | Large, rounded corners.     |
| `.cc-border-radius-9`         | `2rem` (32px)                | Almost pill-shaped for small elements. |
| `.cc-border-radius-10`        | `2.5rem` (40px)              | Larger, more rounded.       |
| `.cc-border-circle`           | `50%`                        | Makes element a perfect circle/oval. |

---

| Class          | Property & Value                      | Description          |
| :------------- | :------------------------------------ | :------------------- |
| `.cc-box-shadow` | `box-shadow: 0 4px 8px rgba(0, 0, 0, 0.37);`| Standard box shadow. |

---

#### Animations (`@keyframes`)

These are the `@keyframes` definitions you can use with the `animation` CSS property.

* **`cc-animate-spin`:**
    * Rotates an element 360 degrees (0% to 100% transform: `rotate(0deg)` to `rotate(360deg)`).
    * **Usage:** `animation: cc-animate-spin 1s linear infinite;` (example)
* **`cc-animate-showToast`:**
    * Animates an element in, moving up from `20px` translateY and fading from `0` to `1` opacity.
    * **Usage:** `animation: cc-animate-showToast 0.3s ease-out forwards;` (example)
* **`cc-animate-hideToast`:**
    * Animates an element out, moving down to `20px` translateY and fading from `1` to `0` opacity.
    * **Usage:** `animation: cc-animate-hideToast 0.3s ease-in forwards;` (example)
* **`cc-animate-appear`:**
    * Animates content appearing (opacity, padding, max-height).
    * **Usage:** `animation: cc-animate-appear 0.4s ease-out forwards;` (example)
* **`cc-animate-disappear`:**
    * Animates content disappearing (opacity, max-height, padding).
    * **Usage:** `animation: cc-animate-disappear 0.4s ease-in forwards;` (example)
* **`cc-toast-in-out`:**
    * A combined animation for toast messages: fades in, stays visible, then fades out.
    * **Usage:** `animation: cc-toast-in-out 3s forwards;` (example for a 3-second total animation)

---

I hope this cheatsheet helps you utilize my library!