/*----------------/
/-For Author Page-/
/----------------*/

/*Get all author information*/
SELECT * FROM Author;

/*Get one specific author by ID*/
SELECT * FROM Author WHERE AuthorID=?;

/*Add a new author*/
INSERT INTO Author (FirstName, LastName, Email) VALUES (?,?,?);

/*Update author information*/
UPDATE Author SET FirstName=? , LastName=?, Email=? WHERE AuthorID=?;

/*Delete an author*/
DELETE FROM Author WHERE AuthorID = ?;

/*--------------------------/
/-Add Ingredients to Recipe-/
/-------------------------*/

/*Display Ingredient ID, Name and Unit Name in table*/
SELECT Ingredients.IngredientID, Ingredients.IngredientName, Units.UnitName FROM Ingredients INNER JOIN Units ON Ingredients.UnitID = Units.UnitID

/*Select Recipe ID and Title from Recipe*/
SELECT RecipeID, RecipeTitle FROM Recipe;

/*Select Recipe Title, Ingredient Name, Quantity and Unit Name*/
SELECT Recipe.RecipeTitle, Ingredients.IngredientName, Recipe_Ingredients.QuantityOfIngredient, Units.UnitName FROM Recipe_Ingredients 
INNER JOIN Recipe ON Recipe.RecipeID = Recipe_Ingredients.RecipeID INNER JOIN Ingredients ON Ingredients.IngredientID = Recipe_Ingredients.IngredientID 
INNER JOIN Units ON Units.UnitID = Ingredients.UnitID;

/*Add a relationship between a recipe and an ingredient with quantity*/
NSERT INTO Recipe_Ingredients (RecipeID, IngredientID, QuantityOfIngredient) VALUES (?, ?, ?)

/*------------------/
/-For Category Page-/
/------------------*/

/*Select Category ID's and names*/
SELECT CategoryID, CategoryName FROM Category;

/*----------------/
/-For Course Page-/
/----------------*/

/*Populate Course table with Course ID's and Course names*/
SELECT CourseID, CourseName FROM Courses;

/*Add a new Course*/
INSERT INTO Courses (CourseName) VALUES (?);


/*--------------------/
/-For Ingredient Page-/
/--------------------*/

/*Select all Ingredient ID, Name, Unit ID and Name*/
SELECT Ingredients.IngredientID, Ingredients.IngredientName, Ingredients.UnitID, Units.UnitName 
FROM Ingredients INNER JOIN Units ON Ingredients.UnitID = Units.UnitID ORDER BY Ingredients.IngredientID;

/*Select all units information*/
SELECT UnitID, UnitName FROM Units;

/*Add a new ingredient*/
INSERT INTO Ingredients (IngredientName, UnitID) VALUES (?,?);

/*--------------------/
/---Recipe-Category---/
/--------------------*/

/*Get categories*/
SELECT CategoryID, CategoryName FROM Category;

/*Get recipes*/
SELECT RecipeID, RecipeTitle FROM Recipe;

/*Add a recipe-category relationship*/
INSERT INTO Recipe_Category (RecipeID, CategoryID) VALUES (?, ?);

/*Delete a recipe-category relationship*/
DELETE FROM Recipe_Category WHERE CategoryID = ? AND RecipeID = ?;

/*Displaying list of categories and relationships to recipes*/
SELECT Category.CategoryID, Recipe.RecipeID, CategoryName AS 'Category', IFNULL (Recipe.RecipeTitle, '(No recipes available)') 
AS 'Title' FROM Category LEFT JOIN Recipe_Category ON Category.CategoryID = Recipe_Category.CategoryID 
LEFT JOIN Recipe ON Recipe_Category.RecipeID = Recipe.RecipeID ORDER BY Category.CategoryName;

/*----------------/
/-For Recipe Page-/
/----------------*/

/*Get Category*/
SELECT CategoryID, CategoryName FROM Category;

/*Get Courses*/
SELECT CourseID, CourseName FROM Courses;

/*Get Authors*/
SELECT AuthorID, FirstName, LastName, Email FROM Author;

/*Get Recipes table - display Author and Course by name not ID*/
SELECT Recipe.RecipeID, Recipe.RecipeTitle, Recipe.CookingTime, Recipe.Servings, Recipe.AuthorID, Recipe.CourseID, 
concat(Author.FirstName, ' ', Author.LastName) as FullName, Courses.CourseName FROM Recipe 
INNER JOIN Author ON Recipe.AuthorID = Author.AuthorID INNER JOIN Courses ON Recipe.CourseID = Courses.CourseID;

/*Get a single recipe for purposes of sending information to be edited*/
SELECT Recipe.RecipeID, Recipe.RecipeTitle, Recipe.CookingTime, Recipe.Servings, Recipe.AuthorID, Recipe.CourseID, 
Courses.CourseName, concat(Author.FirstName, ' ', Author.LastName) AS FullName FROM Recipe 
INNER JOIN Author ON Recipe.AuthorID = Author.AuthorID INNER JOIN Courses ON Recipe.CourseID = Courses.CourseID WHERE RecipeID=?;

/*Two insert statements for adding a new recipe and adding a recipe category relationship at the same time*/
INSERT INTO Recipe (RecipeTitle, CookingTime, Servings, AuthorID, CourseID) VALUES (?, ?, ?, ?, ?);
INSERT INTO Recipe_Category (RecipeID, CategoryID) VALUES (?, ?);

/*Update a recipe*/
UPDATE Recipe SET RecipeTitle=?, CookingTime=?, Servings=?, CourseID=?, AuthorID=? WHERE RecipeID=?;

/*Delete a recipe*/
DELETE FROM Recipe WHERE RecipeID = ?;

/*---------------/
/-For Units Page-/
/---------------*/

/*Get all units*/
SELECT UnitID, UnitName FROM Units;

/*Add a new unit*/
INSERT INTO Units (UnitName) VALUES (?);



