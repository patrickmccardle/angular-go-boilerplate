package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/atompower/your-awesome-project/src/server/utils"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/rs/cors"
)

var db *gorm.DB
var err error

type event struct {
	ID          string `json:"ID"`
	Title       string `json:"Title"`
	Description string `json:"Description"`
}

type allEvents []event

var events = allEvents{
	{
		ID:          "1",
		Title:       "Introduction to Golang",
		Description: "Come join us for a chance to learn how golang works and get to eventually try it out",
	},
}

type schedule struct {
	ID        string `json:"ID"`
	PanelName string `json:"PanelName"`
	SwitchID  string `json:"SwitchID"`
	Operation string `json:"Operation"`
}

type allSchedules []schedule

var schedules = allSchedules{
	{
		ID:        "0",
		PanelName: "AtomPanel1",
		SwitchID:  "273",
		Operation: "Closed",
	},
}

type User struct {
	Email string `json:"Email"`
	Name  string `json:"Name"`
	Role  int    `json:"Role"`
}

var userList []User

func getAllUsers(w http.ResponseWriter, r *http.Request) {

	// var users []User
	// db.Raw("SELECT * from users").Scan(&users)
	// fmt.Println("{}", users)
	// fmt.Println("{}", &users)
	// users := make([]*User, 0)
	// db.Table("users").Find(&users)
	// // at this point allUsers is a []*User (array of pointers to a User type)
	// fmt.Println(&users)
	// fmt.Println(users)
	// json.NewEncoder(w).Encode(&users)

	users := []User{}
	if err := db.Find(&users).Error; err != nil {
		// r.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(users)
		fmt.Println(&users)
		json.NewEncoder(w).Encode(users)
	}

}

func getUser(w http.ResponseWriter, r *http.Request) {
	userEmail := mux.Vars(r)["Email"]
	var user User
	if err := db.Where("Email = ?", userEmail).First(&user).Error; err != nil {
		// r.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(&user)
		json.NewEncoder(w).Encode(&user)
	}
	// for _, singleUser := range users {
	// 	if singleUser.Email == userEmail {
	// 		json.NewEncoder(w).Encode(singleUser)
	// 	}
	// }
}

func updateUser(w http.ResponseWriter, r *http.Request) {
	userEmail := mux.Vars(r)["Email"]
	var updatedUser User

	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Kindly enter data with the event title and description only in order to update")
	}
	json.Unmarshal(reqBody, &updatedUser)

	for i, singleUser := range userList {
		if singleUser.Email == userEmail {
			db.First(&singleUser)
			singleUser.Name = updatedUser.Name
			singleUser.Role = updatedUser.Role
			db.Save(&singleUser)
			userList = append(userList[:i], singleUser)
			json.NewEncoder(w).Encode(singleUser)
		}
	}
}

func deleteUser(w http.ResponseWriter, r *http.Request) {
	userEmail := mux.Vars(r)["Email"]

	for i, singleUser := range userList {
		if singleUser.Email == userEmail {
			userToDelete := User{Email: singleUser.Email}
			fmt.Println(userToDelete)
			fmt.Println(userEmail)
			db.Where("Email = ?", userEmail).Delete(&userToDelete)
			userList = append(userList[:i], userList[i+1:]...)
			fmt.Fprintf(w, "The user with email %v has been deleted successfully", userEmail)
		}
	}
}

func createUser(w http.ResponseWriter, r *http.Request) {
	// var u2 user   // identify a Person type for us to store the results in
	// db.First(&u2) // Find the first record in the Database and store it in p3
	// fmt.Println(u1.Email)
	// fmt.Println(u2.Role)
	var newUser User
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Kindly enter data with the event title and description only in order to update")
	}
	fmt.Println(reqBody)
	json.Unmarshal(reqBody, &newUser)
	u1 := User{Email: newUser.Email, Name: newUser.Name, Role: newUser.Role}
	db.Create(&u1)
	fmt.Println(newUser)
	fmt.Println(newUser.Email)
	json.NewEncoder(w).Encode(newUser)
	fmt.Println(newUser)
}

func getAllSchedules(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(schedules)
}

