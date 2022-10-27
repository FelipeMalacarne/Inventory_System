*** Settings ***
Documentation        Keywords para a interface de inventário da aplicação
Resource             base.robot


*** Keywords ***   

Abrir Popup Item Novo
    Click Button    Adicionar
    Click Button    Novo

Inserir Dados Novo Item
    [Arguments]    ${name}    ${min}    ${qnt}
    Input Text    new-name    ${name}
    Input Text    new-min     ${min}
    Input Text    new-qnt     ${qnt}

    Set Global Variable    ${name}
    Set Global Variable    ${min}
    Set Global Variable    ${qnt}


Checar Item Novo
    Page Should Contain    ${name} 

Inserir Dados Novo Item Dinamico Valido
    ${name}        FakerLibrary.Name
    ${min}         FakerLibrary.Random Number
    ${qnt}         FakerLibrary.Random Number  

    Input Text    new-name    ${name}
    Input Text    new-min     ${min}
    Input Text    new-qnt     ${qnt}

    Set Global Variable    ${name}   
    Set Global Variable    ${min}    
    Set Global Variable    ${qnt}


Abrir Navegador inventário
    Open Browser    ${URL}    ${browser}
    Title Should Be    Inventory

Abrir Popup Adicionar
    Click Button    Adicionar
    


