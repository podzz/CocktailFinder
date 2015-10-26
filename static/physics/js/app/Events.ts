/**
 * Created by Francois on 12/10/15.
 */
class Events {
    constructor()
    {

    }
    eventArray:any[];

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