function Event(name, isAdult, id, date, price) {
    this.eventName = name;
    this.isForAdult = isAdult;
    this.id = id;
    this.clients = [];
    this.date = date;
    this.entryPrice = price;
    this.isArhived = false;

}

function Client(name, gender, age, walet, id) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.walet = walet;
    this.isVip = false;
}

var eventManager = {
        id: 1,
        allEvents: [],
        sistemWorks: true,
        /// Main tasks
        createEvent: function (eventName, isAdult = true, eventDate, price = 0) {
            if (!eventName) {
                console.log("Event name is requred!");
                return;
            }
            if (this.sistemWorks == false) {
                console.log("Sistem is not working now");
                return;
            }
            var date = new Date(eventDate);
            var event = new Event(eventName, isAdult, this.id++, date, price);
            this.allEvents.push(event);

        }
        ,
        viewEvents: function () {
            var eventMark = "";
            for (let event of this.allEvents) {
                var age = '';
                if (event.isForAdult) {
                    age = "18+"
                }
                else {
                    age = "less than 18";
                }
                if (event.entryPrice > 0) eventMark = "$";
                else eventMark = "!";

                console.log(eventMark + event.eventName + ': for ' + age);
            }
        }
        ,
        deleteEvent: function (eventId) {
            var idExist = false;
            for (var i = 0; i < allEvents.length; i++) {
                if (allEvents[i].id == eventId) {
                    allEvents.splice(i, 1);
                    idExist = true;
                }
            }
            if (idExist) {
                console.log("Sucessfully deleted!");
            }
            else {
                console.log("Event with this id does not exist!");
            }
        }
        ,
        updateEvent: function (id, newEventName, newLimitation) {
            let updated = false;
            if (!newEventName) {
                console.log("Event name requred!");
                return;
            }
            if (!newLimitation) {
                newLimitation = true;
            }

            for (var i = 0; i < this.allEvents.length; i++) {
                if (this.allEvents[i].id == id) {
                    updated = true;
                    this.allEvents[i].eventName = newEventName;
                    this.allEvents[i].isForAdult = newLimitation;
                }
            }
            if (updated) {
                console.log("Sucessfull update")
            }
            else {
                console.log("Can not find event with this id.")
            }
        }
        ,
        addClient: function (eventName, clientName, clientGender, clientAge, walet = 0) {
            var exist = false;
            if (!eventName || !clientAge || !clientGender || !clientAge) {
                console.log("Please enter all requred data!");
                return;
            }
            if (this.sistemWorks == false) {
                console.log("Sistem is not working now");
                return;
            }
            if (walet == 0) {
                console.log("You should first add some money to your walet");
                return;
            }

            for (var i = 0; i < this.allEvents.length; i++) {
                if (this.allEvents[i].eventName === eventName) {
                    exist = true;
                    var client = new Client(clientName, clientGender, clientAge);
                    if (clientAge < 18 && this.allEvents[i].isForAdult == true) {
                        console.log("This event is for adults");
                        return;
                    }
                    else {
                        if (this.allEvents[i].entryPrice > walet) {
                            console.log("Sorry you dont have enough money for this event");
                        }
                        else {


                            this.allEvents[i].clients.push(client);
                            if (this.canBeVip(client) == false) {
                                walet -= this.allEvents[i].entryPrice;
                            }
                            console.log("Added sucessfully");
                        }
                    }
                }
            }
            if (exist == false) {
                console.log("Event with this name does not exist");
            }
        }
        ,
        viewClients: function (preferedEventName, preferedGender) {
            var genderExist = false;
            if (!preferedEventName) {
                console.log("Please enter event name you want");
            }
            for (var i = 0; i < this.allEvents.length; i++) {
                if (!preferedGender) {
                    if (this.allEvents[i].eventName === preferedEventName) {
                        for (var j = 0; j < this.allEvents[i].clients.length; j++) {
                            console.log(this.allEvents[i].clients[j].name
                                + ": " + this.allEvents[i].clients[j].age
                                + ": " + this.allEvents[i].clients[j].gender
                                + ": " + this.allEvents[i].id);
                        }
                    }
                }
                else {
                    for (var j = 0; j < this.allEvents[i].clients.length; j++) {
                        if (this.allEvents[i].clients[j].gender == preferedGender) {
                            genderExist = true;
                            console.log(this.allEvents[i].clients[j].name
                                + ": " + this.allEvents[i].clients[j].age
                                + ": " + this.allEvents[i].clients[j].gender);
                        }
                    }
                }
            }
            if (genderExist == false) {
                console.log("Event doesnt have clients or the gender input is incorect!");
            }
        }
        ,

        deleteClient: function (name) {
            if (!name) {
                console.log("Incorrect client name")
            }
            var clientExist = false;
            for (var i = 0; i < this.allEvents.length; i++) {
                for (var j = 0; j < this.allEvents[i].clients.length; j++) {
                    if (this.allEvents[i].clients[j].name === name) {
                        this.allEvents[i].clients.splice(j, 1);
                        console.log("Client removed !");
                        clientExist = true;
                    }
                }
            }
            if (clientExist == false)
                console.log("Client with this name does not exist");
        },
        // Aditional tasks
        manageSistem: function (command) {

            this.sistemWorks = command;
        },
        viewMostVisitedEvent: function () {
            var clientsNum = 0;
            var eventExist = false;
            var mostVisitedE = "";
            for (let event of this.allEvents) {
                eventExist = true;
                var eventClients = event.clients.length;
                if (clientsNum == eventClients && clientsNum > 0) {
                    mostVisitedE += ", " + event.eventName;
                }
                if (clientsNum < eventClients) {
                    clientsNum = eventClients;
                    mostVisitedE = event.eventName;
                }

            }
            if (mostVisitedE !== "") {
                console.log("Most visidet event is: " + mostVisitedE);
            }
            if (clientsNum == 0) {
                console.log("There is no clients yet");
            }
            if (eventExist == false) {
                console.log("There is no events yet");
            }

        },
        viewMinors: function () {
            var eventsExist = false;
            console.log("Events for minors .....");
            for (let event of this.allEvents) {
                if (event.isForAdult == false) {
                    eventsExist = true;
                    console.log(event.eventName);
                }
            }
            if (eventsExist == false) {
                console.log("The is no events for minors");
            }

        },
        viewGroupedEvents: function () {
            for (let event of this.allEvents) {
                if (event.isForAdult) {
                    console.log("* -" + event.eventName);
                }
            }
            for (let event of this.allEvents) {
                if (event.isForAdult == false) {
                    console.log("# -" + event.eventName);
                }
            }
        },
        /// TODO
        filterEvents: function () {

        },
        canBeVip: function (client) {
            var counter = 0;
            for (var j = 0; j < this.allEvents.length; j++) {
                for (var k = 0; k < this.allEvents[j].clients.length; k++) {
                    if (this.allEvents[j].clients[k].name === client.name) {
                        counter++;
                    }
                }
            }
            if (counter == 5) {
                client.isVip = true;
                return true;
            }

            client.isVip = false;
            return false
        },
        arhiveEvent: function (status) {
            if 

        }

    }
