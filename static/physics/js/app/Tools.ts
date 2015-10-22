class Tools {
    public rgbToHex(r, g, b) {
        return "0x" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    private hexToR(h) {
        return parseInt((this.cutHex(h)).substring(0, 2), 16)
    }

    private hexToG(h) {
        return parseInt((this.cutHex(h)).substring(2, 4), 16)
    }

    private hexToB(h) {
        return parseInt((this.cutHex(h)).substring(4, 6), 16)
    }

    private cutHex(h) {
        return (h.charAt(0) == "#") ? h.substring(1, 7) : h
    }

    private componentToHex(c) {
        var hex = c.toString(16).toUpperCase();
        return hex.length == 1 ? "0" + hex : hex;
    }
}
