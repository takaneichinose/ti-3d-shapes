"use strict";

import TiCube from "./Components/TiCube";
import TiPolygon from "./Components/TiPolygon";
import TiTriangle from "./Components/TiTriangle";

// Define the custom element as a web component
customElements.define("ti-cube", TiCube);
customElements.define("ti-polygon", TiPolygon);
customElements.define("ti-triangle", TiTriangle);
