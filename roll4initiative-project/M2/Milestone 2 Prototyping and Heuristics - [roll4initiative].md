# Milestone 2: Prototyping and Heuristics - [roll4initiative]

## Storyboards
In the past milestone we identified the typical scenario that our app intends to support: an online session of RPG. For this purpose we imagined a group of friends trying to plan a live session, but unfortunately no one can actually meet up. So they decided to leverage the app in order to play at their homes. The two user needs we inferred are the following:
1. The possibility to share the game assets: in the storyboard the narrator can easily show the information to other players.
2. The capability to decide who can talk/listen to and when: the narrator decides not to be interrupted during the narration (muting all the players).

![storyboard](screen/storyboard.jpeg?raw=true "storyboard")

- The strenghts are:
  <br>
  - it clearly conveys the scope and target scenario that we want our app to support.
  - it completly covers the main user needs we chose before and at the end it shows a good level of satisfaction.
<br>

- The weaknesses are:
  <br>
  - it may turn out unclear to readers which do not know about the application domain.
  - it might appear confusing due to the time skip in the middle of the comic.
  
 

## Paper Prototypes
Having in mind the two user needs already mentioned in the introduction of the previous section, we tried to imagine different ways to satisfy them, in particular: 
- with the **prototype 1** our aim was to design a more structured approach that allows users to set up a game campaign/session, by defining, during its set up phase, every common aspect of an RPG (number of players involved, specific roles needed and their privacy, a clear definition of the narrator user, availabilty of dices).
- with the **prototype 2** instead, we focused more on the group of players than the game itself. Therefore the idea was to allow users to create their "rooms" in which to add friends (with no predefined limit), with a very light (almost none) set up phase and a more dinamical management of the players, roles and other features directly during the voice call.  

However, in both case the core features are the same pointed out by the storyboard, that is to say, a simple way to share useful information (documents, manual, dice rolls, etc...) between players along with an agile communication system mostly controlled by the narrator user.
<br>
<br>



### **Prototype 1**

![1.3](screen/1.3.jpg?raw=true "1.3")
***Screen 1**: the main interface of the app where are displayed the running games (with information about name of the campaign, creation date, and an icon which represent the user role in that game), a sidebar button and "+" button to add new game. The user can slide left a single game to archive it: as a feedback, the game will disappear from this screen.*
<hr>

![1.4](screen/1.4.jpg?raw=true "1.4")
***Screen 2**: the interface that appears when the user taps on sidebar button from screen 1. It shows user's profile picture with their username and 5 buttons: "My account" (to modify account settings), "Voice settings", "Game history" (to check archivied games and relative info), "Game assets" (to upload and manage the documents needed during the campaigns) and logout button.*
<hr>

![1.5](screen/1.5.jpg?raw=true "1.5")
***Screen 3**: the modal that appears when the user taps on "+" button from screen 1 that allows user to create a new game or join an existing one (using an invitation link sent by another user that created it).*
<hr>

![1.6](screen/1.6.jpg?raw=true "1.6")
***Screen 4**: the interface shown when a user taps on "create new game" from screen 3. It is specified that the user who is setting it up will fit the narrator role; hence this interface allows all the customisation needed (campaign name, number of players, secret/public roles, dices availability, definition of needed roles with their relative icon)*
<hr>

![1.7](screen/1.7.jpg?raw=true "1.7")
***Screen 5**: modal that pops up when tapping on the button to choose an icon for the role.*
<hr>

![1.8](screen/1.8.jpg?raw=true "1.8")
***Screen 6**: interface that shows up after tapping next from screen 4. Here the user can add the game assets needed during the campaign and can choose to upload a new one and select from the ones uploaded before in the settings interface (screen 2).*
<hr>

![1.9](screen/1.9.jpg?raw=true "1.9")
***Screen 7**: the screen that shows up the invitation link and relative buttons to copy and share it, after creating a game from screen 6. On the bottom of the screen a button "start!" allows to enter the game session.*
<hr>

![1.10](screen/1.10.jpg?raw=true "1.10")
***Screen 8**: the game interface. It shows:
 • The game title on the top with a button beside it to retrieve the inivitation link. <br>
 • The narrator username and icon highlighted and separated from other players usernames and icons by a button that allows to instantly mute all players (in order to enter in a narration phase of the game). <br>
 • Players icons, which portray icons chosen for their role in the game (if not secret), along with their username and role (if not secret). These icons behave like buttons that allow to mute and deafen users when pressed by the narrator (or to self mute when pressed by the users themselves).<br>
 • A game assets button that renders the list of document uploaded for the game. <br>
 • A dice button that leads to another modal which shows all the popular rollable dices.*