;


eventManager.createEvent("E1", true, "January 31 2005 12:30");
eventManager.createEvent("E2", false, "June 15 2014 13:20");
eventManager.createEvent("E3", false, "", 44);
eventManager.createEvent("E4", true);
//eventManager.updateEvent(2, "E2 updated", true);
eventManager.addClient("E2", "Pesho", "male", 18, 44);
eventManager.addClient("E4", "Ginka", "female", 38, 3);
eventManager.addClient("E2", "Batman", "male", 13, 4);
eventManager.addClient("E1", "Topstera", "male", 14, 67);
eventManager.addClient("E3", "Goshko", "male", 4, 150);
eventManager.addClient("E3", "Goshko", "male", 5, 150);
eventManager.addClient("E3", "Goshko", "male", 66, 150);
eventManager.addClient("E3", "Goshko", "male", 64, 150);
eventManager.addClient("E3", "Goshko", "male", 13, 150);
eventManager.addClient("E3", "Goshko", "male", 13, 1550);

//eventManager.deleteClient("Pesho");
eventManager.viewClients("E2");
eventManager.manageSistem(false);
eventManager.addClient(6, "Praksh", "male", 55);
eventManager.viewEvents();
// eventManager.viewMostVisitedEvent();
eventManager.viewMinors();
// eventManager.viewGroupedEvents();

