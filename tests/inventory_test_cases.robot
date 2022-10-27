*** Settings ***
Documentation    Test cases para a interface de invetario da aplicação
Resource         base.robot
Test Setup       Abrir Navegador inventário
Test Teardown    Close Browser


*** Test Cases ***
Cenario: Adicionar Novo Item Valido
    Abrir Popup Item Novo
    Inserir Dados Novo Item Dinamico Valido
    Click Button    send-new
    Checar Item Novo
    ${item}        Get WebElement    ${name}
    # Log To Console    ${item}
    

# Cenario: Incrementar item Criado
#     Abrir Popup Adicionar
#     Incrementar valor no item
    
    