func deleteSchedule(w http.ResponseWriter, r *http.Request) {
	scheduleID := mux.Vars(r)["id"]

	for i, singleEvent := range events {
		if singleEvent.ID == scheduleID {
			events = append(events[:i], events[i+1:]...)
			fmt.Fprintf(w, "The event with ID %v has been deleted successfully", scheduleID)
		}
	}
}

func homeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!")
}

func createEvent(w http.ResponseWriter, r *http.Request) {
	var newEvent event
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Kindly enter data with the event title and description only in order to update")
	}

	json.Unmarshal(reqBody, &newEvent)
	events = append(events, newEvent)
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(newEvent)
}

func getOneEvent(w http.ResponseWriter, r *http.Request) {
	eventID := mux.Vars(r)["id"]

	for _, singleEvent := range events {
		if singleEvent.ID == eventID {
			json.NewEncoder(w).Encode(singleEvent)
		}
	}
}

func getAllEvents(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(events)
}

func updateEvent(w http.ResponseWriter, r *http.Request) {
	eventID := mux.Vars(r)["id"]
	var updatedEvent event

	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Kindly enter data with the event title and description only in order to update")
	}
	json.Unmarshal(reqBody, &updatedEvent)

	for i, singleEvent := range events {
		if singleEvent.ID == eventID {
			singleEvent.Title = updatedEvent.Title
			singleEvent.Description = updatedEvent.Description
			events = append(events[:i], singleEvent)
			json.NewEncoder(w).Encode(singleEvent)
		}
	}
}

func deleteEvent(w http.ResponseWriter, r *http.Request) {
	eventID := mux.Vars(r)["id"]

	for i, singleEvent := range events {
		if singleEvent.ID == eventID {
			events = append(events[:i], events[i+1:]...)
			fmt.Fprintf(w, "The event with ID %v has been deleted successfully", eventID)
		}
	}
}

func helloWorld(w http.ResponseWriter, r *http.Request) {
	var data = struct {
		Title string `json:"title"`
	}{
		Title: "Golang + Angular Starter Kit",
	}

	jsonBytes, err := utils.StructToJSON(data)
	if err != nil {
		fmt.Print(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonBytes)
	return
}

func main() {
	db, err = gorm.Open("sqlite3", "myTest.db")
	if err != nil {
		fmt.Print(err)
	}
	defer db.Close()
	db.AutoMigrate(&User{})
	// u1 := user{Email: "demo@atompower.com", Name: "demo", Role: 1}
	// db.Create(&u1)
	// var u2 user   // identify a Person type for us to store the results in
	// db.First(&u2) // Find the first record in the Database and store it in p3
	// fmt.Println(u1.Email)
	// fmt.Println(u2.Role)

	r := mux.NewRouter()
	// r.HandleFunc("/", homeLink)
	r.HandleFunc("/event", createEvent).Methods("POST")
	r.HandleFunc("/events", getAllEvents).Methods("GET")
	r.HandleFunc("/events/{id}", getOneEvent).Methods("GET")
	r.HandleFunc("/events/{id}", updateEvent).Methods("PATCH")
	r.HandleFunc("/events/{id}", deleteEvent).Methods("DELETE")
	// r.HandleFunc("/users/{userID}", deleteSchedule).Methods("DELETE")
	r.HandleFunc("/schedules", getAllSchedules).Methods("GET")
	r.HandleFunc("/schedules/{scheduleID}", deleteSchedule).Methods("DELETE")
	r.HandleFunc("/users", getAllUsers).Methods("GET")
	r.HandleFunc("/user/{Email}", getUser).Methods("GET")
	r.HandleFunc("/user/{Email}", deleteUser).Methods("DELETE")
	r.HandleFunc("/user/update/{Email}", updateUser).Methods("PATCH")
	r.HandleFunc("/createUser", createUser).Methods("POST")
	r.HandleFunc("/hello-world", helloWorld)

	// Solves Cross Origin Access Issue
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:4200", "http://localhost"},
		AllowedMethods: []string{http.MethodGet, http.MethodPatch, http.MethodPost, http.MethodDelete},
	})
	handler := c.Handler(r)

	srv := &http.Server{
		Handler: handler,
		Addr:    ":" + os.Getenv("PORT"),
	}

	log.Fatal(srv.ListenAndServe())
}
