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

// TODO : USER INTERFACE FUNCTION
// Returns n if l < n < h, l if lower than l, h if upper
function PutInRange(n, l, h) { 
	return (n < l) ? l : ((n > h) ? h : n);
}

function SetHex(objid, val, i) {
	var ob;
	var hexval = Dec2Hex(val);
	eval('save' + objid + '="' + hexval + '"');
	document.getElementById(objid).value = hexval;
	if (i) {
		ob = document.getElementById('hex');
		ob.value =
			((i == 1) ? hexval : ob.value.substr(0, 2))
			+ ((i == 2) ? hexval : ob.value.substr(2, 2))
			+ ((i == 3) ? hexval : ob.value.substr(4, 2));
	}
}

function SetDec(objid, val, i) {
	var ob;
	var j;
	var thisval = Hex2Dec(val);
	eval('save' + objid + '="' + thisval + '"');
	document.getElementById(objid).value = thisval;
	if (val.length > 2) {
		val = substr(val, 0, 2);
	} else {
	 	for (j = val.length; j < 2; j++) {
	 		val += '0';
		}	
	}
	if (i) {
		// Get hex input value
		ob = document.getElementById('hex');
		ob.value =
			((i == 1) ? val : ob.value.substr(0, 2))
			+ ((i == 2) ? val : ob.value.substr(2, 2))
			+ ((i == 3) ? val : ob.value.substr(4, 2));
	}
}

function DoKeyUp(obj) {
	var i;
	thisid = obj.id;
	// Hexadecimal
	thisval = obj.value;
	if (thisval != eval('save' + thisid)) {
		if (thisid == 'ri') {
			SetHex('rih', thisval, 1);
		}
		else if (thisid == 'gi') {
			SetHex('gih', thisval, 2);
		}
		else if (thisid == 'bi') {
			SetHex('bih', thisval, 3);
		}
		else if (thisid == 'rih') {
			SetDec('ri', thisval, 1);
		}
		else if (thisid == 'gih') {
			SetDec('gi', thisval, 2);
		}
		else if (thisid == 'bih') {
			SetDec('bi', thisval, 3);
		}
		else if (thisid == 'hex') {
			for (i = thisval.length; i < 6; i++) {
				thisval += '0';
			}
			SetDec('ri', thisval.substr(0, 2), 0);
			SetDec('gi', thisval.substr(2, 2), 0);
			SetDec('bi', thisval.substr(4, 2), 0);
			SetHex('rih', Hex2Dec(thisval.substr(0, 2)), 0);
			SetHex('gih', Hex2Dec(thisval.substr(2, 2)), 0);
			SetHex('bih', Hex2Dec(thisval.substr(4, 2)), 0);
		}
		eval('save' + thisid + '="' + thisval + '"');
		if (saveri.length && savegi.length && savebi.length && saveangle.length &&
			savegrade1.length && savegrade2.length && savegrade3.length && savegrade4.length)
		{
			running = running ? 2 : 1;
			while (running) {
				r = parseInt(saveri);
				g = parseInt(savegi);
				b = parseInt(savebi);
				angle = parseFloat(saveangle);

				// Data checking on input values
				grade1 = PutInRange(parseFloat(savegrade1), 0.0, 1.0);
				grade2 = PutInRange(parseFloat(savegrade2), 0.0, 1.0);
				grade3 = PutInRange(parseFloat(savegrade3), 0.0, 1.0);
				grade4 = PutInRange(parseFloat(savegrade4), 0.0, 1.0);

				if (running == 2) { 
					running = 1;
					continue;
				}
				
				SetColors(r, g, b, Array('m', '1', 'c', '1', 'a', '2', 's', '2', 't', '1'));
				if (running == 2) {
					running = 1;
					continue;
				}
				
				SetColors(g, b, r, Array('t', '2'));
				if (running == 2) {
					running = 1;
					continue;
				}
				
				SetColors(b, r, g, Array('t', '3'));
				if (running == 2) {
					running = 1;
					continue;
				}
				
				thisrgb = new Object();
				thisrgb.r = r;
				thisrgb.g = g;
				thisrgb.b = b;
				
				// complement
				complementRgb = thisrgb;
				complementHsv = RGB2HSV(complementRgb);
				complementHsv.hue = HueShift(complementHsv.hue, 180.0);
				complementRgb = HSV2RGB(complementHsv);
				SetColors(complementRgb.r, complementRgb.g, complementRgb.b, Array('c', '2'));
				if (running == 2) {
					running = 1;
					continue;
				}
				
				// analogous
				analogousRgb = thisrgb;
				analogousHsv = RGB2HSV(analogousRgb);
				analogousHsv.hue = HueShift(analogousHsv.hue, angle);
				analogousRgb = HSV2RGB(analogousHsv);
				SetColors(analogousRgb.r, analogousRgb.g, analogousRgb.b, Array('a', '1'));
				if (running == 2) {
					running = 1;
					continue;
				}
				
				// TODO
				temprgb = thisrgb;
				temphsv = RGB2HSV(temprgb);
				temphsv.hue = HueShift(temphsv.hue, 0.0 - angle);
				temprgb = HSV2RGB(temphsv);
				SetColors(temprgb.r, temprgb.g, temprgb.b, Array('a', '3'));
				if (running == 2) {
					running = 1;
					continue;
				}
				
				// split complementary
				splitRgb = thisrgb;
				splitHsv = RGB2HSV(splitRgb);
				splitHsv.hue = HueShift(splitHsv.hue, 180.0 - angle);
				splitRgb = HSV2RGB(splitHsv);
				SetColors(splitRgb.r, splitRgb.g, splitRgb.b, Array('s', '1'));
				if (running == 2) {
					running = 1;
					continue;
				}
				
				// TODO
				temprgb = thisrgb;
				temphsv = RGB2HSV(temprgb);
				temphsv.hue = HueShift(temphsv.hue, 180.0 + angle);
				temprgb = HSV2RGB(temphsv);
				SetColors(temprgb.r, temprgb.g, temprgb.b, Array('s', '3'));
				if (running == 2) {
					running = 1;
					continue;
				}
				
				running = 0;
			}
		}
	}
}





saveri = "0";
savegi = "0";
savebi = "0";
saverih = "00";
savegih = "00";
savebih = "00";
savehex = "000000";
saveangle = "30.0";
savegrade1 = "0.8";
savegrade2 = "0.4";
savegrade3 = "0.6";
savegrade4 = "0.3";
running = 0;

function ColorWheelInit() {
	document.getElementById('ri').onkeyup = function() { DoKeyUp(this); }
	document.getElementById('gi').onkeyup = function() { DoKeyUp(this); }
	document.getElementById('bi').onkeyup = function() { DoKeyUp(this); }
	document.getElementById('rih').onkeyup = function() { DoKeyUp(this); }
	document.getElementById('gih').onkeyup = function() { DoKeyUp(this); }
	document.getElementById('bih').onkeyup = function() { DoKeyUp(this); }
	document.getElementById('hex').onkeyup = function() { DoKeyUp(this); }
	document.getElementById('angle').onkeyup = function() { DoKeyUp(this); }
	document.getElementById('grade1').onkeyup = function() { DoKeyUp(this); }
	document.getElementById('grade2').onkeyup = function() { DoKeyUp(this); }
	document.getElementById('grade3').onkeyup = function() { DoKeyUp(this); }
	document.getElementById('grade4').onkeyup = function() { DoKeyUp(this); }
	DoKeyUp(document.getElementById('grade4'));
}

window.onload = function() {
	ColorWheelInit();
}