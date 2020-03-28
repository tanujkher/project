# Dengue Awareness and Blood Donation Site

## 1. Description

A simple project with signup, signin, authentication and express-sessions to keep track of logged in user followed by retrieving and storing data from user. Using this data to create a blood donation list for users in emergency and also telling the user about the state of completion of his profile.

## 2. NPM Libraries and Database used

* Express - for setting up server
* Express-Session - for keeping track of logged in user
* Hbs - To use handlebars for server side rendering of pages like profile, signup and signin with information from database
* Sequelize - To facilitate switching from one databse to another, make all functions generic and to add information to database
* Sqlite - To store data within the data file and not making database system specific

## 3. Run the Server

node server.js

## 4. URLs

### Signup: http://localhost:7722/signup

#### Signup form
![Signup Page](./screenshots/signup.png)

#### Error in case of leaving any field blank
![Signup Page Error](./screenshots/signup-error.png)

#### Successfull Signup
![Signup Page Error](./screenshots/signup-success.png)

### Signin: http://localhost:7722/signin

#### Signin page
![Signin Page](./screenshots/signin.png)

#### Wrong username
![Signup Page Username](./screenshots/signin-error.png)

#### Wrong password
![Signin Page Error](./screenshots/signin-error-pass.png)

### Profile Page: http://localhost:7722/profile (redirects to Signin if not logged in)
![Profile Page](./screenshots/profile.png)

#### Complete profile and Profile strength
![Profile Bar](./screenshots/complete-profile.png)

based on the number of entries filled in Complete Profile form (stored in Users table)
![Users db](./screenshots/screenshot-db.png)
![Profile bar half](./screenshots/profile-strength.png)
![Users db](./screenshots/profile-bar-comp.png)

#### Donate and Emergency Button
![Donate and Emergency](./screenshots/donate-emergency.png)

Redirect to details form in case of missing required details with the corresponding error
![Donate error](./screenshots/donate-error.png)
![Emergency error](./screenshots/emergency-error.png)

Donate button enlists user for donation in case required details are available and adds a tick in front of enlisted user's username
![Donation enlisted](./screenshots/donation-enlisted.png)

#### Emergency Response
Shows a list of all users who are enlisted and have same blood group and their details
![Emergency response](./screenshots/emergency-response.png)

Exchange info and error in case of sending exchange request again
![Emergency response success](./screenshots/sending-request.png)
![Emergency response error](./screenshots/sending-info-again.png)

Reflection on the request bar of user with whom information is exchanged
![Request bar](./screenshots/request-bar.png)

## 5. Heroku Link

### https://dengue-project.herokuapp.com/
