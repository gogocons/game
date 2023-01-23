(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// this our main game loop file

// 1. I want to let a user create a character from alist of my given classes.

let character;

function chooseClass(text) {
  console.log("You picked", text);
}

const mageButton = document.getElementById("mage");
const shamanButton = document.getElementById("shaman");
const warlockButton = document.getElementById("warlock");

mageButton.addEventListener('click', function() {
  chooseClass("mage");
});

shamanButton.addEventListener('click', function() {
  chooseClass("shaman");
});

warlockButton.addEventListener('click', function() {
  chooseClass("warlock");
});
},{}]},{},[1]);
