class Events {
    private eventArray:any[];

    constructor() {}

    AddEvent(event)
    {
        this.eventArray.push(event);
    }

    resetTimeline() {
        for (var key in this.eventArray) {
            clearInterval(this.eventArray[key]);
        }
        this.eventArray = [];
    }
}