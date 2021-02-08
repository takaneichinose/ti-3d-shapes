import TiComponent from "./TiComponent";

/**
 * Cube component class
 */
export default class TiCube extends TiComponent {
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
		const styleObj: Record<string, Record<string, string>> = {
			".ti-box": {
				"width": `${width}${unit}`,
				"height": `${height}${unit}`,
				"position": "relative",
				"transform-style": "preserve-3d"
			},
			".ti-box > div": {
				"background-color": color,
				"width": "100%",
				"height": "100%",
				"position": "absolute",
				"top": "0px",
				"left": "0px"
			},
			".ti-box-top": {
				"transform": [
					`translateZ(calc(${depth}${unit} / 2))`,
					"rotateX(90deg)",
					`translateZ(calc(${depth}${unit} / 2))`
				].join(" "),
				"filter": "brightness(110%)",
			},
			".ti-box-bottom": {
				"transform": [
					`translateZ(calc(${depth}${unit} / 2))`,
					"rotateX(-90deg)",
					`translateZ(calc(${depth}${unit} / 2))`
				].join(" "),
				"filter": "brightness(80%)",
			},
			".ti-box-left": {
				"transform": [
					`translateZ(calc(${depth}${unit} / 2))`,
					"rotateY(-90deg)",
					`translateZ(calc(${depth}${unit} / 2))`
				].join(" ")
			},
			".ti-box-right": {
				"transform": [
					`translateZ(calc(${depth}${unit} / 2))`,
					"rotateY(90deg)",
					`translateZ(calc(${depth}${unit} / 2))`
				].join(" "),
				"filter": "brightness(90%)",
			},
			".ti-box-front": {
				"transform": `translateZ(${depth}${unit})`
			},
			".ti-box-rear": {
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
		
		//----- Box element
		const box: HTMLElement = document.createElement("div");
		const top: HTMLElement = document.createElement("div");
		const bottom: HTMLElement = document.createElement("div");
		const left: HTMLElement = document.createElement("div");
		const right: HTMLElement = document.createElement("div");
		const front: HTMLElement = document.createElement("div");
		const rear: HTMLElement = document.createElement("div");
		
		box.classList.add("ti-box");
		top.classList.add("ti-box-top");
		bottom.classList.add("ti-box-bottom");
		left.classList.add("ti-box-left");
		right.classList.add("ti-box-right");
		front.classList.add("ti-box-front");
		rear.classList.add("ti-box-rear");
		
		box.append(top, bottom, left, right, front, rear);
		
		//----- Styling
		const style: HTMLStyleElement = document.createElement("style");
		
		style.textContent = this.setStyle(width, height, depth, unit, color);
		
		this.shadowRoot.append(style, box);
	}
}