<hr>

![1.11](screen/1.11.jpg?raw=true "1.11")
***Screen 9**: the modal that shows up when the "game assets" button from screen 8 is pressed. It shows a list of useful document uploaded in the set up of the game.*
<hr>

![1.12](screen/1.12.jpg?raw=true "1.12")
***Screen 10**: After choosing a document from the previous screen, the file gets opened by an in-app reader that allows the user to highlight an area by holding it or easily see and reach the pages that other users are reading thanks to buttons on the scrollbar with their profile pictures. There are two buttons: one (back arrow) to go back to the assets list, and one (“x”) to completely close the modal and return to screen 8.*
<hr>

![1.13](screen/1.13.jpg?raw=true "1.13")
***Screen 11**: After tapping on the “dice” icon on screen 8, a modal with 6 button (one per type of dice) is shown. To roll one of them, you can simply tap it: this will insert a new entry in the shared “roll history” below, which shows everyone the result of your roll.*
<hr>

### **Prototype 2**

![2.0](screen/2.0.jpg?raw=true "2.0")
***Screen 1**: The main interface of the app showing the user’s rooms (with their icon and a button to show edit and delete options), a “bell” icon for notifications and a “+” button to add a new room. On the bottom there is a navigation bar to switch between the current screen and the user settings.*
<hr>

![2.1](screen/2.1.jpg?raw=true "2.1")
***Screen 2**: The user settings screen is shown after the user tapped the second icon (on the right) in the navigation bar from Screen 1, where user’s profile picture and information are shown and can be edited. Moreover, there are expandable titles to edit other settings about the voice calls and a button to log out.*
<hr>

![2.2](screen/2.2.jpg?raw=true "2.2")
***Screen 3**: The notification pop-up is shown after clicking the bell icon from screen 1, listing all the invitation received with two buttons for each to accept or decline them.*
<hr>

![2.3](screen/2.3.jpg?raw=true "2.3")
***Screen 4**: The room creation screen after the user tapped the "+" button from screen 1, where to customise its icon and name and invite friends through an autocompleting text box (the app queries registered accounts).*
<hr>

![2.4](screen/2.4.jpg?raw=true "2.4")
***Screen 5**: The screen that is showed right after the user tapped "confirm" button from screen 4. A text informs the user that the operation is successful and the creator gets connected to a voice channel with the role of narrator. The users are represented by their profile picture in cards and their (facultative) roles are represented by an icon placed on top left of the card. They can be disabled (muted and deafened) by tapping on them. There is a “book” icon to show the game assets and a “dice” icon to show the dices.*
<hr>

![2.5](screen/2.5.jpg?raw=true "2.5")
***Screen 6**: After tapping on the “book” icon from screen 5, a scrollable pop-up showing the game assets is shown, and it is possible to upload new ones if needed.*
<hr>

![2.6](screen/2.6.jpg?raw=true "2.6")
***Screen 7** :After choosing a document from screen 6, the file gets opened by an in-app reader that allows the user to highlight an area by holding it or easily see and reach the pages that other users are reading thanks to buttons on the scrollbar with their profile pictures. There are two buttons: one (back arrow) to go back to the assets list, and one (“x”) to completely close the modal screen and return to the room screen.*
<hr>

![2.7](screen/2.7.jpg?raw=true "2.7")
***Screen 8**: This screen shows the room screen when the user is not a narrator. The users can mute their microphone by tapping their own card.*
<hr>

![2.8](screen/2.8.jpg?raw=true "2.8")
***Screen 9**: After tapping on the “dice” icon, a modal with 6 button (one per type of dice) is shown. To roll one of them, you can simply tap it: this will insert a new entry in the shared “roll history” below which shows everyone the result of the users' roll.*
<hr>

![2.9](screen/2.9.jpg?raw=true "2.9")
***Screen 10**: This pop-up is displayed when a user card is held by a narrator. It shows three options to choose from and their labels (change role, disable user and kick out user). The second and central option will be triggered if the card is tapped once from the screen 5, as already specified.*
<hr>

![2.10](screen/2.10.jpg?raw=true "2.10")
***Screen 11**: This pop-up is shown when a user card is held by a (non-narrator) player. It shows three options to choose from and their labels (change role, mute and leave room). The first option is enabled only if there’s no narrator. The user can self assign different roles (narrator included). The second and central option will be triggered if the card is tapped once from screen 8, as already specified.*
<hr>

![2.11](screen/2.11.jpg?raw=true "2.11")
***Screen 12**: This pop-up is shown when the narrator card is held by themselves . It shows three options to choose from and their labels (change role, narrator mode and leave room). The second and central option will be triggered if the card is tapped once from the room screen: it mutes every player so the narrator can start the narration without being interrupted.*
<hr>

