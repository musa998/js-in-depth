function Event(name, isAdult, id, date) {
    this.eventName = name;
    this.isForAdult = isAdult;
    this.id = id;
    this.clients = [];
    this.date = date;
}

function Client(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
}

var eventManager = {
        id: 1,
        allEvents: [],
        sistemWorks: true,
        /// Main tasks
        createEvent: function (eventName, isAdult = true, eventDate) {
            if (!eventName) {
                console.log("Event name is requred!");
                return;
            }
            if (this.sistemWorks == false) {
                console.log("Sistem is not working now");
                return;
            }
            var date = new Date(eventDate);
            var event = new Event(eventName, isAdult, this.id++, date);
            this.allEvents.push(event);

        }
        ,
        viewEvents: function () {
            for (let event of this.allEvents) {
                var age = '';
                if (event.isForAdult) {
                    age = "18+"
                }
                else {
                    age = "less than 18";
                }
                console.log(event.eventName + ': for ' + age);
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
        addClient: function (eventName, clientName, clientGender, clientAge) {
            var exist = false;
            if (!eventName || !clientAge || !clientGender || !clientAge) {
                console.log("Please enter all requred data!");
                return;
            }
            if (this.sistemWorks == false) {
                console.log("Sistem is not working now");
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
                        this.allEvents[i].clients.push(client);
                        console.log("Added sucessfully");
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
                                + ": " + this.allEvents[i].clients[j].gender);
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
    

    }
;


eventManager.createEvent("E1", true, "January 31 2005 12:30");
eventManager.createEvent("E2", false, "June 15 2014 13:20");
eventManager.createEvent("E3", false);
eventManager.createEvent("E4", true);
eventManager.updateEvent(2, "E2 updated", true);
eventManager.addClient("E2 updated", "Pesho", "male", 18);
eventManager.addClient("E4", "Ginka", "female", 38);
eventManager.addClient("E2 updated", "Batman", "male", 13);
eventManager.addClient("E1", "Topstera", "male", 14);
eventManager.addClient("E3", "Goshko", "male", 4);
eventManager.deleteClient("Pesho");
eventManager.viewClients(2, "female");
eventManager.manageSistem(false);
eventManager.addClient(6, "Praksh", "male", 55);
eventManager.viewEvents();
eventManager.viewMostVisitedEvent();
eventManager.viewMinors();
eventManager.viewGroupedEvents();

