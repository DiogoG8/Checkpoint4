CREATE DATABASE innerstudy;

USE innerstudy;

CREATE TABLE
    users(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255),
        tos BOOLEAN,
        newsletter BOOLEAN
    ) COMMENT '';

CREATE TABLE
    content(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        topic VARCHAR(255),
        Type VARCHAR content VARCHAR(2000)
    ) COMMENT '';

CREATE TABLE
    contact(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        topic VARCHAR(255) NOT NULL,
        issue VARCHAR(255) NOT NULL
    ) COMMENT '';

INSERT INTO
    content(id, `Type`, topic, content)
VALUES (
        1,
        'React',
        'Context',
        '<h1>How to work with React Context - Creating a Context! </h1>
<br>
<br>
 <h2> In a ContextFile.js:</h2>


<p>import { createContext } from "react"; 
<p>const MovieContext = createContext();
<p>export default MovieContext;</p>
<br>
<br>
 <h2>In a ComponentProvided.js:</h2>
 <h3>To consume a Context we need to import the useContext to the component where we use Provide!</h3>


<p>import React, { useContext } from  react ;</p>
<p>import MovieContext from ../ contexts / MovieContext ; 

<p>function MoviesList() {</p>
  <p>const { movies } = useContext(MovieContext); 
   <br>'
    )
INSERT INTO
    content(id, `Type`, topic, content)
VALUES (
        2,
        'JavaScript',
        'If Statements',
        '<h1>If and Else - the condition statements!</h1>
<br>
<br>
<h2>If statement "working" with Else statement:</h2>
<p>const person = "Not Bob";</p>
<p>if (person === "Bob") {</p>
  <p>console.log("Hello");
} </p>
 <p>else  {</p>
  <p>console.log("Go away")};</p>
<br>
<h2>We can also use operators like, or (||) and and (&&):</h2>


<p>const number = "10"</p>

<p>const number2 = "12"</p>

<p>if (number === "5" (&& - and) (|| - or) number2==="5") {</p>

  <p>console.log("Hello")}</p>
'
    )
INSERT INTO
    content(id, `Type`, topic, content)
VALUES (
        3,
        'JavaScript',
        'Data Types',
        '<h1>Data types - What are they?</h1>
<br>
<br>
<h2>Data Types are related with "Typeof" command. They define the data of different values!</h2

<p>Data Types can be distributed in two groups; Permitive and Non Permitive:</p>
<br>
<h3>Permitive:</h3>

<p>Value immutable, cannot change:</p>

<p>console.log(typeof 1); ---> It is a "number"</p>

<p>console.log(typeof "Bob"); ---> It is a "string"</p>


<br>

<h3>Non-permitive:</h3>

<p>Value mutable, can change. They give value objects; They can be: </p>

<p>console.log(typeof console.log)</p>

<p>console.log(typeof person);</p>


<h3>Array is not a data-type. Its a type of object. This is the only exception!</h3>'
    )
INSERT INTO
    content(id, `Type`, topic, content)
VALUES (
        4,
        'React',
        'Props',
        '<h1>How to use React props - Array Example!</h1>
<br>
<br>
<h2>Lets use the next array (with an object as an example):</h2>
<p>const contactInfo = [

 {</p>
   <p> name: " Emmanuel ",</p>
   <p> email: " emmanuel @email.com ",</p>
    <p>phone: " 552312354 ",
 },]</p>


<br>
    <h2>Then we Map it!</h2>

        <p>{contactInfo.map((contact, index) => (</p>

          <p><Contact</p>

           <p> key={index}</p>

           <p> name={contact.name}</p>

           <p> email={contact.email}</p>

           <p> phone={contact.phone}

          />

))} </p>

<br>'
    )
INSERT INTO
    content(id, `Type`, topic, content)
VALUES (
        5,
        'React',
        'State',
        '<h1>How to use React State - Counter Example! </h1>
<br>
<br>
<h2>We will set a counter so he can always increment one unit!</h2>

 <p> First we define our State:</p>
  <p>const [counter, setCounter] = React.useState(0);</p>

      <p>The state will store information:</p>
      <p>{counter}</p>

  <p>This state object changes to a new value:</p>
       <p>setCounter(counter + 1)}>Increment
  );
}</p>
<br>

 <p>Every time we call setCounter, the component re-renders to update the UI!</p>

<h3>As final note, we can have event handlers helping the state:</h3>

<p>click → onClick;</p>

<p>change → onChange;</p>

<p>submit → onSubmit;</p>'
    )