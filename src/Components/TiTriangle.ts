import TiComponent from "./TiComponent";

/**
 * Triangle component class
 */
export default class TiTriangle extends TiComponent {
	/**
	 * Constructor
	 */
	constructor() {
		super();
		
		const width: number = parseInt(this.getAttribute("width"));
		const height: number = parseInt(this.getAttribute("height"));
		const depth: number = parseInt(this.getAttribute("depth"));
		const unit: string = this.getAttribute("unit");
		const color: string = this.getAttribute("color");
		
		this.build(width, height, depth, unit, color);
	}

	/**
	 * Check the attributes if valid
	 */
	checkAttr(width: number, height: number, depth: number, unit: string, color: string): void {
		if (this.isExist(width) === false) {
			throw "Must set the 'width' attribute.";
		}
		else if (this.isExist(height) === false) {
			throw "Must set the 'height' attribute.";
		}
		else if (this.isExist(depth) === false) {
			throw "Must set the 'depth' attribute.";
		}
		else if (this.isExist(unit) === false) {
			throw "Must set the 'unit' attribute.";
		}
		else if (this.isValidNum(width) === false) {
			throw "The value of 'width' attribute must be numeric.";
		}
		else if (this.isValidNum(height) === false) {
			throw "The value of 'height' attribute must be numeric.";
		}
		else if (this.isValidNum(depth) === false) {
			throw "The value of 'depth' attribute must be numeric.";
		}
	}
	
	/**
	 * Create the style of the box
	 */
	setStyle(width: number, height: number, depth: number, unit: string, color: string): string {
		const halfWidth = width / 2;
		const hypotenuse = Math.sqrt((halfWidth ** 2) + (height ** 2));
		const angle = Math.atan2(halfWidth, height) * 180 / Math.PI;

		const styleObj: Record<string, Record<string, string>> = {
			".ti-triangle": {
				"width": `${width}${unit}`,
				"height": `${height}${unit}`,
				"position": "relative",
				"transform-style": "preserve-3d"
			},
			".ti-triangle > div": {
				"background-color": color,
				"position": "absolute",
				"transform-origin": "bottom center"
			},
			".ti-triangle > .ti-triangle-front, .ti-triangle > .ti-triangle-rear": {
				"background-color": "transparent",
			},
			".ti-triangle-left, .ti-triangle-right": {
				"width": `${depth}${unit}`,
				"height": `${hypotenuse}${unit}`,
				"bottom": "0",
				"left": `calc(50% - ${depth / 2}${unit})`
			},
			".ti-triangle-front, .ti-triangle-rear": {
				"width": "0",
				"height": "0",
				"border-bottom": `solid ${height}${unit} ${color}`,
				"border-left": `solid ${halfWidth}${unit} transparent`,
				"border-right": `solid ${halfWidth}${unit} transparent`,
				"top": `calc(50% - ${height / 2}${unit})`,
				"left": `calc(50% - ${width / 2}${unit})`
			},
			".ti-triangle-bottom": {
				"width": `${width}${unit}`,
				"height": `${depth}${unit}`,
				"bottom": "0",
				"left": `calc(50% - ${width / 2}${unit})`,
				"transform": [
					"rotateX(-90deg)"
				].join(" "),
				"filter": "brightness(80%)",
			},
			".ti-triangle-left": {
				"transform": [
					`translateZ(calc(${depth}${unit} / 2))`,
					"rotateY(-90deg)",
					`translateZ(calc(${width}${unit} / 2))`,
					`rotateX(${angle}deg)`
				].join(" ")
			},
			".ti-triangle-right": {
				"transform": [
					`translateZ(calc(${depth}${unit} / 2))`,
					"rotateY(90deg)",
					`translateZ(calc(${width}${unit} / 2))`,
					`rotateX(${angle}deg)`
				].join(" "),
				"filter": "brightness(90%)",
			},
			".ti-triangle-front": {
				"transform": `translateZ(${depth}${unit})`
			},
			".ti-triangle-rear": {
				"transform": "rotateY(180deg)",
				"filter": "brightness(90%)",
			}
		};

		return this.objToCSS(styleObj);
	}
	
	/**
	 * Build the component by adding elements inside
	 */
	build(width: number, height: number, depth: number, unit: string, color: string) {
		this.checkAttr(width, height, depth, unit, color);

		if (this.isExist(color) === false) {
			color = "#ffffff";
		}
		
		this.attachShadow({ mode: "open" });
		
		//----- Triangle element
		const triangle: HTMLElement = document.createElement("div");
		const bottom: HTMLElement = document.createElement("div");
		const left: HTMLElement = document.createElement("div");
		const right: HTMLElement = document.createElement("div");
		const front: HTMLElement = document.createElement("div");
		const rear: HTMLElement = document.createElement("div");
		
		triangle.classList.add("ti-triangle");
		bottom.classList.add("ti-triangle-bottom");
		left.classList.add("ti-triangle-left");
		right.classList.add("ti-triangle-right");
		front.classList.add("ti-triangle-front");
		rear.classList.add("ti-triangle-rear");
		
		triangle.append(bottom, left, right, front, rear);
		
		//----- Styling
		const style: HTMLStyleElement = document.createElement("style");
		
		style.textContent = this.setStyle(width, height, depth, unit, color);
		
		this.shadowRoot.append(style, triangle);
	}
}
