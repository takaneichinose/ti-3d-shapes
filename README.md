# Web Components 3D Shapes

## Overview

This is a 3D shape creation tool made in HTML, CSS, JavaScript ([TypeScript](https://www.typescriptlang.org/)).

The elements are made in Web Components, so custom elements are used to implement this modelling tool.

Using [Parcel](https://parceljs.org/) application bundler, The TypeScript code is being compiled to a JavaScript code.

## Usage

Currently, there are 2 availabe shapes can be used:

### Cube

```HTML
<!-- These attributes are required to build the cube shape -->
<ti-cube width="200" height="200" depth="200" unit="px" color="#4f4f4f"></ti-cube>
```

The Cube element is built only in HTML, and CSS using ```<div>``` tags.

The element only has 4 sides, and the angle of each sides is 90°.

### Polygon

```HTML
<!-- These attributes are required to build the cube shape -->
<ti-polygon size="200" depth="50" unit="px" sides="12" color="#4f4f4f"></ti-polygon>
```

The Polygon element is built in SVG, HTML, and CSS.

Sides of the element can be set, but only the face of the shape.

---

If the required attributes was not set, JavaScript will throw an Exception stating that the specific attribute is required.

## Building distribution

[Yarn](https://yarnpkg.com/) is used to manage the packages and the dependencies, so it must be installed globally to start building the project.

Using terimal or command prompt, run the command below to install all the dependencies.

```
yarn install
```

After installing the dependencies, run the command below to compile the TypeScript code into JavaScript

```
yarn build
```

After building the package, 'dist' folder will be created at the same directory, and 'ti-3d-shapes.js' JavaScript file will be created at the same time. This file can be sourced at the ```<script>``` tag in HTML code.

## To Do

These are the other shapes that I'm planning to make:
1. Triangle
1. Sphere
1. Cone
1. Trapezoid
1. Doughnut
1. Texture
1. Shading
