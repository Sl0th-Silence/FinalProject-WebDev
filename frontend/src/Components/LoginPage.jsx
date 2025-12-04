/* the landing page will be a login form 
expecting a username and password to enter.
if credentials are valid, the page will 
automatically navigate to ROUTE("/main"), 
where the main GroceriesApp exists.
if credentials are invalid, the form should 
display a message that the username and password
are incorrect. if the username does not exist 
in the database, display a message stating that.
tgere is also a link to ROUTE("/create-user") 
to create a new user on the database. 
SEE SCREENSHOTS ON BLACKBOARD...
*/

export default function LoginPage() {
  return (
    <div>
      <p>This is a placeholder to remove the errors</p>
    </div>
  );
}
