var RGBColor = function(r, g, b) {
	// Default color composites
	this.r = 0;
	this.g = 0;
	this.b = 0;

	// Default Values for shades and HSV operations.
	this.angle="30.0";
	this.grade1="0.8";
	this.grade2="0.4";
	this.grade3="0.6";
	this.grade4="0.3";

	if (r !== undefined) {
		this.r = r;
	}
	if (g !== undefined) {
		this.g = g;
	}
	if (b !== undefined) {
		this.b = b;
	}

	// Converts the decimal value d into hexadecimal value
	this.Dec2Hex = function(d) {
		return '0123456789ABCDEF'.charAt((d - (d % 16)) / 16) + '0123456789ABCDEF'.charAt(d % 16);
	}

	// Converts the rgb value h into hexadecimal value
	this.toHex = function() {
		return this.Dec2Hex(this.r) + this.Dec2Hex(this.g) + this.Dec2Hex(this.b);
	}

	// Returns the minimum of the 3 values in param
	this.min3 = function(a, b, c) {
		return (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
	}

	// Returns the maximum of the 3 values in param
	this.max3 = function(a, b, c) {
		return (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
	}

	// Converts the rgb object rgb into HSVColor
	this.toHSV = function() {
		hsv = new HSVColor();
		max = max3(this.r, this.g, this.b);
		dif = max - min3(this.r, this.g, this.b);
		hsv.s = (max == 0.0) ? 0 : (100 * dif / max);
		if (hsv.s == 0) {
			hsv.h = 0;
		}
	 	else if (this.r == max) {
	 		hsv.h = 60.0 * (this.g - this.b) / dif;
	 	}
		else if (this.g == max) {
			hsv.h = 120.0 + 60.0 * (this.b - this.r) / dif;
		}
		else if (this.b == max) {
			hsv.h = 240.0 + 60.0 * (this.r - this.g) / dif;
		}
		if (hsv.h < 0.0) {
			hsv.h += 360.0;
		}
		hsv.v = Math.round(max * 100 / 255);
		hsv.h = Math.round(hsv.h);
		hsv.s = Math.round(hsv.s);
		return hsv;
	}

	// Returns the RGBcolor as rgb(r, g, b)
	this.formatCSS = function() {
		return "rgb  (" + r + "," + this.g + "," + this.b + ")";
	}

	// Returns the complementary RGBColor
	this.complement = function() {
		complementHsv = this.toHSV();
		complementHsv.HueShift(180.0);
		return complementHsv.toRGB();
	}

	// Returns the two split complementary RGBColor
	this.splitComplement = function() {
		splitHsv = this.toHSV();
		splitHsv.HueShift(180.0 - angle);
		splitRgb = splitHsv.toHSV2();

		temphsv = this.toHSV();
		temphsv.HueShift(180.0 + angle);
		temprgb = temphsv.toRGB();

		return [splitRgb, temprgb];
	}

	// Returns the two triadic RGBColor
	this.triadic = function() {
		return [new RGBColor(this.g, this.b, this.r), new RGBColor(this.b, this.r, this.g)];
	}

	// Returns the two analogous RGBColor
	this.analogous = function() {
		analogousHsv = this.toHSV();
		analogousHsv.HueShift(angle);
		analogousRgb = analogousHsv.toRGB();

		temphsv = this.toHSV();
		temphsv.HueShift(0.0 - angle);
		temprgb = temphsv.toRGB();

		return [analogousRgb, temprgb];
	}

	// Returns the four shades RGBColor
	this.shades = function() {
		colorA = new RGBColor();
		colorB = new RGBColor();
		colorC = new RGBColor();
		colorD = new RGBColor();

		colorA.r = Math.round(this.r + (255 - this.r) * grade1);
		colorA.g = Math.round(this.g + (255 - this.g) * grade1);
		colorA.b = Math.round(this.b + (255 - this.b) * grade1);
	 
		colorB.r = Math.round(this.r + (255 - this.r) * grade2);
		colorB.g = Math.round(this.g + (255 - this.g) * grade2);
		colorB.b = Math.round(this.b + (255 - this.b) * grade2);
	 
		colorC.r = Math.round(this.r * grade3);
		colorC.g = Math.round(this.g * grade3);
		colorC.b = Math.round(this.b * grade3);
	 
		colorD.r = Math.round(this.r * grade4);
		colorD.g = Math.round(this.g * grade4);
		colorD.b = Math.round(this.b * grade4);

		return [colorA, colorB, colorC, colorD];
	}
};

var HexColor = function(value) {
	this.value = value;

	// Converts the hexadecimal value h into decimal value
	this.toDec = function() {
		this.value = this.value.toUpperCase();
		d = 0;
		for (i = 0; i < this.value.length; i++) {
			d = d * 16;
			d += '0123456789ABCDEF'.indexOf(this.value.charAt(i));
		}
		return d;
	}
};

var HSVColor = function(h, s, v) {
	this.h = 0;
	this.s = 0;
	this.v = 0;

	if (h !== undefined) {
		this.h = h;
	}
	if (s !== undefined) {
		this.s = s;
	}
	if (v !== undefined) {
		this.v = v;
	}

	// Converts the rgb value h into hexadecimal value
	this.toRGB = function() {
		var rgb = new RGBColor();
		if (this.s == 0) {
			rgb.r = rgb.g = rgb.b = Math.round(this.v * 2.55);
		} else {
			this.h /= 60;
			this.s /= 100;
			this.v /= 100;
			i = Math.floor(this.h);
			f = this.h - i;
			p = this.v * (1 - this.s);
			q = this.v * (1 - this.s * f);
			t = this.v * (1 - this.s * (1 - f));
			switch(i) {
				case 0: {
					rgb.r = this.v;
					rgb.g = t;
					rgb.b = p;
					break;
				}
				case 1: {
					rgb.r = q;
					rgb.g = this.v;
					rgb.b = p;
					break;
				}
				case 2: {
					rgb.r = p;
					rgb.g = this.v;
					rgb.b = t;
					break;
				}
				case 3: {
					rgb.r = p;
					rgb.g = q;
					rgb.b = this.v;
					break;
				}
				case 4: {
					rgb.r = t;
					rgb.g = p;
					rgb.b = this.v;
					break;
				}
				default: {
					rgb.r = this.v;
					rgb.g = p;
					rgb.b = q;
				}
			}
			rgb.r = Math.round(rgb.r * 255);
			rgb.g = Math.round(rgb.g * 255);
			rgb.b = Math.round(rgb.b * 255);
		}
		return rgb;
	}

	this.HueShift = function(s) {
		this.h += s;
		while (this.h >= 360.0) {
			this.h -= 360.0;
		}
		while (this.h < 0.0) {
			this.h += 360.0;
		}
		return this.h;
	}
};