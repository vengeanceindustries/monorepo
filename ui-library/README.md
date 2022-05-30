# design tokens

A place for the atoms of the design system to be defined in JSON, and generated into SCSS & CSS variables, and Typescript types for props definitions

## Global Tokens

### Colors

-   name/value pairs generated to **SCSS variables**
-   names union generated to **TS types**

### Fonts

1. _family_ style stacks
2. _size_ values – in rems
3. _weight_ numbers – hundred-level values from 100 - 900
4. _line-heights_ – unitless
5. _imports_ strings – partial reference for Google Fonts import
6. _style_ objects – type-style key, scss style-block value

-   family, size, weigth, lineHeight
    -   name/value pairs generated to **SCSS variables**
    -   names union generated to **TS types**
-   imports
    -   compiled for all the banners in `generator.fontImports.ts`,
-   style
    -   names union generated to **TS types**

### Breakpoints

-   keys - breakpoint id
-   value "name" - device-width indicator
-   value "width" - pixel-based number

_TODO - add to generator_

### Content widths

-   name/value pairs generated to **SCSS variables** _TODO_
-   names union generated to **TS types** _TODO_

## Banner Tokens

Use CSS Custom Properties to handle banner-based theming; FL values used as :root defaults as needed

### Brand colors

1. name/value pairs generated to **CSS custom properties**
2. names union generated to **TS types**

### Themes

1. name/value pairs generated to **CSS custom properties**
2. names union generated to **TS types** _TODO_
3. button style block renders styles referencing custom properties - _TODO: move to UI-library_
