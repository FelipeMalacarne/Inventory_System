*** Settings ***
Library            SeleniumLibrary
Library            FakerLibrary
Resource           inventory_keywords.robot

*** Variables ***
${URL}          http://127.0.0.1:5501/index.html
${browser}      Chrome

