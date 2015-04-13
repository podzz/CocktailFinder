var RGBColor = function(r, g, b) {
	this.r = 0;
	this.g = 0;
	this.b = 0;

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

	// Converts the rgb object rgb into hsv object
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

	this.formatCSS = function() {
		return "(" + r + "," + this.g + "," + this.b + ")";
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

	this.HueShift = function () {
		this.h += this.s;
		while (this.h >= 360.0) {
			this.h -= 360.0;
		}
		while (this.h < 0.0) {
			this.h += 360.0;
		}
		return this.h;
	}
};

function SetColors(rgbColor, a) {
	colorA = new RGBColor();
	colorB = new RGBColor();
	colorC = new RGBColor();
	colorD = new RGBColor();

	colorA.r = Math.round(rgbColor.r + (255 - rgbColor.r) * grade1);
	colorA.g = Math.round(rgbColor.g + (255 - rgbColor.g) * grade1);
	colorA.b = Math.round(rgbColor.b + (255 - rgbColor.b) * grade1);
 
	colorB.r = Math.round(rgbColor.r + (255 - rgbColor.r) * grade2);
	colorB.g = Math.round(rgbColor.g + (255 - rgbColor.g) * grade2);
	colorB.b = Math.round(rgbColor.b + (255 - rgbColor.b) * grade2);
 
	colorC.r = Math.round(rgbColor.r * grade3);
	colorC.g = Math.round(rgbColor.g * grade3);
	colorC.b = Math.round(rgbColor.b * grade3);
 
	colorD.r = Math.round(rgbColor.r * grade4);
	colorD.g = Math.round(rgbColor.g * grade4);
	colorD.b = Math.round(rgbColor.b * grade4);

	for (i = 0; i < a.length; i += 2) {
		document.getElementById(a[i] + 'c' + a[i + 1] + 'a').style.backgroundColor = 'rgb' + colorA.formatCSS();
		document.getElementById(a[i] + 'c' + a[i + 1] + 'b').style.backgroundColor = 'rgb' + colorB.formatCSS();
		document.getElementById(a[i] + 'c' + a[i + 1] + 'c').style.backgroundColor = 'rgb' + rgbColor.formatCSS();
		document.getElementById(a[i] + 'c' + a[i + 1] + 'd').style.backgroundColor = 'rgb' + colorC.formatCSS();
		document.getElementById(a[i] + 'c' + a[i + 1] + 'e').style.backgroundColor = 'rgb' + colorD.formatCSS();
		
		document.getElementById(a[i] + 'c' + a[i + 1] + 'a').innerHTML = '#' + RGB2Hex(ra, ga, ba) + '<br>' + colorA.formatCSS();
		document.getElementById(a[i] + 'c' + a[i + 1] + 'b').innerHTML = '#' + RGB2Hex(rb, gb, bb) + '<br>' + colorB.formatCSS();
		document.getElementById(a[i] + 'c' + a[i + 1] + 'c').innerHTML = '#' + RGB2Hex(r,  g,  b)  + '<br>' + rgbColor.formatCSS();
		document.getElementById(a[i] + 'c' + a[i + 1] + 'd').innerHTML = '#' + RGB2Hex(rc, gc, bc) + '<br>' + colorC.formatCSS();
		document.getElementById(a[i] + 'c' + a[i + 1] + 'e').innerHTML = '#' + RGB2Hex(rd, gd, bd) + '<br>' + colorD.formatCSS();
	}
}

function DoKeyUp(rgbColor) {
	var i;
	thisid = obj.id;	
	// Hexadecimal
	thisval = obj.value;
	
	SetColors(rgbColor, Array('m', '1', 'c', '1', 'a', '2', 's', '2', 't', '1'));
	SetColors(rgbColor, Array('t', '2'));
	SetColors(rgbColor, Array('t', '3'));
	
	// complement
	complementHsv = RGB2HSV(rgbColor);
	complementHsv.hue = HueShift(complementHsv.hue, 180.0);
	complementRgb = HSV2RGB(complementHsv);
	SetColors(complementRgb, Array('c', '2'));
	
	// analogous
	analogousHsv = RGB2HSV(rgbColor);
	analogousHsv.hue = HueShift(analogousHsv.hue, angle);
	analogousRgb = HSV2RGB(analogousHsv);
	SetColors(analogousRgb, Array('a', '1'));
	
	// TODO
	temphsv = RGB2HSV(rgbColor);
	temphsv.hue = HueShift(temphsv.hue, 0.0 - angle);
	temprgb = HSV2RGB(temphsv);
	SetColors(temprgb, Array('a', '3'));
	
	// split complementary
	splitHsv = RGB2HSV(rgbColor);
	splitHsv.hue = HueShift(splitHsv.hue, 180.0 - angle);
	splitRgb = HSV2RGB(splitHsv);
	SetColors(splitRgb, Array('s', '1'));
	
	// TODO
	temphsv = RGB2HSV(rgbColor);
	temphsv.hue = HueShift(temphsv.hue, 180.0 + angle);
	temprgb = HSV2RGB(temphsv);
	SetColors(temprgb, Array('s', '3'));
}