![2.12](screen/2.12.jpg?raw=true "2.12")
***Screen 13**: This screen shows the appearance of the room when the narration mode is enabled. All the room is dimmed but the narrator card, whose role icon has now another appearance. A text on the top of the screen informs that the narration mode is active.*
<hr>

## Heuristic Evaluation

Our group set up the hand-drawn prototypes on a tablet. We then ordered them in a way that it was quick to scroll and find the needed ones, basing on the widgets and their functionalities.

![setup](screen/setup.jpeg?raw=true "setup")
<br>
*Prototypes set up for the evaluators.*

The facilitator started both the evaluations describing the objective of the project and its target population. They found useful to check the evaluators' knowledge of the application domain (e.g. Do you know any role play games? Do you know Dungeons&Dragons? etc.), and explain how they generally work if needed. However, they kept doing so throughout all the activity due to some complex aspects of the domain.

![eva1](screen/eva1.jpeg?raw=true "eva1")
<br>
*The evaluator is pointing at the "add campaign" button; they find the icon anonymous and unclear.*

![eva2](screen/eva2.jpeg?raw=true "eva2")
<br>
*The evaluator is wondering if the assets are added the running campaign only or in a common folder?*

![eva3](screen/eva3.jpeg?raw=true "eva3")
<br>
*The evaluator is suggesting that the home button should take to the first screen it's pressed while already active, with a pop-up that asks for confirmation.*

![eva4](screen/eva4.jpeg?raw=true "eva4")
<br>
*The evaluator is recommending smaller icons for on-line users.*

<hr>

[**Heuristic evaluation spreadsheet [made by turinxstudent]**](evaluation/evaluation.xlsx)
<br>

Since we opted to merge the two prototypes, we report here the heuristics that lead us to keep or discard specific screens from both of them. The resulting prototype will be similar to the first one as for the game set-up approach, but it will inherit many graphic/interaction features from the second one: navbar, invitation system, voice-call layout, interaction modes with the items of the layouts (mostly press and hold).
<br/><br/>

**[P1] List of evaluations and related potential changes:**

1) **It's not clear how to archive existing campaigns.** 
   
   Changes:

   - Replace the sliding functionality with a "press and hold" to show the options.

   - Change "Slide left to archive a game" label text to "Press and hold a game to show the options".

2. **Buttons in the active campaign have many purposes, but they are not all clear.**

   Changes:

   - Make all the buttons in the application with the same shape so its easier to recognize them. (*consider voice-call layout of second prototype*)

3. **Come back to menu is hard and not intuitive.**
   
   Changes:

   - Add a "back" arrow in all the screens *(consider bottom navbar from second prototype)*.
   - Add a confirmation pop-up if the "back" action implies the interruption of an activity (creation of a game, voice channel connection etc.)

4. **Assets updated are added to just the running campaign or in common folder?**
   
   Changes:

   - Add a checkbox on upload to specify if the asset should be loaded in the personal space for game assets too (default: checked).

5. **It's not clear how to remove a joined participant.**

   Changes:

   - Add a press and hold feature to show options (*consider second prototype interaction mode*).

6. **It's necessary to distinguish between participants who need to paste a link, by which who already clicked on the link.**

   Changes:

   - Replace invitation link system with another based on the username (*consider second prototype invitation system*).

7. **It's not clear how confirm the role.**

   Changes:

    - Add a button to confirm custom roles.

8. **There is the need to add participants in a fast way, selecting 'friends'.** 

   Changes:

   - Add a list of recent users.

9. **It is not clear the button to upload a document.**

   Changes:

   - Make the function of the text more clear (for example using the button shape mentioned before).

10. **Lack of something that allows the user to confirm that he wants to create a new game.**

    Changes:

    - Add a pop-up to ask the user for confirmation.

**[P2] List of evaluations and related potential changes:**

1) **Notification button is confusing, no clear main purpose.** 
   
   Changes:

   - Remove notification indicator if the requests are seen already.

2) **Need for a 'ignore' option, after a request.**
   
   Changes:

   - Distinguish between seen and not seen.

3) **Distances in drag and drop options.**

   Changes:

   - Change interaction to tap and hold.

4) **Participants' icons are too big, need to scroll for see all of them.**

   Changes:

   	- Use smaller icons.

5) **Lack of a button that allows the user to return to the homepage.**
   
   Changes:

   - The home button should take to the first screen if it's pressed while already active (with a pop-up to ask for confirmation if a running activity is interrupted).
