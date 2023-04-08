# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode 

### Links

- Solution URL: [https://github.com/Soaphub/Countires-api-app]
- Live Site URL: [https://soaphub.github.io/Countires-api-app/#/]

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library


### What I learned

Learned to chnage nested object to an array

```js
const handleCurrency=(myObj)=>{
        const allValues = getAllValues(myObj);
        const thirdValue = allValues[0];
        return thirdValue;
    }
    // Function to change nested object to array
    function getAllValues(obj) {
        let values = [];
        for (let key in obj) {
          if (typeof obj[key] === "object") {
            values = values.concat(getAllValues(obj[key]));
          } else {
            values.push(obj[key]);
          }
        }
        return values;
    }
```

### Useful resources

- [https://www.youtube.com/c/codinginpublic]- This helped me Light & Dark Mode with CSS Variables

## Author

- Website - [Ambadi](https://github.com/Soaphub/Mysite/)
- Frontend Mentor - [@Soaphub](https://www.frontendmentor.io/profile/Soaphub)

## Acknowledgments

The udemdy coarse by Angela helped a lot in completing the project.
