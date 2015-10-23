class Tools {
    constructor()
    {

    }
    public rgbToHex(r, g, b) {
        return "0x" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    public hexToR(h):number {
        return parseInt((this.cutHex(h)).substring(0, 2), 16)
    }

    public hexToG(h) {
        return parseInt((this.cutHex(h)).substring(2, 4), 16)
    }

    public hexToB(h) {
        return parseInt((this.cutHex(h)).substring(4, 6), 16)
    }

    public cutHex(h:string) {
        return (h.charAt(0) == "#") ? h.substring(1, 7) : h
    }

    public componentToHex(c) {
        var hex = c.toString(16).toUpperCase();
        return hex.length == 1 ? "0" + hex : hex;
    }
}
