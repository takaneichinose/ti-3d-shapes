/**
 * Component to create the shape
 */
export default class TiComponent extends HTMLElement {
	/**
	 * Constructor
	 */
	constructor() {
		super();
	}

	/**
	 * To check if an element does exist
	 */
	isExist(val: string | number): boolean {
		if (val === null || typeof val === "undefined") {
			return false;
		}
		
		return true;
	}

	/**
	 * To check if an element is a valid number
	 */
	isValidNum(val: number): boolean {
		if (isNaN(val as number) === true) {
			return false;
		}
		else if (isFinite(val as number) === false) {
			return false;
		}

		return true;
	}
	
	/**
	 * Convert the object into CSS string
	 */
	objToCSS(styleObj: Record<string, Record<string, string>>): string {
		let cssArray: Array<string> = [];
		
		for (const selector in styleObj) {
			cssArray.push(selector);
			cssArray.push("{");
			
			for (const attr in styleObj[selector]) {
				cssArray.push(attr);
				cssArray.push(":");
				cssArray.push(styleObj[selector][attr]);
				cssArray.push(";");
			}
				
			cssArray.push("}");
		}
		
		return cssArray.join("");
	}

	/**
	 * Trigonometric SIN function
	 */
	sin(angle: number): number {
    return Math.sin((angle * Math.PI) / 180);
  }
	
	/**
	 * Trigonometric COS function
	 */
  cos(angle: number): number {
    return Math.cos((angle * Math.PI) / 180);
  }
	
	/**
	 * Get the distance by trigonometric SIN function
	 */
  getDistanceBySin(angle: number, size: number): number {
    return (this.sin(angle - 90) * size) + size;
  }
	
	/**
	 * Get the distance by trigonometric COS function
	 */
  getDistanceByCos(angle: number, size: number): number {
    return (this.cos(angle - 90) * size) + size;
  }
}
