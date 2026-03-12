# 🛠️ Guia de Instalação: Mac mini do Agente

Siga esta ordem exata no terminal do seu **novo perfil** no Mac mini para garantir que tudo funcione de primeira.

## 1. O "Gerente" (Homebrew)
O Homebrew facilita a instalação de tudo o resto. Abra o **Terminal** e cole:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## 2. As Ferramentas Base
Instale o motor do seu site (Node) e a linguagem que o agente usa (Python):
```bash
brew install node git python
```

## 3. O "Cérebro" Gratuito (Ollama)
Para nunca mais ter erro de cota:
1. Baixe em: [ollama.com/download](https://ollama.com/download)
2. Instale como um app normal.
3. No terminal, baixe o modelo de código:
```bash
ollama run qwen2.5-coder:7b
```

## 4. O Agente (Aider)
Esta é a ferramenta que vai realmente escrever o código para você:
```bash
python3 -m pip install aider-chat
```

## 5. GitHub Desktop
Baixe em: [desktop.github.com](https://desktop.github.com/) e logue com a **Conta Robô**.

---
### Como começar a trabalhar?
Depois de tudo instalado e o repositório clonado:
1. No terminal, entre na pasta do projeto: `cd ~/Documents/ProjetoEmprego`
2. Instale as dependências: `npm install`
3. Chame o agente: `aider --model ollama/qwen2.5-coder:7b`
