import TiComponent from "./TiComponent";

/**
 * Polygon component class
 */
export default class TiPolygon extends TiComponent {
	/**
	 * Constructor
	 */
	constructor() {
		super();
		
		const size: number = parseInt(this.getAttribute("size"));
		const depth: number = parseInt(this.getAttribute("depth"));
		const unit: string = this.getAttribute("unit");
		const sides: number = parseInt(this.getAttribute("sides"));
		const color: string = this.getAttribute("color");
		
		this.build(size, depth, unit, sides, color);
	}

	/**
	 * Check the attributes if valid
	 */
	checkAttr(size: number, depth: number, unit: string, sides: number): void {
		if (this.isExist(size) === false) {
			throw "Must set the 'size' attribute.";
		}
		else if (this.isExist(depth) === false) {
			throw "Must set the 'depth' attribute.";
		}
		else if (this.isExist(unit) === false) {
			throw "Must set the 'unit' attribute.";
		}
		else if (this.isExist(sides) === false) {
			throw "Must set the 'sides' attribute.";
		}
		else if (this.isValidNum(size) === false) {
			throw "The value of 'size' attribute must be numeric.";
		}
		else if (this.isValidNum(depth) === false) {
			throw "The value of 'depth' attribute must be numeric.";
		}
		else if (this.isValidNum(sides) === false) {
			throw "The value of 'sides' attribute must be numeric.";
		}
	}

	/**
   * Create a SVN element of a polygon
   */
  createPolygon(angleCalc: number, size: number, sides: number): string {
    const boxSize: number = size / 2;
    const path: Array<string> = [];
    
    path.push("M");
    path.push(this.getDistanceByCos(0, boxSize).toString());
    path.push(this.getDistanceBySin(0, boxSize).toString());
    
    for (let i = 0; i <= sides; i++) {
      path.push("L");
      path.push(this.getDistanceByCos(angleCalc * i, boxSize).toString());
      path.push(this.getDistanceBySin(angleCalc * i, boxSize).toString());
    }
    
    path.push("Z");
    
    return path.join(" ");
  }

  /**
   * Create the style of the box
   */
  setStyle(size: number, depth: number, unit: string, color: string, angleCalc: number): string {
    const styleObj: Record<string, Record<string, string>> = {
      ".ti-polygon": {
        "width": `${size}${unit}`,
        "height": `${size}${unit}`,
        "position": "relative",
        "transform-style": "preserve-3d"
      },
      ".ti-polygon-front, .ti-polygon-rear": {
        "fill": color,
        "width": `${size}${unit}`,
        "height": `${size}${unit}`,
        "position": "absolute",
        "top": "0px",
        "left": "0px",
        "transform-style": "preserve-3d"
      },
      ".ti-polygon-front": {
        "transform": `translateZ(${depth}${unit})`
      },
      ".ti-polygon-rear": {
        "filter": "brightness(90%)"
      },
      ".ti-polygon-side": {
        "background-color": "var(--background-color)",
        "width": "var(--width)",
        "height": `${depth}${unit}`,
        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "transform-origin": "bottom left",
        "transform-style": "preserve-3d",
        "transform": [
          "translateY(-100%)",
          "rotateZ(var(--angle))",
          `translateY(-${size / 2}${unit})`,
          `rotateZ(${angleCalc / 2}deg)`,
          "rotateX(-90deg)"
        ].join(" "),
        "filter": "brightness(var(--brightness))"
      }
    };
    
    return this.objToCSS(styleObj);
  }
  
	/**
   * Build the component by adding elements inside
   */
  build(size: number, depth: number, unit: string, sides: number, color: string): void {
    this.checkAttr(size, depth, unit, sides);
    
    this.attachShadow({ mode: "open" });
    
    // Name Space of SVG
    const svgNS: string = "http://www.w3.org/2000/svg";
    
    const fullAngle: number = 360;
    const angleCalc: number = fullAngle / sides;
    const polygonPath: string = this.createPolygon(angleCalc, size, sides);
    
    //----- Box element
    const polygon: HTMLDivElement = document.createElement("div");
    const front: SVGElement = document.createElementNS(svgNS, "svg") as SVGElement;
    const rear: SVGElement = document.createElementNS(svgNS, "svg") as SVGElement;
    const frontPath: SVGPathElement = document.createElementNS(svgNS, "path") as SVGPathElement;
    const rearPath: SVGPathElement = document.createElementNS(svgNS, "path") as SVGPathElement;
    
    front.setAttributeNS(null, "viewBox", `0 0 ${size} ${size}`);
    rear.setAttributeNS(null, "viewBox", `0 0 ${size} ${size}`);
    
    frontPath.setAttributeNS(null, "d", polygonPath);
    rearPath.setAttributeNS(null, "d", polygonPath);
    
    front.append(frontPath);
    rear.append(rearPath);
    
    polygon.classList.add("ti-polygon");
    front.classList.add("ti-polygon-front");
    rear.classList.add("ti-polygon-rear");
    
    polygon.append(front, rear);
    
    const sideWidth: number = (size / 2) * this.sin(angleCalc / 2) * 2;
    
    for (let i: number = 0; i < sides; i++) {
      const side: HTMLDivElement = document.createElement("div");
      
      side.classList.add("ti-polygon-side");
      
      const angle: number = angleCalc * i;
      
      let sideColor: string = `--background-color: ${color};`;
      
      if ((angle >= 45 && angle < 135) || (angle >= 135 && angle < 225)) {
        // Right side or Bottom side
        
        sideColor += " --brightness: 90%;";
      }
      else {
        // Left side or top side
        
        sideColor += "--brightness: 100%;";
      }
      
      side.style.cssText =
        `--width: ${sideWidth}${unit}; --angle: ${angle}deg; ${sideColor}`;
      
      polygon.append(side);
    }
               
    //----- Styling
    const style: HTMLStyleElement = document.createElement("style");
    
    style.textContent = this.setStyle(size, depth, unit, color, angleCalc);
    
    this.shadowRoot.append(style, polygon);
  }
}
